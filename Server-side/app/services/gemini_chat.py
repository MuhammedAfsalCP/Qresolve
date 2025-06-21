import os 
import httpx
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

async def get_gemini_response(prompt:str) -> str:
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not set")
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"
    headers = {
    "Content-Type": "application/json",
    "x-goog-api-key": GEMINI_API_KEY
    }
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raise if error (like 400/500)

    data = response.json()

    # Extract Gemini's reply
    try:
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        return "Sorry, I couldn't understand your request. Please rephrase."