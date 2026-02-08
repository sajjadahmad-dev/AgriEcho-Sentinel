'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ImageIcon, Cloud, Leaf } from 'lucide-react'

const actions = [
  {
    icon: ImageIcon,
    label: 'Upload Image',
    description: 'Analyze a crop image',
    href: '/image-analysis',
  },
  {
    icon: Cloud,
    label: 'Weather Risk',
    description: 'Check disease risk',
    href: '/weather',
  },
  {
    icon: Leaf,
    label: 'Treatment Plan',
    description: 'Get treatment strategy',
    href: '/treatment',
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action, idx) => {
        const Icon = action.icon
        return (
          <Card key={idx} className="border-border/50 hover:border-primary/50 transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{action.label}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
                <Link href={action.href} className="w-full">
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    Go
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
