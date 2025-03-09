from google import genai
from google.genai import types
import pathlib
import httpx

import os
from dotenv import load_dotenv

load_dotenv()

class GeminiChat:

    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.chat = self.client.chats.create(model="gemini-2.0-flash")
        prompt = f'''You are a Budget.me, a budgeting service. You currently do not have your client's financial information yet.
        You will recieve their initial balance, spending limit, and a list of their transactions. The "required" field has an integer that is 1 if an expenditure is likely required,
    0 if it is likely not required, and -1 if it is a deposit/income. Based on this data, answer the client's questions
    in around 200 words. Only use pure text no formatting'''
        self.chat.send_message(prompt)

        self.recentChat = ""
    
    # prompts AI using the user's prompt
    def recievePrompt(self, text):
        self.recentChat = self.chat.send_message(text)
        return self.recentChat.text
    
    def sendResponse(self):
        return self.recentChat.text

    # prompts AI to update the data it is referencing for responses
    def updateDocs(self, newDocs):
        prompt = f'''Your client's data has been updated. Their new transactions list is below. {newDocs} From now on, answer the client's questions based on their new transactions'''
        response = self.chat.send_message(prompt)
        return response.text
    
    def updateBalance(self, newBal):
        prompt = f'''Your client's initial balance has been updated. Their initial balance is now {newBal} USD From now on, answer the client's questions based on their new initial balance'''
        response = self.chat.send_message(prompt)
        return response.text
    
    def updateSpendingLimit(self, spendLimit):
        prompt = f'''Your client's initial balance has been updated. Their spending limit is now {spendLimit} USD From now on, answer the client's questions based on their new spending limit'''
        response = self.chat.send_message(prompt)
        return response.text

data = '''id, date, description, amount, required
67cd3710cb754b8aa53bc525, 01-02-2024, eBAY Trading Co., -515.22, 0
67cd3710cb754b8aa53bc526, 01-03-2024, Morrisons Petrol, -80.0, 1
67cd3710cb754b8aa53bc527, 01-04-2024, Business Loan, 20000.0, -1
67cd3710cb754b8aa53bc528, 01-05-2024, Jumes White Media, -2416.85, 0
67cd3710cb754b8aa53bc529, 01-06-2024, ATM High Street, -100.0, 1
67cd3710cb754b8aa53bc52a, 01-08-2024, Accorn Advertising Studios, -150.0, 1
67cd3710cb754b8aa53bc52b, 01-09-2024, Marriott Hotels, -177.0, 0
67cd3710cb754b8aa53bc52c, 01-10-2024, Abelio Scotrail Ltd, -122.22, 0
67cd3710cb754b8aa53bc52d, 01-11-2024, Cheque 000234, -1200.0, 0
67cd3710cb754b8aa53bc52e, 01-12-2024, Interest Paid, 9.33, -1
67cd3710cb754b8aa53bc52f, 01-13-2024, OVO Energy, -270.0, 1
67cd3710cb754b8aa53bc530, 01-14-2024, Toyota Online, -10525.4, 1
67cd3710cb754b8aa53bc531, 01-15-2024, HMRC, -1000.0, 1
67cd3710cb754b8aa53bc532, 01-16-2024, OVLA, -280.0, 0
67cd3710cb754b8aa53bc533, 01-17-2024, Michael Kor Salary, 1554.0, -1
67cd3710cb754b8aa53bc534, 01-18-2024, BOS Mastercard, -4000.0, 0'''

currChat = GeminiChat()
print(currChat.recievePrompt('who are you?'))
print(currChat.recievePrompt('what is my initial balance?'))
print(currChat.updateDocs(data))
print(currChat.updateSpendingLimit(10000))
print(currChat.recievePrompt('give it to me straight doc, how bad are my finances?'))

