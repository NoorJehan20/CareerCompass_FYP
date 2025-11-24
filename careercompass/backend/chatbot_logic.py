import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-pro")

def generate_chat_reply(message: str) -> str:
    response = model.generate_content(message)
    return response.text