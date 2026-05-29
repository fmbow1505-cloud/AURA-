import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { PricingSection } from '@/components/pricing-section'
import { WorldMapSection } from '@/components/world-map-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-background">
      <Header user={user ? { email: user.email || '' } : null} />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <WorldMapSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
