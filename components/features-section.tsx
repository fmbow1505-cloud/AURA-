'use client'

import { useState } from 'react'
import { Brain, Zap, Shield, Globe, Sparkles, MessageSquare, Code, BarChart3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import {
  MultiModelChatModal,
  LightningFastModal,
  SecurityAuthModal,
  GlobalNetworkModal,
  NaturalConversationsModal,
  DeveloperAPIModal,
  AnalyticsDashboardModal,
  CustomAgentsModal,
} from '@/components/feature-modals'

type ModalType = 
  | 'multi-model' 
  | 'lightning' 
  | 'security' 
  | 'network' 
  | 'conversations' 
  | 'api' 
  | 'analytics' 
  | 'agents' 
  | null

const features = [
  {
    icon: Brain,
    title: 'Multi-Model AI',
    description: 'Access GPT-4, Claude, and Gemini in one platform. Switch between models seamlessly.',
    modalType: 'multi-model' as const,
    gradient: 'from-amber-500/20 to-yellow-500/20',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Real-time streaming responses with optimized processing for instant results.',
    modalType: 'lightning' as const,
    gradient: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and SOC 2 compliance. Your data is always protected.',
    modalType: 'security' as const,
    gradient: 'from-emerald-500/20 to-green-500/20',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Servers in Dakar, Paris, and New York for minimal latency worldwide.',
    modalType: 'network' as const,
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description: 'Contextual memory and natural dialogue for human-like interactions.',
    modalType: 'conversations' as const,
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    icon: Code,
    title: 'Developer API',
    description: 'Full REST API access with comprehensive documentation and SDKs.',
    modalType: 'api' as const,
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track usage, monitor performance, and optimize your AI workflows.',
    modalType: 'analytics' as const,
    gradient: 'from-amber-500/20 to-red-500/20',
  },
  {
    icon: Sparkles,
    title: 'Custom Agents',
    description: 'Create specialized AI agents tailored to your specific needs.',
    modalType: 'agents' as const,
    gradient: 'from-yellow-500/20 to-amber-500/20',
  },
]

export function FeaturesSection() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="features" className="py-24 relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-6 mb-6 text-balance">
            Premium AI Capabilities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-pretty">
            Everything you need to harness the power of artificial intelligence, 
            wrapped in an elegant experience. <span className="text-primary">Click any card to explore.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              onClick={() => setActiveModal(feature.modalType)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative bg-card/50 border-border/50 transition-all duration-500 cursor-pointer group overflow-hidden
                ${hoveredCard === index ? 'border-primary/70 shadow-xl shadow-primary/20 scale-105 z-10' : 'hover:border-primary/30'}
              `}
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: hoveredCard !== null && hoveredCard !== index ? 'scale(0.98)' : undefined,
              }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 shimmer-gold" />
              </div>

              <CardContent className="p-6 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 glow-gold">
                  <feature.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Click indicator */}
                <div className="mt-4 flex items-center gap-2 text-xs text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </span>
                  Click to explore
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      <MultiModelChatModal 
        open={activeModal === 'multi-model'} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <LightningFastModal 
        open={activeModal === 'lightning'} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <SecurityAuthModal 
        open={activeModal === 'security'} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <GlobalNetworkModal 
        open={activeModal === 'network'} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <NaturalConversationsModal 
        open={activeModal === 'conversations'} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <DeveloperAPIModal 
        open={activeModal === 'api'} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <AnalyticsDashboardModal 
        open={activeModal === 'analytics'} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <CustomAgentsModal 
        open={activeModal === 'agents'} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
    </section>
  )
}
