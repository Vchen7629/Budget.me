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

    prompt = '''parse the following bank statement pdf to make a CSV of date (formated DD-MM-YYYY), 
    description, withdrawal/deposit amount (marking withdrawals with -), balance, and an inference of whether 
    or not it is a required expenditure (TRUE/FALSE if withdrawal, NULL if deposit)
    (do not include if the row does not have a withdrawal/deposit, remove the commas
    on the transaction and balance numbers) .
    '''
    response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=[
        types.Part.from_bytes(
            data=filepath.read_bytes(),
            mime_type='application/pdf',
        ),
        prompt])

    pdfData = []

    for i in response.text.splitlines()[3:-1]:
        pdfData.append(i.split(","))
    return pdfData

# allRows = parsePDF("BankStatements.pdf")
# for i in allRows:
#     print(i)