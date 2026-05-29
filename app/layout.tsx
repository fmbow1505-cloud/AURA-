import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { CurrencyProvider } from '@/lib/currency-context'
import { WhatsAppButton } from '@/components/whatsapp-button'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'AURA | Premium AI Platform',
  description: 'Experience the future of AI with AURA - A luxury AI platform offering GPT-5, Claude and Gemini in one elegant interface.',
  keywords: ['AI', 'GPT-5', 'Claude', 'Gemini', 'Premium', 'SaaS', 'Chatbot'],
  authors: [{ name: 'AURA Team' }],
  openGraph: {
    title: 'AURA | Premium AI Platform',
    description: 'Experience the future of AI with AURA',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${geistMono.variable} dark`}>
      <body className="font-sans antialiased bg-background min-h-screen">
        <CurrencyProvider>
          {children}
          <WhatsAppButton />
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'toast-gold',
              style: {
                background: 'var(--card)',
                border: '1px solid var(--gold)',
                color: 'var(--foreground)',
              },
            }}
          />
        </CurrencyProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
