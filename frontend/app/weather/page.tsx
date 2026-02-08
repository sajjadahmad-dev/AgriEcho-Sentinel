'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { LocationSearch } from '@/components/weather/location-search'
import { RiskAssessment } from '@/components/weather/risk-assessment'
import { useAppStore, type DiseaseRisk } from '@/lib/store'
import { getDiseaseRisk as getDiseaseRiskApi } from '@/lib/api'

export default function WeatherPage() {
  const [selectedCity, setSelectedCity] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [riskData, setRiskData] = useState<DiseaseRisk | null>(null)
  const setDiseaseRisk = useAppStore((state) => state.setDiseaseRisk)
  const getDiseaseRisk = useAppStore((state) => state.getDiseaseRisk)

  const handleLocationSelect = async (city: string) => {
    setSelectedCity(city)
    setIsLoading(true)

    try {
      // Check if we have cached data
      const cached = getDiseaseRisk(city)
      if (cached) {
        setRiskData(cached)
        setIsLoading(false)
        return
      }

      const apiResponse = await getDiseaseRiskApi(city)

      const risk: DiseaseRisk = {
        city: apiResponse.city,
        temperature: apiResponse.weather.temp,
        humidity: apiResponse.weather.humidity,
        rainfall: apiResponse.weather.rain,
        riskLevel: apiResponse.risk_assessment.riskLevel,
        riskScore: parseInt(apiResponse.risk_assessment.riskScore) || 0,
        recommendations: apiResponse.risk_assessment.recommendations || [],
      }

      setRiskData(risk)
      setDiseaseRisk(city, risk)
    } catch (error) {
      console.error('Failed to fetch disease risk:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Weather Analysis</h1>
            <p className="text-muted-foreground mt-2">
              Get weather-based disease risk predictions for your location
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search Section */}
            <div className="lg:col-span-1">
              <LocationSearch
                onLocationSelect={handleLocationSelect}
                isLoading={isLoading}
              />
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
              {riskData ? (
                <RiskAssessment risk={riskData} />
              ) : (
                <div className="border border-dashed border-border/50 rounded-lg p-12 text-center">
                  <p className="text-muted-foreground">
                    {selectedCity
                      ? 'Loading weather data...'
                      : 'Select a location to view disease risk assessment'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3">How It Works</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes local weather patterns including temperature,
                humidity, and rainfall to predict disease outbreak risks.
              </p>
            </div>
            <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Risk Factors</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• High humidity</li>
                <li>• Recent rainfall</li>
                <li>• Temperature range</li>
                <li>• Wind patterns</li>
              </ul>
            </div>
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Best Practices</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Monitor daily weather</li>
                <li>• Scout fields regularly</li>
                <li>• Apply treatments early</li>
                <li>• Improve drainage</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
