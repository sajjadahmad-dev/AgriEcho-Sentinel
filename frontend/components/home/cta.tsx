'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Protecting Your Crops Today
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of farmers who are using AgriCare to maximize crop health and yield
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 gap-2">
            Launch Dashboard
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
