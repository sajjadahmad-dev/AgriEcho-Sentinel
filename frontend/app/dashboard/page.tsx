import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { OverviewCards } from '@/components/dashboard/overview-cards'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { DiseaseChart } from '@/components/dashboard/disease-chart'
import { WeatherWidget } from '@/components/dashboard/weather-widget'

export default function DashboardPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-background to-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitor your crop health and disease detection at a glance
            </p>
          </div>

          {/* Overview Cards */}
          <div className="mb-8">
            <OverviewCards />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <DiseaseChart />
            <RecentActivity />
          </div>

          {/* Weather Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <WeatherWidget />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
