'use client'

import { AnalysisResult } from '@/lib/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface AnalysisResultsProps {
  result: AnalysisResult
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mild':
        return 'bg-blue-100 text-blue-800'
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Severe':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  const isSevere = result.severity === 'Severe'

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className={`border-2 ${isSevere ? 'border-red-200' : 'border-border/50'}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{result.crop}</CardTitle>
              <CardDescription>Analysis completed</CardDescription>
            </div>
            {result.disease === 'Healthy' ? (
              <CheckCircle className="h-8 w-8 text-primary" />
            ) : (
              <AlertCircle className={`h-8 w-8 ${isSevere ? 'text-red-500' : 'text-yellow-500'}`} />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Disease Info */}
          <div>
            <h3 className="font-semibold mb-3">Disease Detection</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Disease</span>
                <Badge className={getSeverityColor(result.severity)}>
                  {result.disease}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Severity</span>
                <span className="font-medium">{result.severity}</span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Confidence</span>
                  <span className="font-medium">{Math.round(result.confidence * 100)}%</span>
                </div>
                <Progress value={result.confidence * 100} className="h-2" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-border/30 pt-4">
            <h3 className="font-semibold mb-2">About This Disease</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Treatments */}
          {result.treatments.length > 0 && (
            <div className="border-t border-border/30 pt-4">
              <h3 className="font-semibold mb-3">Recommended Treatments</h3>
              <Accordion type="single" collapsible className="w-full">
                {result.treatments.map((treatment) => (
                  <AccordionItem key={treatment.id} value={`treatment-${treatment.id}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {treatment.priority}
                        </Badge>
                        {treatment.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        {treatment.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
