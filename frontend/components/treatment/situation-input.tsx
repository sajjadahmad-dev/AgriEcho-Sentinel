'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap } from 'lucide-react'

interface SituationInputProps {
  onSubmit: (description: string) => void
  isLoading?: boolean
}

const templates = [
  {
    label: 'Heavy rainfall expected',
    value:
      'Heavy rainfall is expected in the next 48 hours. My crops are showing some yellowing on the lower leaves.',
  },
  {
    label: 'Yellowing leaves observed',
    value:
      'I noticed yellowing leaves on my tomato plants. The weather has been humid and the soil is wet.',
  },
  {
    label: 'Fungal spots appearing',
    value:
      'Brown fungal spots have appeared on my crop leaves. The greenhouse humidity is high (80%+).',
  },
]

export function SituationInput({ onSubmit, isLoading }: SituationInputProps) {
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    if (description.trim()) {
      onSubmit(description)
    }
  }

  const handleTemplate = (template: string) => {
    setDescription(template)
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Describe Your Situation</CardTitle>
        <CardDescription>Tell us about your crop and current conditions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Describe your crop condition, symptoms, weather observations, and any other relevant information..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="resize-none"
        />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{description.length} characters</span>
          <span>Min: 10 characters</span>
        </div>

        {/* Templates */}
        <div className="border-t border-border/30 pt-4">
          <p className="text-sm font-semibold mb-2">Quick Templates</p>
          <div className="grid grid-cols-1 gap-2">
            {templates.map((template, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => handleTemplate(template.value)}
                className="justify-start"
              >
                <Zap className="h-3 w-3 mr-2" />
                {template.label}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading || description.trim().length < 10}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isLoading ? 'Generating Strategy...' : 'Get Treatment Strategy'}
        </Button>
      </CardContent>
    </Card>
  )
}
