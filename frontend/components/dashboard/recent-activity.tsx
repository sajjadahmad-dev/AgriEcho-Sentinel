'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/lib/store'

export function RecentActivity() {
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

  const recentAnalyses = analyses.slice(0, 5)

  return (
    <Card className="border-border/50 col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest crop analyses and results</CardDescription>
      </CardHeader>
      <CardContent>
        {recentAnalyses.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8">
            No analyses yet. Start by uploading a crop image.
          </p>
        ) : (
          <div className="space-y-4">
            {recentAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                className="flex items-center justify-between pb-4 border-b border-border/30 last:border-0"
              >
                <div className="flex-1">
                  <div className="font-medium">{analysis.crop}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(analysis.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{analysis.disease}</span>
                  <Badge className={getSeverityColor(analysis.severity)}>
                    {analysis.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
