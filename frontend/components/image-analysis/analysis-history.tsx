'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'

export function AnalysisHistory() {
  const analyses = useAppStore((state) => state.analyses)

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

  if (analyses.length === 0) {
    return null
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Analysis History</CardTitle>
        <CardDescription>Your recent crop analyses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-sm">{analysis.crop}</h4>
                  <p className="text-xs text-muted-foreground">
                    {new Date(analysis.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={getSeverityColor(analysis.severity)}>
                  {analysis.severity}
                </Badge>
              </div>
              <p className="text-sm font-medium mb-3">{analysis.disease}</p>
              <p className="text-xs text-muted-foreground">
                Confidence: {Math.round(analysis.confidence * 100)}%
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
