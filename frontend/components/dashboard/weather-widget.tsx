'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, CloudRain, Wind, Droplets } from 'lucide-react'

export function WeatherWidget() {
  // Mock weather data
  const weather = {
    city: 'Springfield, IL',
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    rainfall: 0,
    forecast: [
      { day: 'Tomorrow', high: 26, low: 18, condition: 'Rainy' },
      { day: 'Wednesday', high: 24, low: 16, condition: 'Cloudy' },
      { day: 'Thursday', high: 22, low: 14, condition: 'Sunny' },
    ],
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Weather</CardTitle>
        <CardDescription>{weather.city}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current weather */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold">{weather.temp}°C</div>
              <p className="text-sm text-muted-foreground">{weather.condition}</p>
            </div>
            <Cloud className="h-12 w-12 text-secondary" />
          </div>

          {/* Weather metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="font-semibold">{weather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Wind</p>
                <p className="font-semibold">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div className="border-t border-border/30 pt-4">
            <p className="text-xs font-semibold mb-3 text-muted-foreground">5-Day Forecast</p>
            <div className="space-y-2">
              {weather.forecast.map((day, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground w-20">{day.day}</span>
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <CloudRain className="h-4 w-4" />
                    <span className="w-12 text-right">
                      {day.low}°-{day.high}°
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
