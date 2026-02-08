'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export function OverviewCards() {
  const analyses = useAppStore((state) => state.analyses)

  const totalAnalyses = analyses.length
  const detectedDiseases = analyses.filter((a) => a.disease !== 'Healthy').length
  const healthyCrops = analyses.filter((a) => a.disease === 'Healthy').length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
          <BarChart3 className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalAnalyses}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {totalAnalyses > 0 ? 'Crops analyzed' : 'Start analyzing crops'}
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Detected Diseases</CardTitle>
          <AlertCircle className="h-5 w-5 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{detectedDiseases}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {detectedDiseases > 0
              ? `${((detectedDiseases / totalAnalyses) * 100).toFixed(0)}% of crops affected`
              : 'No diseases detected yet'}
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Healthy Crops</CardTitle>
          <CheckCircle className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{healthyCrops}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {healthyCrops > 0
              ? `${((healthyCrops / totalAnalyses) * 100).toFixed(0)}% healthy`
              : 'No healthy crops yet'}
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
          <Clock className="h-5 w-5 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{detectedDiseases}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {detectedDiseases > 0 ? 'Treatment strategies needed' : 'All clear'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
