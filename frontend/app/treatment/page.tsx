'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { SituationInput } from '@/components/treatment/situation-input'
import { StrategyResults } from '@/components/treatment/strategy-results'
import { getTreatmentStrategy } from '@/lib/api'
import { Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function TreatmentPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [strategy, setStrategy] = useState(null as any)

  const handleSubmitSituation = async (description: string) => {
    setIsLoading(true)
    try {
      const result = await getTreatmentStrategy(description)
      setStrategy(result)
    } catch (error) {
      console.error('Failed to generate strategy:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-background to-accent/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Treatment Strategy</h1>
            <p className="text-muted-foreground mt-2">
              Describe your crop situation and receive an AI-generated treatment plan
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="lg:col-span-1">
              <SituationInput onSubmit={handleSubmitSituation} isLoading={isLoading} />
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              {isLoading ? (
                <Card className="border-border/50">
                  <CardContent className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Analyzing your situation...</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Our AI is processing your information
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : strategy ? (
                <StrategyResults strategy={strategy} />
              ) : (
                <Card className="border-dashed border-border/50">
                  <CardContent className="h-96 flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Describe your crop situation to receive a personalized treatment strategy
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3">What to Include</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Crop type and variety</li>
                <li>• Visible symptoms</li>
                <li>• Recent weather</li>
                <li>• Field conditions</li>
                <li>• Previous treatments</li>
              </ul>
            </div>
            <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3">AI Analysis Includes</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Disease identification</li>
                <li>• Risk assessment</li>
                <li>• Action priorities</li>
                <li>• Timeline guidance</li>
                <li>• Prevention tips</li>
              </ul>
            </div>
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Next Steps</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Review immediate actions</li>
                <li>• Check recommended treatments</li>
                <li>• Monitor warning signs</li>
                <li>• Track progress daily</li>
                <li>• Adjust as needed</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
