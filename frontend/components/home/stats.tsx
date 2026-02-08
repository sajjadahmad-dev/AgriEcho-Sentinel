'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'

interface Stat {
  label: string
  value: number
  suffix: string
}

const stats: Stat[] = [
  { label: 'Crops Analyzed', value: 50000, suffix: '+' },
  { label: 'Diseases Detected', value: 320, suffix: '+' },
  { label: 'Success Rate', value: 94, suffix: '%' },
  { label: 'Farmers Helped', value: 12500, suffix: '+' },
]

interface CounterProps {
  target: number
}

function Counter({ target }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const increment = target / 60
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, 30)

    return () => clearInterval(interval)
  }, [target])

  return <span>{count.toLocaleString()}</span>
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-0 bg-primary/5">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="border-border/50 text-center p-8">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {isVisible ? <Counter target={stat.value} /> : 0}
                {stat.suffix}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
