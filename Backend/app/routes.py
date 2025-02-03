from flask import request,render_template
from app import app, db , PDFReader, DB, CategorizeData

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route('/api/x',methods=['GET'])
def x():
    connection, cursor = DB.connect_to_db()
    return 'Fancy meeting you here!',200

# users --------------------------------------------------------------------------------------------------------------------------------
@app.route('/api/users/<user_id>',methods=['POST'])
def create_user(user_id):
    try:
        connection, cursor = DB.connect_to_db()
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
# users --------------------------------------------------------------------------------------------------------------------------------

# stratements and transations --------------------------------------------------------------------------------------------------------------------------------

@app.route('/api/statement',methods=['POST','DELETE'])
def save_fetch_statement():
    req = request.get_json()
    
    if request.method == 'POST':
        if 'summary' not in req or 'name' not in req or 'sub' not in req or 'bank' not in req:
            return jsonify({"Error": "Not enough information provided"}), 400
        
        summary = req["summary"]
        statement_name = req["name"] 
        sub = req["sub"] 
        try: 
            connection, cursor = DB.connect_to_db()
            cursor.execute(""" 
                            insert into statements (user_id,statement_name,num_transactions,running_balance,
                            initial_balance,running_charges,running_debits,running_credits,start_date,end_date,bank) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s)
                        """,
                            (sub,statement_name, summary["number_of_transactions"], summary["running_balance"],
                            summary["initial_balance"],summary["running_charges"],summary["running_debits"],
                            summary["running_credits"],summary["start_date"],summary["end_date"],req["bank"])
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
                
    elif request.method == "DELETE":
        if 'sub' not in req or 'statement_name' not in req:
            return jsonify({"Error": "Not enough information provided"}), 400
        
        statement_name = req["statement_name"] 
        sub = req["sub"] 
        try: 
            connection, cursor = DB.connect_to_db()
            
            cursor.execute(""" 
                            delete from statements where statement_name=%s and user_id=%s; 
                        """,
                            (statement_name,str(sub),)
                        )
            cursor.execute(""" 
                            delete from transactions where statement_name=%s and user_id=%s; 
                        """,
                            (statement_name,str(sub),)
                        )
            connection.commit()
            return jsonify({"Response":"Statement deleted"}), 200
        except Exception as e:
            connection.rollback()
            return jsonify({"Response": e}), 400
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
                    

@app.route('/api/statements/<id>', methods=['GET'])
def fetch_statements(id):
    try:
        connection, cursor = DB.connect_to_db()
        cursor.execute("Select (start_date,end_date,initial_balance,running_charges, running_debits, running_credits,running_balance ,num_transactions,bank, statement_name) from statements where user_id=%s",(str(id),))
        
        results = cursor.fetchall()
        
        column_names = ["start_date", "end_date","initial_balance","running_charges", "running_debits", "running_credits","running_balance", "num_transactions", "bank", "statement_name"]
        if results:
            statements = []
            for row in results:
                line_array  = row[0][1:len(row[0])-1].split(",")
                statement = {}
                for i in range(0,len(column_names)):
                    if not line_array[i]:
                        statement[column_names[i]] = ""
                        continue
                    if i >= 2 and i <= 7:
                        statement[column_names[i]] = float(line_array[i])
                    elif i == len(column_names)-1:
                        statement[column_names[i]] = line_array[i]
                    else:     
                        statement[column_names[i]] = line_array[i]
                        
                statements.append(statement)
            return jsonify({"statements": statements}), 200
        else:
            return jsonify({"statements": []}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 500
    
    
@app.route('/api/transactions/<user_id>', methods=['GET'])
def fetch_transactions(user_id):
    try:
        connection, cursor = DB.connect_to_db()
        cursor.execute("Select (date,details,change,credit,service_charge,balance,statement_name) from transactions where user_id=%s order by date desc",(str(user_id),))
        
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
 
  
    if 'transactions' not in req or 'name' not in req or 'sub' not in req:
        return jsonify({"Error": "Insufficient information"}), 400
        
    transactions = req["transactions"]
    statement_name = req["name"] 
    sub = req["sub"] 
    
    try: 
        connection, cursor = DB.connect_to_db()
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
        transactions = PDFReader.read_transactions(file)
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
                "end_date" : transactions.end_date,
                "bank" : transactions.bank
                }
        return jsonify(temp), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
# stratements and transations --------------------------------------------------------------------------------------------------------------------------------
 
# budgets --------------------------------------------------------------------------------------------------------------------------------

@app.route('/api/budgets/create',methods=['POST'])
def budgets():
    req = request.get_json()
    
    if 'sub' not in req or 'name' not in req or 'category' not in req or 'start_date' not in req or 'end_date' not in req or 'total_amount' not in req:
        return jsonify({"Error": "Not enough information provided"}), 400
    
    name = req["name"]
    category = req["category"]
    start_date = req["start_date"]
    end_date = req["end_date"]
    total = req["total_amount"]
    sub = req["sub"] 
    try: 
        connection, cursor = DB.connect_to_db()
        cursor.execute(""" 
                        insert into budgets (user_id,name,category,start_date,end_date,total_amount) 
                        VALUES (%s, %s, %s, %s, %s, %s) RETURNING budget_id;
                    """,
                        (sub,name, category,start_date,end_date,total,)
                    )
        
        results = cursor.fetchone()
        budget_id = results[0]
        connection.commit()
        return jsonify({"budget_id":budget_id}), 200
    except errors.UniqueViolation:
        return jsonify({"Error": "Budget already exists!"}), 201
    except Exception as e:
        return jsonify({"Error": str(e)}), 401
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close() 

@app.route('/api/budgets/<id>' ,methods=['GET','DELETE'])
def get_budgets(id):
    if request.method == 'GET':
        try: 
            connection, cursor = DB.connect_to_db()
            
            cursor.execute(""" 
                            select b.user_id,b.name, b.category,b.start_date,b.end_date,b.total_amount,b.budget_id, SUM(e.amount) as e_amount  from budgets b 
                            left join expenses e on e.budget_id=b.budget_id 
                            where b.user_id=%s group by b.budget_id,b.user_id,b.name;
                        """,
                            (str(id),)
                        )
            results = cursor.fetchall()
            connection.commit()
            
            column_names = ["user_id","name","category","start_date","end_date","total_amount","budget_id","total_expenses"]
            if results:
                budgets = []
                for row in results:
                    budget = {}
                    for i in range(0,len(column_names)):
                        if i==5:
                                budget[column_names[i]] = float(row[i])
                        elif i==6:
                            budget[column_names[i]] = int(row[i])
                        elif i==7:
                            if row[i] == None: 
                                budget[column_names[i]] = float(0)
                            else:       
                                budget[column_names[i]] = float(row[i])
                        else:    
                            budget[column_names[i]] = row[i]        
                    budgets.append(budget)
                        
                return jsonify({"Budgets": budgets}), 200
            else:
                return jsonify({"Budgets": []}), 200

        
        except Exception as e:
            return jsonify({"Error": str(e)}), 401
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
                
    elif request.method == 'DELETE':
        try: 
            connection, cursor = DB.connect_to_db()
            cursor.execute(""" 
                        delete from budgets where budget_id=%s;
                        """,
                            (str(id),)
                        )
            connection.commit()
            return jsonify({"Response": "Budget Deleted"}), 200
   
        except Exception as e:
            connection.rollback()
            return jsonify({"Error": str(e)}), 401
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
# budgets --------------------------------------------------------------------------------------------------------------------------------


# expenses --------------------------------------------------------------------------------------------------------------------------------
@app.route('/api/expenses', methods=['POST'])
def expenses():
    
    req = request.get_json()
    
    if "budget_id" not in req or "amount" not in req or "description" not in req:
        return jsonify({"Error": "Not enought information provided"}),400
    
    budget_id = req["budget_id"]
    amount = req["amount"]
    description = req["description"]
    
    try: 
        connection, cursor = DB.connect_to_db()
        cursor.execute(""" 
                        insert into expenses (budget_id,amount,description) 
                        VALUES (%s, %s, %s) RETURNING expense_id,created_at;
                    """,
                        (budget_id,amount,description,)
                    )
        
        results = cursor.fetchone()
        expense_id = results[0]
        connection.commit()
        return jsonify({"expense": {"expense_id": expense_id, "date": results[1]} }), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 401
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close() 


@app.route('/api/expenses/<id>', methods=['GET', 'DELETE'])
def get_expenses(id):

    if request.method == 'GET':
        try: 
            connection, cursor = DB.connect_to_db()
            
            cursor.execute(""" 
                                select e.expense_id,e.description,e.amount,e.created_at,b.budget_id from expenses e inner join budgets b on 
                                b.budget_id=e.budget_id where b.user_id=%s  order by e.created_at desc;
                            """,
                                (str(id),)
                            )
            results = cursor.fetchall()
            connection.commit()
            
            column_names = ["expense_id","description","amount","created_at","budget_id"]
            if results:
                Expenses = []
                for row in results:
                    expense = {}
                    for i in range(0,len(column_names)):
                        if i==2:
                                expense[column_names[i]] = float(row[i])
                        elif i==0 or i == 4:
                            expense[column_names[i]] = int(row[i])
                        else:    
                            expense[column_names[i]] = row[i]        
                    Expenses.append(expense)
                        
                return jsonify({"Expenses": Expenses}), 200
            else:
                return jsonify({"Expenses": []}), 200

        except Exception as e:
            return jsonify({"Error": str(e)}), 401
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
                
    elif request.method == 'DELETE':
        try:
           int(id)
        except Exception as e:
            return jsonify({"Error": "Expense id invalid"}),404   

        try: 
            connection, cursor = DB.connect_to_db()
            
            cursor.execute(""" 
                                delete from expenses where expense_id=%s;
                            """,
                                (id,)
                            )
            connection.commit()

            return "Expense successfuly deleted", 200


        except Exception as e:
            return jsonify({"Error": str(e)}), 401
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
# expenses --------------------------------------------------------------------------------------------------------------------------------


@app.route('/api/summaries/<id>',methods=['GET'])
def get_summaries(id): 
    try:   
        connection, cursor = DB.connect_to_db()
        cursor.execute(""" 
                            select DATE_TRUNC('week',date) as week_start,
                            sum(case when credit and not service_charge then change end) as income, 
                            sum(case when not credit and not service_charge then change end) as expenditure,
                            sum(case when not credit and service_charge then change end) as charges,
                            sum(case when credit then change else -change end) as balance
                            from transactions where user_id=%s group by week_start order by week_start;
                        """,
                            (str(id),)
                        )
        results = cursor.fetchall()
        connection.commit()
        
        column_names = ["Start of Week","Income","Expenses","Charges","Balance"]
        if results:
            Response = []
            for row in results:
                # print(row)
                
                line = {}
                for i in range(0,len(column_names)):
                    if i!=0:
                        if row[i] == None:
                            line[column_names[i]] = float(0)
                        else:    
                            line[column_names[i]] = float(row[i])
                    else:    
                        line[column_names[i]] = row[i]        
                Response.append(line)
                    
            return jsonify({"WeeksArray": Response}), 200
        else:
            return jsonify({"WeeksArray": []}), 200

    except Exception as e:
        return jsonify({"Error": str(e)}), 401
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

@app.route('/api/categorize',methods=['POST'])
def categorize_transations():
    req = 0
    try:
        req = request.get_json()
        if 'transactions' not in req:
            raise Exception("No transactions given")
    except Exception as e:
        return jsonify({"Error getting transactions": str(e)}),400 
    
    try:   
        result = CategorizeData.categorize_main(req['transactions'])
        return jsonify({'categories': result}),200
    except Exception as e:
        return jsonify({"Error categorizing transactions": str(e)}),400 
    
@ app.route("/api/clearall/<id>",methods=['DELETE'])
def clearall(id):
    try: 
        connection, cursor = DB.connect_to_db()
        cursor.execute("""delete from budgets where user_id=%s;""",(str(id),))
        cursor.execute("""delete from statements where user_id=%s;""",(str(id),))
        cursor.execute("""delete from transactions where user_id=%s;""",(str(id),))
        connection.commit()
        return jsonify({"Response": "Info deleted"}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"Error": str(e)}), 401
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
        