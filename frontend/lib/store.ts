import { create } from 'zustand'

export interface AnalysisResult {
  id: string
  crop: string
  disease: string
  severity: 'Mild' | 'Moderate' | 'Severe'
  confidence: number
  description: string
  imageUrl?: string
  timestamp: Date
  treatments: Array<{
    id: number
    name: string
    description: string
    priority: 'High' | 'Medium' | 'Low'
  }>
}

export interface DiseaseRisk {
  city: string
  temperature: number
  humidity: number
  rainfall: number
  riskLevel: 'Low' | 'Medium' | 'High'
  riskScore: number
  recommendations: string[]
}

interface AppStore {
  analyses: AnalysisResult[]
  addAnalysis: (analysis: AnalysisResult) => void
  removeAnalysis: (id: string) => void
  getAnalysis: (id: string) => AnalysisResult | undefined
  diseaseRisks: Record<string, DiseaseRisk>
  setDiseaseRisk: (city: string, risk: DiseaseRisk) => void
  getDiseaseRisk: (city: string) => DiseaseRisk | undefined
}

export const useAppStore = create<AppStore>((set, get) => ({
  analyses: [],
  addAnalysis: (analysis) =>
    set((state) => ({
      analyses: [analysis, ...state.analyses],
    })),
  removeAnalysis: (id) =>
    set((state) => ({
      analyses: state.analyses.filter((a) => a.id !== id),
    })),
  getAnalysis: (id) => get().analyses.find((a) => a.id === id),
  diseaseRisks: {},
  setDiseaseRisk: (city, risk) =>
    set((state) => ({
      diseaseRisks: {
        ...state.diseaseRisks,
        [city]: risk,
      },
    })),
  getDiseaseRisk: (city) => get().diseaseRisks[city],
}))
