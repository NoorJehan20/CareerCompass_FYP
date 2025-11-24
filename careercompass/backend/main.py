from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import tempfile
import os
import json

load_dotenv()

from chatbot_logic import generate_chat_reply
from resume_logic import parse_resume_file

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "CareerCompass Backend Running"})


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        ai_reply = generate_chat_reply(user_message)
        return jsonify({"reply": ai_reply})
    except Exception as e:
        print("Chat error:", e)
        return jsonify({"error": str(e)}), 500


@app.route("/upload-resume", methods=["POST"])
def upload_resume():
    try:
        if "resume" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["resume"]
        filename = file.filename
        ext = filename.split(".")[-1].lower()

        if ext not in ["pdf", "docx"]:
            return jsonify({"error": "Unsupported file type"}), 400

        # Save temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as tmp:
            file.save(tmp.name)
            resume_path = tmp.name

        # Parse resume
        parsed_data = parse_resume_file(resume_path)

        print("---- Parsed Data ----")
        print(parsed_data)

        return jsonify(parsed_data)

    except Exception as e:
        print("Resume API error:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)