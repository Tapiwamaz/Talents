from  flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2 import errors
import PDFReader as reader
import ast
import DB 

app = Flask(__name__)
CORS(app)

# API routes
@app.route('/api/users/<user_id>',methods=['POST'])
def create_user(user_id):
    try:
        connection = psycopg2.connect(dbname=DB.DB_CONFIG["database"],
                                      user=DB.DB_CONFIG["user"],
                                      host=DB.DB_CONFIG["host"],
                                      password=DB.DB_CONFIG["password"])
        cursor = connection.cursor()
        
        cursor.execute(""" 
                        insert into users (user_id) 
                        values (%s)
                    """,
                        (user_id,)
                    )
        connection.commit()
        return jsonify({"Response":"User created!"}), 200
    except errors.UniqueViolation:
        return jsonify({"Allow": "User ID already exists!"}), 201
    except Exception as e:
         return jsonify({"Error": str(e)}), 401
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

@app.route('/api/statement',methods=['POST'])
def save_fetch_statement():
    req = request.get_json()
    
    if request.method == 'POST':
        if 'summary' not in req or 'name' not in req or 'sub' not in req:
            return jsonify({"Error": "Not enough information provided"}), 400
        
        summary = req["summary"]
        statement_name = req["name"] 
        sub = req["sub"] 
        try: 
            connection = psycopg2.connect(dbname=DB.DB_CONFIG["database"],
                                        user=DB.DB_CONFIG["user"],
                                        host=DB.DB_CONFIG["host"],
                                        password=DB.DB_CONFIG["password"])
            cursor = connection.cursor()
            
            cursor.execute(""" 
                            insert into statements (user_id,statement_name,num_transactions,running_balance,
                            initial_balance,running_charges,running_debits,running_credits,start_date,end_date) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        """,
                            (sub,statement_name, summary["number_of_transactions"], summary["running_balance"],
                            summary["initial_balance"],summary["running_charges"],summary["running_debits"],
                            summary["running_credits"],summary["start_date"],summary["end_date"],)
                        )
            connection.commit()
            return jsonify({"Response":"Statement created!"}), 200
        except errors.UniqueViolation:
            return jsonify({"Allow": "Statement already exists!"}), 201
        except Exception as e:
            return jsonify({"Error": str(e)}), 401
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
    
@app.route('/api/transactions/<user_id>', methods=['GET'])
def fetch_transactions(user_id):
    if request.method == 'GET':
        print(user_id)
        
        try:
            connection = psycopg2.connect(dbname=DB.DB_CONFIG["database"],
                                        user=DB.DB_CONFIG["user"],
                                        host=DB.DB_CONFIG["host"],
                                        password=DB.DB_CONFIG["password"])
            cursor = connection.cursor()
            cursor.execute("Select (date,details,change,credit,service_charge,balance,statement_name) from transactions where user_id=%s order by transaction_id desc, date desc",(str(user_id),))
            
            results = cursor.fetchall()
            
            column_names = ["full_date", "details", "change", "credit", "service_charge", "balance","statement_name"]
            if results:
                transactions = []
                for row in results:
                    line_array  = row[0][1:len(row[0])-1].split(",")
                    trans = {}
                    for i in range(0,len(line_array)):
                        trans[column_names[i]] = line_array[i]
                        
                    trans["date"] = trans["full_date"][8:11]        
                    trans["month"] = trans["full_date"][5:7]        
                    trans["year"] = int(trans["full_date"][0:4])
                    trans["balance"] = float(trans["balance"])
                    trans["change"] = float(trans["change"])
                    trans["details"] = trans["details"][1: len(trans["details"])-1]
                    
                    if "t" == trans["service_charge"]:
                        trans["service_charge"] = True
                    else:
                        trans["service_charge"] = False
                    if "t" == trans["credit"]:
                        trans["credit"] = True
                    else:
                        trans["credit"] = False
                             
                             
                    
                    transactions.append(trans)
                return jsonify({"transactions": transactions}), 200
                # return transactions, 200
            else:
                return jsonify({"transactions": []}), 200
        except Exception as e:
            return jsonify({"Error": str(e)}), 500
                      

@app.route('/api/transactions', methods=['POST'])
def save_transactions():
    req = request.get_json()
 
    if request.method == 'POST':
        if 'transactions' not in req or 'name' not in req or 'sub' not in req:
            return jsonify({"Error": "Insufficient information"}), 400
            
            transactions = req["transactions"]
            statement_name = req["name"] 
            sub = req["sub"] 
            
            try: 
                connection = psycopg2.connect(dbname=DB.DB_CONFIG["database"],
                                            user=DB.DB_CONFIG["user"],
                                            host=DB.DB_CONFIG["host"],
                                            password=DB.DB_CONFIG["password"])
                cursor = connection.cursor()
                
                for transaction in transactions:
                    temp_date = transaction["full_date"]
                    cursor.execute(""" 
                                    insert into transactions (user_id,statement_name,details,balance,
                                    date,change,credit,service_charge) 
                                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                                """,
                                    (sub,statement_name, transaction["details"], transaction["balance"],
                                    transaction["full_date"],transaction["change"],transaction["credit"],
                                    transaction["service_charge"],)
                                )
                    
                connection.commit()
                return jsonify({"Success": "Transactions saved"}), 200
        
            except Exception as e:
                return jsonify({"Error": str(e)}), 401
            finally:
                if cursor:
                    cursor.close()
                if connection:
                    connection.close()


@app.route('/api/upload', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Process the uploaded PDF
        transactions = reader.read_transactions(file)
        transaction_data = [
            {
                "id": transaction.id,
                "details": transaction.details,
                "balance": transaction.balance,
                "change": transaction.change,
                "credit": transaction.credit,
                "service_charge": transaction.service_charge,
                "date": transaction.date,
                "month": transaction.month,
                "year": transaction.year
            }
            for transaction in transactions.transactions.values()
        ]

        temp = { "number_of_transactions" : transactions.number_of_transactions,
                "transactions" : transaction_data,
                "running_balance" :transactions.running_balance,
                "running_credits" : transactions.running_credits,
                "running_debits" : transactions.running_debits,
                "running_charges" : transactions.running_charges,
                "initial_balance" : transactions.initial_balance,
                "start_date" : transactions.start_date,
                "end_date" : transactions.end_date
                }
        return jsonify(temp), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
# create a new budget 
@app.route('/api/budgets/create',methods=['POST'])
def budgets():
    req = request.get_json()
    
    if request.method == 'POST':
        if 'sub' not in req or 'name' not in req or 'category' not in req or 'start_date' not in req or 'end_date' not in req or 'total' not in req:
            return jsonify({"Error": "Not enough information provided"}), 400
        
        name = req["name"]
        category = req["category"]
        start_date = req["start_date"]
        end_date = req["end_date"]
        total = req["total"]
        sub = req["sub"] 
        try: 
            connection = psycopg2.connect(dbname=DB.DB_CONFIG["database"],
                                        user=DB.DB_CONFIG["user"],
                                        host=DB.DB_CONFIG["host"],
                                        password=DB.DB_CONFIG["password"])
            cursor = connection.cursor()
            
            cursor.execute(""" 
                            insert into budgets (user_id,name,category,start_date,end_date,total_amount) 
                            VALUES (%s, %s, %s, %s, %s, %s) RETURNING budget_id;
                        """,
                            (sub,name, category,start_date,end_date,total,)
                        )
            results = cursor.fetchone()  # Fetch a single row instead of fetchall()
            budget_id = results[0]
            connection.commit()
            return jsonify({"budget_id":budget_id}), 200
        except errors.UniqueViolation:
            return jsonify({"Error": "Budget already exists!"}), 400
        except Exception as e:
            return jsonify({"Error": str(e)}), 401
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close() 
 
 
    
if __name__ == '__main__':
    app.run(debug=True)    