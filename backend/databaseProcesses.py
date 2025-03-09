from flask import Flask, jsonify, request, session
from flask_cors import CORS, cross_origin
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
    # databaseInstance.createDB("user0")
    databaseInstance.addPDF("user0")
    return "yippee"

@app.route('/viewData', methods=['GET'])
def returnData():
    return "yippe"

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
    username = request.form.get('username')
    print(f"Using username from session: {username}")

    if databaseInstance.addPDF(username):
        return jsonify({'status': 'success', 'message': 'successfully added pdf'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'error adding pdf'}), 400


if __name__ == '__main__':
    app.run(debug=True)  # Start the server in debug mode