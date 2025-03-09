from flask import Flask, jsonify, request
from flask import Flask, jsonify, request, session
from flask_cors import CORS, cross_origin
from datetime import datetime
import os


from mongoDB import Database

app = Flask("budgetDatabase")
CORS(app, resources={r"/*": {
    "origins": ["http://localhost:3000", "http://127.0.0.1:5000", "http://localhost:5173"],
    "supports_credentials": True,
    "allow_headers": ["Content-Type", "Authorization"],
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.secret_key = 'your_secret_key'

databaseInstance = Database()

@app.route('/H', methods=['GET'])
def returnYippee():

    # print(databaseInstance.analyzeData("user0", 8300))
    print(databaseInstance.pullData("Auth"))

    return "yip"

@app.route('/viewData', methods=['GET'])
def returnData():
    return databaseInstance.pullData('Auth')

@app.route('/addSingle', methods=['POST'])
def addData():
    return

@app.route("/username", methods=['POST'])
def Username():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
            
    data = request.json
    username = data.get('username')
        
    if not username:
        return jsonify({"error": "Username is required"}), 400
        
    session['username'] = username
    print(f"Received username: {username}")

    return jsonify({"status": "success", "message": f"Username {username} received"}), 200

@app.route('/parsePDF', methods=['POST'])
def Upload():
    
    if 'files' not in request.files:
        return jsonify({'error': 'no file found'}), 400
    file = request.files['files']
    if file.filename == '':
        return jsonify({'error': 'no file name found'}), 400
    
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], "BankStatements.pdf")
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    file.save(save_path)

    if databaseInstance.addPDF("Auth"):
        return jsonify({'status': 'success', 'message': 'successfully added pdf'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'error adding pdf'}), 400
    
@app.route('/addEntry', methods=['POST'])
def addEntry():
    date = request.form.get('date')
    description = request.form.get('description')
    amount = request.form.get('amount')
    required = request.form.get('required')
    
    try:
        date = datetime.strptime(date, '%m-%d-%Y')
    except ValueError:
        return jsonify({'status': 'error', 'message': 'invalid date formatting'}), 400
    
    try:
        amount = float(amount)
    except ValueError:
        return jsonify({'status': 'error', 'message': 'invalid amount formatting'}), 400
    
    if int(required) in (-1, 0, 1):
        required = int(required)
    else:
        return jsonify({'status': 'error', 'message': 'invalid required formatting'}), 400
    
    databaseInstance.addRow("Auth", [date, description, amount, required])
    return jsonify({'status': 'success', 'message': 'successfully added row'}), 200
    
@app.route('/removeEntry', methods=['POST'])
def removeEntry():
    id = request.form.get('id')
    if databaseInstance.deleteRow("Auth"):
        return jsonify({'status': 'success', 'message': 'successfully removed row'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'error removing row'}), 400
