from fastapi import FastAPI, HTTPException
from typing import Dict, List
import pandas as pd
import requests
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GOOGLE_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-pro", api_key=key)

ALPHA_VANTAGE_API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")

CSV_PATH = "listing_status.csv"

def retrieve_symbol(name: str) -> str:
    try:
        csv = pd.read_csv(CSV_PATH)
        rows = csv[csv['name'].astype(str).str.contains(name, case=False, na=False)]

        if rows.empty:
            raise ValueError(f"No matching company found for name: {name}")

        return rows['symbol'].iloc[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving symbol: {str(e)}")


def get_weekly_stock_data(symbol: str) -> Dict:
    BASE_URL = "https://www.alphavantage.co/query"

    params = {
        "function": "TIME_SERIES_WEEKLY",
        "symbol": symbol,
        "apikey": ALPHA_VANTAGE_API_KEY,
    }

    response = requests.get(BASE_URL, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(
            status_code=response.status_code,
            detail="Unable to fetch data from Alpha Vantage"
        )


def get_last_5_weeks_data(weekly_data: Dict) -> List[Dict]:
    last_5_weeks = list(weekly_data.get('Weekly Time Series').items())[:5]
    formatted_data = []
    for date, data in last_5_weeks:
        formatted_data.append({
            "Date": date,
            "Open": (data["1. open"]),
            "High": (data["2. high"]),
            "Low": (data["3. low"]),
            "Close": (data["4. close"]),
            "Volume": (data["5. volume"])
        })
    return formatted_data


def get_half_of_dict(input_dict: Dict) -> Dict:
    n = len(input_dict) // 4
    half_dict = dict(list(input_dict.items())[:n])
    return half_dict


