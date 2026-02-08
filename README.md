# AgriEcho Sentinel
## AI Crop Disease Detection & Treatment Platform
![Home](./Home.png)

### Global Autonomous Crop Intelligence powered by Gemini 3

AgriEcho Sentinel is an AI-driven agricultural intelligence platform designed to help farmers detect crop diseases early, understand environmental risks, and receive adaptive treatment guidance.  
Built for the **Google DeepMind Gemini 3 Hackathon**, the system demonstrates how long-running multimodal reasoning can support real-world food security across diverse climates and regions.

The platform combines **image understanding, weather-aware risk prediction, and autonomous planning** into a single interactive workflow, transforming farming decisions from reactive to predictive.

---

## 🌍 Why AgriEcho Sentinel?

Crop loss due to disease, pests, and climate variability affects millions of farmers worldwide.  
Most existing tools provide **static advice** or **simple image detection**, but they lack:

- continuous reasoning over time  
- integration of environmental signals  
- adaptive treatment planning  

AgriEcho Sentinel addresses this gap using **Gemini 3 multimodal intelligence** to simulate risks, forecast outcomes, and generate actionable guidance.

---

## ✨ Core Capabilities

- **Multimodal Crop Analysis**  
  Upload field images to detect diseases, severity, and visible stress signals using Gemini 3 vision reasoning.

- **Weather-Aware Risk Prediction**  
  Real-time climate data is combined with crop conditions to estimate **7-day disease spread probability** and potential yield impact.

- **Autonomous Treatment Planning**  
  Gemini 3 generates **step-by-step recovery strategies**, including timing, resources, and expected improvement.

- **Outcome Simulation**  
  Interactive projections show how **early vs. delayed treatment** affects crop yield.

- **Global-Ready Design**  
  Works across countries and climates through configurable weather and regional data sources.

---

## 🧠 Gemini 3 Integration

AgriEcho Sentinel is designed around **Gemini 3 as the central reasoning engine**, not just a chatbot.

Gemini 3 is used for:

- visual disease interpretation  
- long-context reasoning over crop + weather signals  
- multi-step treatment planning  
- predictive outcome simulation  

This aligns directly with the hackathon's focus on **autonomous, multimodal, real-world AI systems**.

---

## 🏗️ Project Architecture

```
agriecho-sentinel/
├── backend/              # FastAPI AI orchestration layer
│   ├── services/         # Gemini vision, risk prediction, treatment logic
│   ├── tools/            # Weather and utility integrations
│   ├── schema/           # Data validation models
│   └── main.py           # API entry point
│
└── frontend/             # Next.js user interface
    ├── app/              # Pages and routing
    ├── components/       # UI components and charts
    └── lib/              # API communication utilities
```

---

## ⚙️ Technology Stack

### Backend
- **FastAPI** — high-performance Python API framework  
- **Google Gemini 3 API** — multimodal reasoning and planning  
- **Weather API integration** — environmental risk signals  
- **Uvicorn** — ASGI server  

### Frontend
- **Next.js 16 + React 19** — modern web interface  
- **Tailwind CSS** — responsive styling  
- **Chart visualization** — yield and risk simulation  
- **Axios** — API communication  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/agriecho-sentinel.git
cd agriecho-sentinel
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

Create a `.env` file:

```
GEMINI_API_KEY=your_key_here
OPENWEATHER_API_KEY=your_key_here
```

Run the server:

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://localhost:8000
http://localhost:8000/docs
```

---

### 3. Frontend Setup

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## 📡 Key API Endpoints

### Image Analysis

**POST** `/image_analysis`  
Detects crop disease and severity from uploaded image.

### Disease Risk Prediction

**GET** `/disease-risk/{city}`  
Combines weather signals with crop conditions to estimate outbreak probability.

### Treatment Strategy

**POST** `/treatmentstrategy`  
Generates adaptive recovery guidance using Gemini 3 reasoning.

---

## 🎥 Demo Focus

The demonstration highlights:

1. Uploading a real crop image
2. AI disease detection
3. Weather-driven 7-day risk forecast
4. Yield impact simulation
5. Autonomous treatment plan

This workflow showcases **Gemini 3 as a continuous agricultural intelligence agent**, not a simple classifier.

---

## 🌱 Real-World Impact

AgriEcho Sentinel aims to support:

* early disease intervention
* reduced pesticide misuse
* climate-adaptive farming
* improved yield stability

By combining **AI autonomy with agricultural insight**, the project explores how next-generation models can contribute to **global food resilience**.

---

## 📄 License

Created for the **Google DeepMind Gemini 3 Hackathon**.
All original code and materials belong to the project authors.

---

## 🤝 Acknowledgment

We thank the Gemini 3 ecosystem and open data providers that made rapid prototyping of real-world AI solutions possible.

---

**AgriEcho Sentinel — Autonomous intelligence for global agriculture.**


