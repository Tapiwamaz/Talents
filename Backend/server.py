from  flask import Flask, request, jsonify
from flask_cors import CORS
import PDFReader as reader

app = Flask(__name__)
CORS(app)

# API route
@app.route("/members")
def members():
    return {"members": [1,2,3]}

@app.route('/upload', methods=['POST'])
def upload_pdf():
    print(request)
    print(request.files)
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
            }
            for transaction in transactions.transactions.values()
        ]
        # transaction_data.reverse()
        temp = { "number_of_transactions" : transactions.number_of_transactions,
                "transactions" : transaction_data,
                "running_balance" :transactions.running_balance,
                "running_credits" : transactions.running_credits,
                "running_debits" : transactions.running_debits,
                "running_charges" : transactions.running_charges,
                "initial_balance" : transactions.initial_balance,
                }
     
        return jsonify(temp), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)    