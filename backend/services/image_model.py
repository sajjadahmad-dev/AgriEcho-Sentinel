import os
from google import genai
from google.genai import types
from dotenv import load_dotenv 

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

client = genai.Client(api_key=GEMINI_API_KEY)

class ImageAnalysisModel:
    def __init__(self, model_name):
        self.model_name = model_name

    def one_image_analysis(self, image_bytes: bytes, mime_type: str):
        image_part = types.Part.from_bytes(
            data=image_bytes,
            mime_type=mime_type
        )

        import json
        
        response = client.models.generate_content(
            model=self.model_name,
            contents=[
                """You are an AI-powered crop disease detection assistant. Analyze the uploaded crop image and identify any diseases present. 
                Provide the following information in strict JSON format:
                {
                    "crop": "Name of the crop (e.g., Tomato, Rice)",
                    "disease": "Name of the disease or 'Healthy'",
                    "severity": "Severity level (Low, Moderate, High)",
                    "confidence": "Confidence score between 0.0 and 1.0",
                    "description": "Brief description of the condition",
                    "treatments": [
                        {
                            "id": 1, 
                            "name": "Treatment or preventive measure name",
                            "description": "Detailed instruction",
                            "priority": "Low/Medium/High"
                        }
                    ]
                }
                """,
                image_part
            ],
            config=types.GenerateContentConfig(response_mime_type="application/json")
        )

        try:
            return json.loads(response.text)
        except json.JSONDecodeError:
            return {"error": "Failed to parse JSON response", "raw_response": response.text}
