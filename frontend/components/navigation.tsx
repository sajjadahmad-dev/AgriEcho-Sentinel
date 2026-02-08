'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">AC</span>
            </div>
            <span className="text-lg font-bold text-primary">AgriCare</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/image-analysis"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Analysis
            </Link>
            <Link
              href="/weather"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Weather
            </Link>
            <Link
              href="/treatment"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Treatment
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border/40 py-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
            >
              Dashboard
            </Link>
            <Link
              href="/image-analysis"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
            >
              Analysis
            </Link>
            <Link
              href="/weather"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
            >
              Weather
            </Link>
            <Link
              href="/treatment"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
            >
              Treatment
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
