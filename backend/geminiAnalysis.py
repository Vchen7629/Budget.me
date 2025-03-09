from google import genai
from google.genai import types
import pathlib
import httpx

import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def geminiAnalyze(docs, initBal):

    prompt = f'''You are a budgeting service. Your client's initial balance was {initBal} and their 
    transactions are listed below. Based on this data, summarize your client's financial situation
    and give tips to improve their budget. Give only a short summary around 200 words.
    {docs}'''
    
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt,
    )
    
    return response

# parses a bank statement pdf into a csv file responseCSV.csv
