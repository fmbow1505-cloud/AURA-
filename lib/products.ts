export interface Product {
  id: string
  name: string
  description: string
  priceInEur: number
  features: string[]
  popular?: boolean
  tier: 'starter' | 'pro' | 'business' | 'empire'
}

export const PRODUCTS: Product[] = [
  {
    id: 'aura-starter',
    name: 'Starter',
    description: 'Perfect for individuals exploring AI capabilities',
    priceInEur: 50,
    tier: 'starter',
    features: [
      '25,000 AI tokens/month',
      'GPT-4 & Claude access',
      'Premium chat interface',
      'Email support',
      '10 conversation history',
      'Basic analytics',
    ],
  },
  {
    id: 'aura-pro',
    name: 'Pro',
    description: 'For professionals who demand excellence',
    priceInEur: 150,
    tier: 'pro',
    popular: true,
    features: [
      '150,000 AI tokens/month',
      'GPT-4, Claude & Gemini access',
      'Priority processing',
      'Unlimited conversation history',
      'Full API access',
      'Priority support 24/7',
      'Custom agents (3)',
      'Advanced analytics',
    ],
  },
  {
    id: 'aura-business',
    name: 'Business',
    description: 'For teams building the future',
    priceInEur: 250,
    tier: 'business',
    features: [
      '500,000 AI tokens/month',
      'All AI models access',
      'Team collaboration (5 seats)',
      'Custom model fine-tuning',
      'Webhook integrations',
      'Dedicated support channel',
      'Custom agents (10)',
      'Real-time analytics dashboard',
      'SLA guarantee 99.5%',
    ],
  },
  {
    id: 'aura-empire',
    name: 'Empire',
    description: 'Unlimited power for visionaries',
    priceInEur: 300,
    tier: 'empire',
    features: [
      'Unlimited AI tokens',
      'All AI models + Early access',
      'Unlimited team seats',
      'White-label solution',
      'Custom model training',
      'On-premise deployment option',
      'Dedicated account manager',
      'Unlimited custom agents',
      'Enterprise analytics suite',
      'SLA guarantee 99.9%',
    ],
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}
