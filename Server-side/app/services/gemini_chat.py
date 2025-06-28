# app/services/gemini_chat.py
import os
import google.generativeai as genai
from google.generativeai import types

# Configure Gemini API
# Ensure your API key is loaded securely from environment variables
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_gemini_response(prompt: str) -> str:
    try:
        model = genai.GenerativeModel('gemini-1.5-flash') # Or 'gemini-1.5-flash', etc.
        chat = model.start_chat(history=[])
        response = chat.send_message(prompt)
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return f"Error: Could not get response from AI. {e}"