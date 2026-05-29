'use client'

import { useCurrency } from '@/lib/currency-context'
import { PRODUCTS } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Check, Sparkles, Crown, Zap, Building2 } from 'lucide-react'
import Link from 'next/link'

const tierIcons = {
  starter: Zap,
  pro: Sparkles,
  business: Building2,
  empire: Crown,
}

const tierColors = {
  starter: 'from-zinc-500 to-zinc-600',
  pro: 'from-amber-500 to-yellow-500',
  business: 'from-blue-500 to-cyan-500',
  empire: 'from-amber-400 via-yellow-500 to-amber-600',
}

export function PricingSection() {
  const { formatPrice, currency } = useCurrency()

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Luxury background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Crown className="w-4 h-4" />
            Empire Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-6 mb-6 text-balance">
            Choose Your Empire
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-pretty">
            Invest in excellence. All plans include our premium AI models 
            and world-class support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PRODUCTS.map((product) => {
            const TierIcon = tierIcons[product.tier]
            const isPopular = product.popular
            const isEmpire = product.tier === 'empire'

            return (
              <Card 
                key={product.id}
                className={`relative bg-card/50 border-border/50 transition-all duration-500 hover:shadow-2xl group overflow-hidden
                  ${isPopular ? 'border-primary shadow-xl shadow-primary/20 scale-105 z-10' : 'hover:border-primary/50 hover:scale-102'}
                  ${isEmpire ? 'border-primary/70' : ''}
                `}
              >
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tierColors[product.tier]}`} />

                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg shadow-primary/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Empire badge */}
                {isEmpire && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-sm font-medium shadow-lg shimmer-gold">
                      <Crown className="w-3.5 h-3.5" />
                      Ultimate Power
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pt-8 pb-4">
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${tierColors[product.tier]} flex items-center justify-center mb-4 ${isPopular || isEmpire ? 'glow-gold' : ''}`}>
                    <TierIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mt-2">{product.description}</p>
                </CardHeader>

                <CardContent className="text-center pb-6">
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-foreground">
                      {formatPrice(product.priceInEur)}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">/month</span>
                  </div>

                  <ul className="space-y-3 text-left">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tierColors[product.tier]} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-0">
                  <Link href={`/checkout/${product.id}?currency=${currency}`} className="w-full">
                    <Button 
                      className={`w-full transition-all duration-300 ${
                        isPopular || isEmpire
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-600 hover:to-yellow-600 glow-gold' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:border-primary/50 border border-transparent'
                      }`}
                      size="lg"
                    >
                      {isEmpire ? 'Claim Your Empire' : `Choose ${product.name}`}
                    </Button>
                  </Link>
                </CardFooter>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
                </div>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground text-sm">
            All prices shown in <span className="text-primary font-medium">{currency}</span>. 
            Cancel anytime. 14-day money-back guarantee.
          </p>
          <p className="text-muted-foreground/70 text-xs">
            Secure payments via Stripe. For African payments, Wave and Orange Money available.
          </p>
        </div>
      </div>
    </section>
  )
}
