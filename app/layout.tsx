import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { LenisProvider } from '@/components/providers/LenisProvider'
import './globals.css'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-cormorant',
})

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1C2526',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://heavenfurnituremart.com'),
  title: 'Heaven Furniture Mart — Bespoke Furniture, Chattogram',
  description:
    'Custom-crafted sofas, beds, dining sets, and office furniture. Designed around your space. Free design consultation. Showroom in Agrabad, Chattogram.',
  openGraph: {
    title: 'Heaven Furniture Mart — Designed. Crafted. Customized.',
    description:
      'Bespoke luxury furniture from Chattogram. Every piece built to your space, taste, and comfort.',
    url: 'https://heavenfurnituremart.com',
    siteName: 'Heaven Furniture Mart',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heaven Furniture Mart — Bespoke Furniture, Chattogram',
    description: 'Custom-crafted furniture built around your space. Free consultation.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Heaven Furniture Mart',
              description: 'Bespoke luxury furniture and interior styling from Chattogram, Bangladesh.',
              url: 'https://heavenfurnituremart.com',
              telephone: '+8801960481983',
              email: 'heavenfurnituremart@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Agrabad Access Road',
                addressLocality: 'Chattogram',
                addressCountry: 'BD',
              },
              founder: { '@type': 'Person', name: 'Abul Kalam Bhuiyan' },
              foundingDate: '2020',
              sameAs: [
                'https://www.facebook.com/HeavenFurnitureMart',
                'https://www.instagram.com/heaven_furniture_ltd',
                'https://www.youtube.com/@HeavenFurnitureMart',
              ],
            }),
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:bg-[var(--color-gold)] focus:text-[var(--color-bg)] focus:px-4 focus:py-2 focus:font-[var(--font-sans)] focus:text-[0.875rem] focus:font-medium">
          Skip to content
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
