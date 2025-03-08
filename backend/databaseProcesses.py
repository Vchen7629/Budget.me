from flask import Flask, jsonify, request

from mongoDB import Database

app = Flask("budgetDatabase")

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

@app.route('/parsePDF', methods=['GET'])
def parsePDF():
    return


if __name__ == '__main__':
    app.run(debug=True)  # Start the server in debug mode