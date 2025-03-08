import sqlite3

try:
    connection = sqlite3.connect('mydatabase.db')  # Creates or connects to the database file
    cursor = connection.cursor()
    print("SQLite connection successful")

    # Example: Create a table
    cursor.execute('''
        CREATE TABLE transactions (
            date TEXT,
            description TEXT,
            amount INTEGER, 
            balance INTEGER,
            recurring BOOL,
            necessary BOOL
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