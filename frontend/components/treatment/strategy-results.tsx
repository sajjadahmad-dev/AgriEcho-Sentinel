'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { AlertCircle, Clock, Shield, CheckCircle, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface StrategyResult {
  situation: string
  riskLevel: string
  likelyDiseases: string[]
  immediateActions: Array<{
    id: number
    action: string
    urgency: string
    timeframe: string
  }>
  shortTermActions: Array<{
    id: number
    action: string
    timeframe: string
  }>
  preventiveMeasures: Array<{
    id: number
    measure: string
    description: string
  }>
  warningSignsToMonitor: string[]
}

interface StrategyResultsProps {
  strategy: StrategyResult
}

export function StrategyResults({ strategy }: StrategyResultsProps) {
  const [checkedActions, setCheckedActions] = useState<number[]>([])

  const toggleAction = (id: number) => {
    setCheckedActions((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-red-100 text-red-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const generatePDF = () => {
    // Create a printable HTML content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Treatment Strategy Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #333; }
          h2 { color: #666; margin-top: 20px; }
          .risk-badge { 
            display: inline-block; 
            padding: 5px 10px; 
            border-radius: 5px; 
            font-weight: bold;
            ${strategy.riskLevel === 'High' ? 'background: #fee2e2; color: #991b1b;' :
        strategy.riskLevel === 'Medium' ? 'background: #fef3c7; color: #92400e;' :
          'background: #d1fae5; color: #065f46;'}
          }
          .section { margin: 20px 0; }
          .action-item { 
            margin: 10px 0; 
            padding: 10px; 
            background: #f9fafb; 
            border-left: 3px solid #3b82f6;
          }
          .disease-tag { 
            display: inline-block; 
            margin: 5px; 
            padding: 5px 10px; 
            background: #e5e7eb; 
            border-radius: 5px;
          }
          ul { list-style-type: none; padding-left: 0; }
          li { margin: 5px 0; }
        </style>
      </head>
      <body>
        <h1>Treatment Strategy Report</h1>
        <p><strong>Risk Level:</strong> <span class="risk-badge">${strategy.riskLevel} Risk</span></p>
        
        <div class="section">
          <h2>Situation Summary</h2>
          <p>${strategy.situation}</p>
        </div>

        <div class="section">
          <h2>Likely Diseases</h2>
          ${strategy.likelyDiseases.map(d => `<span class="disease-tag">${d}</span>`).join('')}
        </div>

        <div class="section">
          <h2>Immediate Actions Required</h2>
          ${strategy.immediateActions.map(action => `
            <div class="action-item">
              <strong>${action.action}</strong><br>
              <small>Urgency: ${action.urgency} | Timeframe: ${action.timeframe}</small>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <h2>Short-term Actions</h2>
          ${strategy.shortTermActions.map(action => `
            <div class="action-item">
              <strong>${action.action}</strong><br>
              <small>Timeframe: ${action.timeframe}</small>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <h2>Preventive Measures</h2>
          <ul>
            ${strategy.preventiveMeasures.map(measure => `
              <li><strong>${measure.measure}:</strong> ${measure.description}</li>
            `).join('')}
          </ul>
        </div>

        <div class="section">
          <h2>Warning Signs to Monitor</h2>
          <ul>
            ${strategy.warningSignsToMonitor.map(sign => `<li>• ${sign}</li>`).join('')}
          </ul>
        </div>

        <p style="margin-top: 30px; color: #666; font-size: 12px;">
          Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
        </p>
      </body>
      </html>
    `

    // Create a new window and print
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.focus()

      // Wait for content to load then print
      setTimeout(() => {
        printWindow.print()
      }, 250)
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Treatment Strategy</CardTitle>
              <CardDescription>AI-generated action plan for your situation</CardDescription>
            </div>
            <Badge className={getRiskColor(strategy.riskLevel)}>
              {strategy.riskLevel} Risk
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Likely Diseases</h3>
            <div className="flex flex-wrap gap-2">
              {strategy.likelyDiseases.map((disease, idx) => (
                <Badge key={idx} variant="secondary">
                  {disease}
                </Badge>
              ))}
            </div>
          </div>
          <div className="border-t border-border/30 pt-4">
            <p className="text-sm text-muted-foreground">{strategy.situation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Immediate Actions */}
      <Card className="border-2 border-red-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <CardTitle className="text-red-900">Immediate Actions Required</CardTitle>
          </div>
          <CardDescription>Take these steps within the next 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {strategy.immediateActions.map((action) => (
              <div
                key={action.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-100"
              >
                <Checkbox
                  checked={checkedActions.includes(action.id)}
                  onCheckedChange={() => toggleAction(action.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{action.action}</p>
                    <Badge variant="outline" className="text-xs">
                      {action.urgency}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{action.timeframe}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Short-term Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            <CardTitle>Short-term Actions</CardTitle>
          </div>
          <CardDescription>Complete within the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {strategy.shortTermActions.map((action) => (
              <div
                key={action.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100"
              >
                <Checkbox
                  checked={checkedActions.includes(action.id + 100)}
                  onCheckedChange={() => toggleAction(action.id + 100)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{action.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{action.timeframe}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preventive Measures */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            <CardTitle>Preventive Measures</CardTitle>
          </div>
          <CardDescription>Long-term strategies to prevent future issues</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {strategy.preventiveMeasures.map((measure) => (
              <AccordionItem key={measure.id} value={`measure-${measure.id}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {measure.measure}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{measure.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Warning Signs */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Warning Signs to Monitor</CardTitle>
          <CardDescription>Watch for these symptoms over the next 2 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {strategy.warningSignsToMonitor.map((sign, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/30">
                <AlertCircle className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">{sign}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent"
          onClick={generatePDF}
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  )
}
