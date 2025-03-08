from flask import Flask, jsonify, request

app = Flask("budgetDatabase")

@app.route('/H', methods=['GET'])
def returnYippee():
    return 'Yippee'

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