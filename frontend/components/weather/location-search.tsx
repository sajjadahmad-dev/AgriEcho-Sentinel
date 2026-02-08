'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, MapPin } from 'lucide-react'

interface LocationSearchProps {
  onLocationSelect: (city: string) => void
  isLoading?: boolean
}

const popularCities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Miami',
]

export function LocationSearch({ onLocationSelect, isLoading }: LocationSearchProps) {
  const [location, setLocation] = useState('')

  const handleSearch = () => {
    if (location.trim()) {
      onLocationSelect(location)
    }
  }

  const handleUseMyLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords

            // Use OpenWeather's reverse geocoding API to get city name
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=13edfb9f91a2ee393d63c3c0573dc4dc`
            )

            if (response.ok) {
              const data = await response.json()
              if (data && data.length > 0) {
                const cityName = data[0].name
                onLocationSelect(cityName)
              } else {
                console.error('Could not determine city from coordinates')
                // Fallback to a default city
                onLocationSelect('New York')
              }
            } else {
              console.error('Geocoding API error')
              onLocationSelect('New York')
            }
          } catch (error) {
            console.error('Error getting location:', error)
            // Fallback to a default city
            onLocationSelect('New York')
          }
        },
        (error) => {
          console.error('Geolocation error:', error)
          // Fallback to a default city if geolocation fails
          onLocationSelect('New York')
        }
      )
    } else {
      console.error('Geolocation not supported')
      onLocationSelect('New York')
    }
  }

  return (
    <Card className="border-border/50">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter city name..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading || !location.trim()}
              size="sm"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Use Current Location */}
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={handleUseMyLocation}
            disabled={isLoading}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Use My Location
          </Button>

          {/* Popular Cities */}
          <div className="border-t border-border/30 pt-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Popular Locations
            </p>
            <div className="grid grid-cols-2 gap-2">
              {popularCities.map((city) => (
                <Button
                  key={city}
                  variant="outline"
                  size="sm"
                  onClick={() => onLocationSelect(city)}
                  className="text-xs"
                >
                  {city}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
