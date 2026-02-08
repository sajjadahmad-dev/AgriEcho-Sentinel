import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

// Image Analysis API
export async function analyzeImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await apiClient.post('/image_analysis', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to analyze image'
    )
  }
}

// Disease Risk API
export async function getDiseaseRisk(city: string) {
  try {
    const response = await apiClient.get(`/disease-risk/${city}`)
    return response.data
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch disease risk'
    )
  }
}

// Treatment Strategy API
export async function getTreatmentStrategy(description: string) {
  try {
    const response = await apiClient.post('/treatmentstrategy', {
      input_text: description,
    })
    return response.data
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to generate treatment strategy'
    )
  }
}

// Mock data for development/demo
export const mockAnalysisResult = {
  crop: 'Tomato',
  disease: 'Early Blight',
  severity: 'Moderate',
  confidence: 0.92,
  description:
    'Early blight is a fungal disease that causes brown spots with concentric rings on leaves',
  treatments: [
    {
      id: 1,
      name: 'Fungicide Application',
      description: 'Apply copper-based fungicide every 7-10 days',
      priority: 'High',
    },
    {
      id: 2,
      name: 'Remove Affected Leaves',
      description: 'Prune lower leaves showing symptoms to prevent spread',
      priority: 'High',
    },
    {
      id: 3,
      name: 'Improve Air Circulation',
      description: 'Space plants further apart and improve ventilation',
      priority: 'Medium',
    },
  ],
}

export const mockDiseaseRisk = {
  city: 'Springfield, IL',
  temperature: 28,
  humidity: 75,
  rainfall: 45,
  riskLevel: 'Medium',
  riskScore: 65,
  recommendations: [
    'Monitor crops for fungal infections due to high humidity',
    'Ensure proper drainage to prevent waterlogging',
    'Apply preventive fungicide treatments',
  ],
}

export const mockTreatmentStrategy = {
  situation: 'Heavy rainfall expected with yellowing leaves',
  riskLevel: 'High',
  likelyDiseases: ['Fungal Leaf Spot', 'Root Rot'],
  immediateActions: [
    {
      id: 1,
      action: 'Improve field drainage immediately',
      urgency: 'Critical',
      timeframe: 'Today',
    },
    {
      id: 2,
      action: 'Apply copper fungicide on all affected areas',
      urgency: 'Critical',
      timeframe: 'Today',
    },
    {
      id: 3,
      action: 'Stop irrigation for next 48 hours',
      urgency: 'High',
      timeframe: 'Immediately',
    },
  ],
  shortTermActions: [
    {
      id: 1,
      action: 'Monitor weather forecasts daily',
      timeframe: '7 days',
    },
    {
      id: 2,
      action: 'Scout fields every 2-3 days for new symptoms',
      timeframe: '7 days',
    },
    {
      id: 3,
      action: 'Apply second round of fungicide',
      timeframe: '7 days',
    },
  ],
  preventiveMeasures: [
    {
      id: 1,
      measure: 'Implement crop rotation practices',
      description: 'Rotate crops annually to break disease cycle',
    },
    {
      id: 2,
      measure: 'Plant disease-resistant varieties',
      description: 'Choose crop varieties with genetic disease resistance',
    },
    {
      id: 3,
      measure: 'Maintain proper plant spacing',
      description: 'Ensure adequate air circulation between plants',
    },
  ],
  warningSignsToMonitor: [
    'Rapid spread of leaf spots',
    'Sudden leaf wilting',
    'Yellow halos around lesions',
    'White fungal growth on stems',
  ],
}
