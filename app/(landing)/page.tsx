import { LandingContent } from '@/components/landing-content'
import { LandingFooter } from '@/components/landing-footer'
import { LandingHero } from '@/components/landing-hero'
import { LandingNavbar } from '@/components/landing-navbar'

const LandingPage = () => (
  <div className="h-full">
    <LandingNavbar />
    <LandingHero />
    <LandingContent />
    <LandingFooter />
  </div>
)

export default LandingPage
