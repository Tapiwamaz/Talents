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
            }
            for transaction in transactions.transactions.values()
        ]
        return jsonify(transaction_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)    