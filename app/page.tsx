import { Navbar } from '@/components/nav/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/ui/Marquee'
import { BrandIntro } from '@/components/sections/BrandIntro'
import { WhyChoose } from '@/components/sections/WhyChoose'
import { Collections } from '@/components/sections/Collections'
import { Bespoke } from '@/components/sections/Bespoke'
import { Process } from '@/components/sections/Process'
import { SocialProof } from '@/components/sections/SocialProof'
import { Showroom } from '@/components/sections/Showroom'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/sections/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Marquee />
        <BrandIntro />
        <WhyChoose />
        <Collections />
        <Bespoke />
        <Process />
        <SocialProof />
        <Showroom />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton variant="sticky" />
    </>
  )
}
