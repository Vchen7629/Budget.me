import sqlite3
from geminiTesting import parsePDF

def createDatabase():
    try:
        connection = sqlite3.connect('mydatabase.db')  # Creates or connects to the database file
        cursor = connection.cursor()
        print("SQLite connection successful")

        # Example: Create a table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS transactions (
                date TEXT,
                description TEXT,
                amount INTEGER, 
                balance INTEGER,
                required BOOL
            )
        ''')

        connection.commit()

    except sqlite3.Error as error:
        print("Error connecting to SQLite:", error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            print("SQLite connection closed")

def importPDF():
        connection = sqlite3.connect('mydatabase.db')  # Creates or connects to the database file
        cursor = connection.cursor()
        print("SQLite connection successful")

        contents = parsePDF("BankStatements.pdf")

        cursor.executemany("INSERT INTO transactions (date, description, amount, balance, required) VALUES(?, ?, ?, ?, ?)", contents)

        connection.commit()

        cursor.close()
        connection.close()
        print("SQLite connection closed")
createDatabase()
importPDF()


        