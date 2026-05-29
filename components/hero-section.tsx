'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, Zap, Shield, Globe } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 float-animation">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Premium AI Experience</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight text-balance">
            The Future of AI
            <span className="block text-primary shimmer-gold bg-clip-text">
              Is Here
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Experience GPT-5, Claude, and Gemini in one elegant interface. 
            AURA delivers premium AI capabilities with unparalleled sophistication.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg glow-gold">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 px-8 py-6 text-lg">
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Secure</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">3</div>
              <div className="text-sm text-muted-foreground">Global Servers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
