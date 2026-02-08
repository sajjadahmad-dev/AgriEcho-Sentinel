'use client'

import { ImageIcon, Cloud, Leaf, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: ImageIcon,
    title: 'Image Analysis',
    description:
      'Upload crop images and let our AI instantly identify diseases with high accuracy and severity assessment.',
  },
  {
    icon: Cloud,
    title: 'Weather Risk Assessment',
    description:
      'Analyze weather patterns and receive AI-powered predictions on disease outbreak risks for your location.',
  },
  {
    icon: Leaf,
    title: 'Smart Treatment Plans',
    description:
      'Get personalized, actionable treatment strategies based on crop type, disease, and environmental conditions.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Track analysis history, monitor disease trends, and access detailed reports for better farm management.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 px-4 md:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to protect your crops and maximize yield
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card
                key={idx}
                className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
