import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero'
import { FeaturesSection } from '@/components/home/features'
import { HowItWorksSection } from '@/components/home/how-it-works'
import { StatsSection } from '@/components/home/stats'
import { CTASection } from '@/components/home/cta'

export default function Page() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </>
  )
}
