'use client'

import { DiseaseRisk } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface RiskAssessmentProps {
  risk: DiseaseRisk
}

export function RiskAssessment({ risk }: RiskAssessmentProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'High':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskIcon = (level: string) => {
    if (level === 'Low') {
      return <CheckCircle className="h-12 w-12 text-green-500" />
    }
    return <AlertCircle className="h-12 w-12 text-red-500" />
  }

  // Mock trend data
  const trendData = [
    { day: 'Mon', risk: 40 },
    { day: 'Tue', risk: 55 },
    { day: 'Wed', risk: 65 },
    { day: 'Thu', risk: 72 },
    { day: 'Fri', risk: 68 },
    { day: 'Sat', risk: 45 },
    { day: 'Sun', risk: 35 },
  ]

  return (
    <div className="space-y-6">
      {/* Risk Level Card */}
      <Card className={`border-2 ${risk.riskLevel === 'High' ? 'border-red-200' : 'border-border/50'}`}>
        <CardHeader>
          <CardTitle className="mb-4">{risk.city}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-muted/50">
              {getRiskIcon(risk.riskLevel)}
              <Badge className={`mt-4 ${getRiskColor(risk.riskLevel)}`}>
                {risk.riskLevel} Risk
              </Badge>
              <p className="text-4xl font-bold mt-4">{risk.riskScore}%</p>
              <p className="text-sm text-muted-foreground">Disease Outbreak Risk</p>
            </div>

            {/* Weather Metrics */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Temperature</p>
                  <p className="text-2xl font-bold">{risk.temperature}°C</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Humidity</p>
                  <p className="text-2xl font-bold">{risk.humidity}%</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Rainfall</p>
                  <p className="text-2xl font-bold">{risk.rainfall}mm</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="text-sm font-semibold">{risk.riskLevel} Risk</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="border-t border-border/30 pt-6">
            <h3 className="font-semibold mb-4">Risk Trend (7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="hsl(160 84% 39%)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(160 84% 39%)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendations */}
          <div className="border-t border-border/30 pt-6">
            <h3 className="font-semibold mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {risk.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
