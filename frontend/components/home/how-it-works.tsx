'use client'

import { Upload, Zap, Cloud, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

const steps = [
  {
    icon: Upload,
    title: 'Upload Image',
    description: 'Take or upload a photo of your crop to get started',
  },
  {
    icon: Zap,
    title: 'AI Analysis',
    description: 'Our advanced AI analyzes the image for diseases',
  },
  {
    icon: Cloud,
    title: 'Risk Assessment',
    description: 'Get weather-based disease outbreak risk predictions',
  },
  {
    icon: CheckCircle,
    title: 'Treatment Plan',
    description: 'Receive personalized treatment strategies and actions',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simple, fast, and effective crop disease detection in 4 easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="relative">
                <Card className="border-border/50 h-full p-6 text-center">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {idx + 1}
                  </div>
                  <div className="mt-6 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-3 w-6 h-1 bg-gradient-to-r from-primary to-transparent" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
