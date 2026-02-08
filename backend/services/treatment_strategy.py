import os
from google import genai
from google.genai import types
from dotenv import load_dotenv 

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

client = genai.Client(api_key=GEMINI_API_KEY)

class TreatmentStrategyModel:
    def __init__(self):
        pass 

    def treatment_reason(self, input_text: str):
        import json

        response = client.models.generate_content(
            model="gemini-3-flash-preview", 
            contents=["""You are an AI Treatment Strategy engine.
        
        You will receive a single block of text describing a situation related to
        climate, weather, crop health, disease spread, or environmental stress.
        
        Your task is to generate an explainable treatment and mitigation strategy
        based solely on the information present in the text.
        
        Output Strictly in JSON format:
        {
          "situation": "Interpreted Situation Summary based on input",
          "riskLevel": "Low / Medium / High",
          "likelyDiseases": ["Likely Disease 1", "Likely Disease 2"],
          "immediateActions": [
            { "id": 1, "action": "Specific action to take", "urgency": "High/Critical", "timeframe": "Today/Immediately" }
          ],
          "shortTermActions": [
            { "id": 1, "action": "Follow-up action", "timeframe": "Days/Weeks" }
          ],
          "preventiveMeasures": [
            { "id": 1, "measure": "Preventative step", "description": "Why and how to do it" }
          ],
          "warningSignsToMonitor": ["Sign 1", "Sign 2"]
        }
        
        Safety Constraints:
        - Do NOT diagnose diseases definitively.
        - Do NOT prescribe specific chemicals or medication dosages.
        - Use probabilistic language.
        """, input_text],
            config=types.GenerateContentConfig(response_mime_type="application/json")
        )

        try:
            return json.loads(response.text)
        except json.JSONDecodeError:
            return {"error": "Failed to parse JSON response", "raw_response": response.text}