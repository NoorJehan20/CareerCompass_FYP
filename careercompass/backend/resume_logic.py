# resume_logic.py
import os
import docx
import json
import fitz  
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GENAI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini API
genai.configure(api_key=GENAI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-pro")

# Debug flag to preview extracted text
DEBUG_TEXT = True


def extract_text_from_pdf(file_path):
    """
    Extract text from PDF using PyMuPDF (fitz)
    Returns plain text
    """
    text = ""
    try:
        doc = fitz.open(file_path)
        for page in doc:
            text += page.get_text("text") + "\n"
        if DEBUG_TEXT:
            print("---- Extracted PDF Text Preview ----")
            print(text[:1000])  # show first 1000 chars
        return text
    except Exception as e:
        print("PDF extraction error:", e)
        return ""

def extract_text_from_docx(file_path):
    """
    Extract text from DOCX
    """
    text = ""
    try:
        doc = docx.Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"
        if DEBUG_TEXT:
            print("---- Extracted DOCX Text Preview ----")
            print(text[:1000])
    except Exception as e:
        print("DOCX extraction error:", e)
    return text

def call_gemini_llm(resume_text):
    prompt = f"""
Extract structured data from this resume text and return JSON ONLY.

Resume:
{resume_text}

JSON Format:
{{
  "personalInfo": {{"name": "", "currentRole": "", "experience": "", "education": "", "email": "", "phone": "", "address": ""}},
  "skills": [{{ "name": "", "level": "Intermediate", "progress": 70 }}],
  "experience": [{{ "title": "", "company": "", "duration": "", "description": "" }}],
  "certifications": [{{ "name": "", "year": "" }}]
}}
"""
    try:
        response = model.generate_content(prompt)

        # Access the text inside parts
        if hasattr(response, "generations") and response.generations:
            content_obj = response.generations[0].content
        elif hasattr(response, "candidates") and response.candidates:
            content_obj = response.candidates[0].content
        else:
            print("No content returned by Gemini")
            return {"personalInfo": {}, "skills": [], "experience": [], "certifications": []}

        # Extract raw text
        if hasattr(content_obj, "parts") and len(content_obj.parts) > 0:
            generated_text = content_obj.parts[0].text
        else:
            print("No parts in content")
            return {"personalInfo": {}, "skills": [], "experience": [], "certifications": []}

        # Clean markdown / backticks
        generated_text = generated_text.strip().strip("```json").strip("```").strip()

        # Parse JSON
        return json.loads(generated_text)

    except json.JSONDecodeError as e:
        print("Gemini returned invalid JSON:", e)
        return {"personalInfo": {}, "skills": [], "experience": [], "certifications": []}
    except Exception as e:
        print("Gemini parsing error:", e)
        return {"personalInfo": {}, "skills": [], "experience": [], "certifications": []}

def parse_resume_file(file_path):
    """
    Main parser function: decides based on file type
    """
    if file_path.lower().endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    elif file_path.lower().endswith(".docx"):
        text = extract_text_from_docx(file_path)
    else:
        return {
            "personalInfo": {},
            "skills": [],
            "experience": [],
            "certifications": []
        }

    if not text.strip():
        print("Could not extract text from resume")
        return {
            "personalInfo": {},
            "skills": [],
            "experience": [],
            "certifications": []
        }

    # Send extracted text to Gemini LLM
    return call_gemini_llm(text)