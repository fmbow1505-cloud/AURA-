'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CurrencySelector } from '@/components/currency-selector'
import { Menu, X, Sparkles } from 'lucide-react'

interface HeaderProps {
  user?: { email: string } | null
}

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center glow-gold">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-serif text-2xl font-bold text-primary">AURA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="/#pricing" className="text-muted-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/#servers" className="text-muted-foreground hover:text-primary transition-colors">
            Global Network
          </Link>
          <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <CurrencySelector />
          {user ? (
            <Link href="/dashboard">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Login
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shimmer-gold">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/#features" className="text-foreground hover:text-primary py-2">
              Features
            </Link>
            <Link href="/#pricing" className="text-foreground hover:text-primary py-2">
              Pricing
            </Link>
            <Link href="/#servers" className="text-foreground hover:text-primary py-2">
              Global Network
            </Link>
            <Link href="/#contact" className="text-foreground hover:text-primary py-2">
              Contact
            </Link>
            <div className="flex items-center gap-4 pt-2 border-t border-border">
              <CurrencySelector />
              {user ? (
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full bg-primary text-primary-foreground">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login" className="flex-1">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/auth/sign-up" className="flex-1">
                    <Button className="w-full bg-primary text-primary-foreground">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
