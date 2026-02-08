'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { UploadZone } from '@/components/image-analysis/upload-zone'
import { AnalysisResults } from '@/components/image-analysis/analysis-results'
import { AnalysisHistory } from '@/components/image-analysis/analysis-history'
import { Button } from '@/components/ui/button'
import { useAppStore, type AnalysisResult } from '@/lib/store'
import { analyzeImage } from '@/lib/api'
import { Loader2 } from 'lucide-react'

export default function ImageAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null)
  const addAnalysis = useAppStore((state) => state.addAnalysis)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    try {
      const apiResult = await analyzeImage(selectedFile)

      // Create analysis result
      const result: AnalysisResult = {
        id: Date.now().toString(),
        crop: apiResult.crop,
        disease: apiResult.disease,
        severity: apiResult.severity,
        confidence: apiResult.confidence,
        description: apiResult.description,
        timestamp: new Date(),
        treatments: apiResult.treatments || [],
        imageUrl: URL.createObjectURL(selectedFile),
      }

      setCurrentResult(result)
      addAnalysis(result)
      setSelectedFile(null)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-background to-primary/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Image Analysis</h1>
            <p className="text-muted-foreground mt-2">
              Upload a crop image to detect diseases and get treatment recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-2 space-y-6">
              <UploadZone onFileSelect={handleFileSelect} selectedFile={selectedFile} />

              {selectedFile && (
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  {isAnalyzing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                </Button>
              )}

              {/* Results */}
              {currentResult && <AnalysisResults result={currentResult} />}

              {/* History */}
              <AnalysisHistory />
            </div>

            {/* Info Sidebar */}
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-sm">Tips for Best Results</h3>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>✓ Use clear, well-lit photos</li>
                  <li>✓ Include affected areas in the frame</li>
                  <li>✓ Avoid shadows and reflections</li>
                  <li>✓ Take images from multiple angles</li>
                  <li>✓ Include leaves and stems</li>
                </ul>
              </div>

              <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-sm">Supported Crops</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Tomato</li>
                  <li>• Wheat</li>
                  <li>• Corn</li>
                  <li>• Potato</li>
                  <li>• Rice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
