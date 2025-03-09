from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv
import json
import certifi
from flask import Flask
from geminiTesting import parsePDF
from bson.objectid import ObjectId


load_dotenv()
mongodbPass = os.getenv("MONGODB_PASS")

uri = "mongodb+srv://matthewkim1117:" + mongodbPass + "@hackmercedbudgeting.7kgt3.mongodb.net/?retryWrites=true&w=majority&appName=HackMercedBudgeting"

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

    def initComplete(self):
        return "yippee! init complete!"
    
    def createDB(self, userid):
        if self.client.get_database(userid) != None:
            print(f"userid:{userid} database already exists")

    # adds a row with the fields
    def addRow(self, userid, fields):
        try: 
            userCollection = self.database.get_collection(userid)
            rowInfo = {
                "date": fields[0],
                "description": fields[1],
                "amount": float(fields[2]),
                "required": bool(fields[3])
            }
            userCollection.insert_one(rowInfo)
        except Exception as e:
            print(e)

    # takes in a userid string, looks for <userid>BankStatements.pdf, parses & adds it to the database, then deletes the pdf
    def addPDF(self, userid):
        try:
            pdfPath = os.path.join(app.config['UPLOAD_FOLDER'], "BankStatements.pdf")
            if os.path.exists(pdfPath):
                userCollection = self.database.get_collection(userid) 
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
    def findRow(self, userid, objectid):
        try: 
            document = self.database.get_collection(userid).find_one({'_id': ObjectId(objectid)})
            return document
        except Exception as e:
            print(e)

    # takes in userid string, objectid integer
    def deleteRow(self, userid, objectid):
        try: 
            self.database.get_collection(userid).find_one_and_delete({'_id': ObjectId(objectid)})
        except Exception as e:
            print(e)
    
    # takes in userid string, objectid integer, and a dictionary of newFIelds
    def updateRow(self, userid, objectid, newFields):
        try: 
            self.database.get_collection(userid).find_one_and_replace({'_id': ObjectId(objectid)}, newFields)
        except Exception as e:
            print(e)
        
