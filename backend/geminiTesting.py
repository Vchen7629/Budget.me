from google import genai
from google.genai import types
import pathlib
import httpx

import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


# parses a bank statement pdf into a csv file responseCSV.csv
def parsePDF(file):
    filepath = pathlib.Path(file)

    prompt = '''parse the following bank statement pdf to make a CSV of date, 
    description, withdrawal/deposit amount (marking withdrawals with -), and balance, 
    marking the expenditures as recurring/nonrecurring and necessary/unnecessary with TRUE or FALSE 
    (do not include if the row does not have a withdrawal/deposit).
    '''
    response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=[
        types.Part.from_bytes(
            data=filepath.read_bytes(),
            mime_type='application/pdf',
        ),
        prompt])

    # print(response.text)

    with open('responseCSV.csv', 'w') as file:
        file.writelines(response.text.splitlines(True)[2:-1])

    return

parsePDF("BankStatements.pdf")