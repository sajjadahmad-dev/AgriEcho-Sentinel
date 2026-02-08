'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Leaf, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-pulse">
        <Leaf className="h-24 w-24 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-15 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <Sprout className="h-32 w-32 text-secondary" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 leading-tight">
          AI-Powered Crop Disease Detection & Treatment
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Protect your crops with advanced AI analysis, weather-based risk assessment, and personalized treatment
          strategies. Maximize yield and minimize losses.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg px-8"
            >
              Launch Dashboard
            </Button>
          </Link>
          <Link href="#features">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 bg-transparent"
            >
              Learn More
            </Button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
