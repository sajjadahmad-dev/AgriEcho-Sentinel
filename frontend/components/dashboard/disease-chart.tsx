'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useAppStore } from '@/lib/store'

export function DiseaseChart() {
  const analyses = useAppStore((state) => state.analyses)

  // Group diseases by type
  const diseaseCount: Record<string, number> = {}
  analyses.forEach((analysis) => {
    if (analysis.disease && analysis.disease !== 'Healthy') {
      diseaseCount[analysis.disease] = (diseaseCount[analysis.disease] || 0) + 1
    }
  })

  const data = Object.entries(diseaseCount).map(([name, value]) => ({
    name,
    value,
  }))

  if (data.length === 0) {
    return (
      <Card className="border-border/50 col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Disease Distribution</CardTitle>
          <CardDescription>No diseases detected yet</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-muted-foreground">
            Analyze crops to see disease distribution
          </p>
        </CardContent>
      </Card>
    )
  }

  const COLORS = [
    'hsl(160 84% 39%)',
    'hsl(187 100% 55%)',
    'hsl(38 92% 50%)',
    'hsl(10 100% 60%)',
    'hsl(280 100% 70%)',
  ]

  return (
    <Card className="border-border/50 col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Disease Distribution</CardTitle>
        <CardDescription>
          Breakdown of detected diseases across your crops
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
