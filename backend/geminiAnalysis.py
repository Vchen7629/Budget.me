from google import genai
from google.genai import types
import pathlib
import httpx

import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def geminiAnalyze(docs, initBal):

    prompt = '''
    

'''
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt,
    )
    
    return response

# parses a bank statement pdf into a csv file responseCSV.csv
