from dotenv import load_dotenv 
import os 
from google import genai 

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

def assess_risk_analysis(weather: dict, city: str):
    prompt = f"""
    You are an expert in epidemiology and climate. 
    Given the weather in {city}:
    - Temperature: {weather['temp']}°C
    - Humidity: {weather['humidity']}%
    - Rainfall (last 1h): {weather['rain']}mm
    - Wind speed: {weather['wind_speed']} m/s

    Predict the risk level of disease outbreak.
    
    Output Strictly in JSON format:
    {{
        "riskLevel": "Low/Medium/High",
        "riskScore": "Integer 0-100",
        "recommendations": ["Short actionable recommendation 1", "Recommendation 2"]
    }}
    """
    client = genai.Client(api_key=GEMINI_API_KEY)
    
    import json
    from google.genai import types

    response = client.models.generate_content(
        model="gemini-3-flash-preview", 
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type="application/json")
    )
    
    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        return {"riskLevel": "Unknown", "riskScore": 0, "recommendations": ["Failed to analyze risk"]}