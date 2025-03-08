from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask("budgetDatabase")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/H', methods=['GET'])
def returnYippee():
    return 'Yippee'

@app.route('/viewData', methods=['GET'])
def returnData():
    return "yippe"

@app.route('/addSingle', methods=['POST'])
def addData():
    return

@app.route('/parsePDF', methods=['POST'])
def parsePDF():
    return


if __name__ == '__main__':
    app.run(debug=True)  # Start the server in debug mode