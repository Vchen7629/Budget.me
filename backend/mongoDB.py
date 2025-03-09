from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv
import json
import certifi
from flask import Flask, jsonify, request
from geminiTesting import parsePDF
from bson.objectid import ObjectId
from geminiAnalysis import geminiAnalyze


load_dotenv()
mongodbPass = os.getenv("MONGODB_PASS")

uri = "mongodb+srv://vchen7629:" + mongodbPass + "@cluster0.aqoun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
#uri = "mongodb+srv://matthewkim1117:" + mongodbPass + "@hackmercedbudgeting.7kgt3.mongodb.net/?retryWrites=true&w=majority&appName=HackMercedBudgeting"

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

class Database:
    
    def __init__(self):
        # Create a new client and connect to the server
        self.client = MongoClient(
            uri, 
            server_api=ServerApi('1'), 
            tlsAllowInvalidCertificates=True
        )
        try:
            self.client.admin.command('ping')
            self.database = self.client.get_database('userTables')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)
    
    def createDB(self, userid):
        try:
            self.database.create_collection(userid)
        except Exception as e:
            print(e)

    # adds a row with the fields
    def addRow(self, username, fields):
        print(fields)
        try: 
            userCollection = self.database.get_collection(username)
            rowInfo = {
                "date": fields[0],
                "description": fields[1],
                "amount": float(fields[2]),
                "required": (fields[3])
            }
            userCollection.insert_one(rowInfo)
            return jsonify({ "message": "Successfully Added New Row to DB", "status": "success"}), 200
        except Exception as e:
            print(e)

        
    # takes in a userid string, looks for <userid>BankStatements.pdf, parses & adds it to the database, then deletes the pdf
    def addPDF(self, username):
        try:
            pdfPath = os.path.join(app.config['UPLOAD_FOLDER'], "BankStatements.pdf")
            if os.path.exists(pdfPath):
                userCollection = self.database.get_collection(username) 
                parsedPDF = parsePDF(pdfPath)
                userCollection.insert_many(parsedPDF)
                os.remove(pdfPath)
                return True
            else:
                print("file does not exist")
                return False
        except Exception as e:
            print(e)
            return False

    # takes in userid string, objectid integer
    def findRow(self, username, objectid):
        try: 
            document = self.database.get_collection(username).find_one({'_id': ObjectId(objectid)})
            return document
        except Exception as e:
            print(e)

    # takes in userid string, objectid integer
    def deleteRow(self, username, objectid):
        try: 
            self.database.get_collection(username).find_one_and_delete({'_id': ObjectId(objectid)})
            return True
        except Exception as e:
            print(e)
            return False
    
    # takes in userid string, objectid integer, and a dictionary of newFIelds
    def updateRow(self, username, objectid, newFields):
        try: 
            self.database.get_collection(username).find_one_and_replace({'_id': ObjectId(objectid)}, newFields)
        except Exception as e:
            print(e)

    def analyzeData(self, userid, initBal):
        data = self.database.get_collection(userid).find()
        stringify = Database.csvify(data)

        return geminiAnalyze(stringify, initBal)
        # return geminiAnalyze(data, initBal)

    # convert list of mongodb docs to a csv
    @staticmethod
    def csvify(data):
        csvString = "id, date, description, amount, required\n"
        for doc in data:
            csvString = csvString + f"{str(doc['_id'])}, {doc['date']}, {doc['description']}, {doc['amount']}, {doc['required']}\n"
        return csvString
    
    def pullData(self, username):
        data = self.database.get_collection(username).find()
        return Database.csvify(data)


        
        
