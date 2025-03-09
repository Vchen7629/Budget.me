from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os


from mongoDB import Database

app = Flask("budgetDatabase")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = 'uploads'

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

    if databaseInstance.addPDF():
        return jsonify({'status': 'success', 'message': 'successfully added pdf'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'error adding pdf'}), 400


if __name__ == '__main__':
    app.run(debug=True)  # Start the server in debug mode