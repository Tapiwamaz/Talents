from  flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2 import errors
import PDFReader as reader
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
def create_statement():
    req = request.get_json()
    
    if 'summary' not in req or 'name' not in req or 'sub' not in req:
        return jsonify({"Error": "No enough information provided"}), 400
    
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
                        initial_balance,running_charges,running_debits,running_credits) 
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                        (sub,statement_name, summary["number_of_transactions"], summary["running_balance"],
                        summary["initial_balance"],summary["running_charges"],summary["running_debits"],
                        summary["running_credits"],)
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

@app.route('/api/transactions', methods=['POST'])
def save_transactions():
    req = request.get_json()
    # print(req)
    
    if 'transactions' not in req or 'name' not in req or 'sub' not in req:
        return jsonify({"Error": "Insufficient information"}), 400
    
    transactions = req["transactions"]
    statement_name = req["name"] 
    sub = req["sub"] 
    
    return jsonify({"Success": "Trnsactions saved"}), 200
    # print(transactions)
    # try: 
    #     connection = psycopg2.connect(dbname=DB.DB_CONFIG["database"],
    #                                   user=DB.DB_CONFIG["user"],
    #                                   host=DB.DB_CONFIG["host"],
    #                                   password=DB.DB_CONFIG["password"])
    #     cursor = connection.cursor()
        
    #     cursor.execute(""" 
    #                     insert into transactions (user_id,statement_name,details,balance,
    #                     date,change,credit,service_charge) 
    #                     VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    #                 """,
    #                     (sub,statement_name, transaction["details"], transaction["balance"],
    #                     transaction["date"],transaction["change"],transaction["credit"],
    #                     transaction["service_charge"],)
    #                 )
    #     connection.commit()
    #     return jsonify({"Response":"Statement created!"}), 200
    # except errors.UniqueViolation:
    #     return jsonify({"Allow": "Statement already exists!"}), 201
    # except Exception as e:
    #      return jsonify({"Error": str(e)}), 401
    # finally:
    #     if cursor:
    #         cursor.close()
    #     if connection:
    #         connection.close()
    


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
    
if __name__ == '__main__':
    app.run(debug=True)    