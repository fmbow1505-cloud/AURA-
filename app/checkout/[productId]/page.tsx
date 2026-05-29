'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getProductById, type Product } from '@/lib/products'
import { useCurrency, type Currency } from '@/lib/currency-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'
import { toast } from 'sonner'
import { Sparkles, ArrowLeft, Check, Loader2, CreditCard, Smartphone } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

function generateTransactionId() {
  return `AURA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

interface CheckoutPageProps {
  params: Promise<{ productId: string }>
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { productId } = use(params)
  const searchParams = useSearchParams()
  const { formatPrice, currency, setCurrency, convertPrice } = useCurrency()
  const [product, setProduct] = useState<Product | null>(null)
  const [transactionId] = useState(generateTransactionId)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'mobile' | 'capture'>('stripe')
  const [captureForm, setCaptureForm] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    const prod = getProductById(productId)
    setProduct(prod || null)
    
    // Set currency from URL if provided
    const urlCurrency = searchParams.get('currency') as Currency
    if (urlCurrency && ['EUR', 'USD', 'FCFA'].includes(urlCurrency)) {
      setCurrency(urlCurrency)
    }
  }, [productId, searchParams, setCurrency])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md bg-card/80 border-border/50 p-8 text-center">
          <h1 className="text-xl font-semibold text-foreground mb-4">Product Not Found</h1>
          <Link href="/#pricing">
            <Button className="bg-primary text-primary-foreground">View Plans</Button>
          </Link>
        </Card>
      </div>
    )
  }

  async function handleStripeCheckout() {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product!.id,
          transactionId,
          currency,
        }),
      })

      const { sessionId, error } = await response.json()
      if (error) throw new Error(error)

      const stripe = await stripePromise
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      toast.error('Checkout failed', {
        description: error instanceof Error ? error.message : 'Please try again',
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleMobilePayment() {
    const amount = convertPrice(product!.priceInEur)
    const message = encodeURIComponent(
      `Paiement AURA ${product!.name}\nMontant: ${amount} FCFA\nTransaction: ${transactionId}`
    )
    
    // Wave payment link
    window.open(`https://pay.wave.com/m/M_JKLhdmZ3hejxK/c/sn/?amount=${amount}`, '_blank')
    
    toast.info('Mobile Payment Initiated', {
      description: `Please complete the payment of ${formatPrice(product!.priceInEur)} to +221 78 182 57 37`,
    })
  }

  async function handleCapturePayment(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/checkout/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...captureForm,
          productId: product!.id,
          transactionId,
          currency,
          amount: convertPrice(product!.priceInEur),
        }),
      })

      if (!response.ok) throw new Error('Failed to capture payment intent')

      toast.success('Payment Intent Captured!', {
        description: 'Our team will contact you shortly to complete the payment.',
      })
    } catch (error) {
      toast.error('Capture failed', {
        description: error instanceof Error ? error.message : 'Please try again',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <Link href="/#pricing" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to pricing
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Order Summary */}
          <Card className="bg-card/80 backdrop-blur-xl border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-gold">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-serif">Order Summary</CardTitle>
                  <p className="text-sm text-muted-foreground">Transaction: {transactionId}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  AURA {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(product.priceInEur)}
                    <span className="text-sm text-muted-foreground font-normal">/month</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="bg-card/80 backdrop-blur-xl border-border/50">
            <CardHeader>
              <CardTitle className="font-serif">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-3 rounded-lg border transition-all ${
                    paymentMethod === 'stripe'
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-secondary hover:border-primary/50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <span className="text-xs text-foreground">Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('mobile')}
                  className={`p-3 rounded-lg border transition-all ${
                    paymentMethod === 'mobile'
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-secondary hover:border-primary/50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <span className="text-xs text-foreground">Mobile</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('capture')}
                  className={`p-3 rounded-lg border transition-all ${
                    paymentMethod === 'capture'
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-secondary hover:border-primary/50'
                  }`}
                >
                  <Sparkles className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <span className="text-xs text-foreground">Manual</span>
                </button>
              </div>

              {/* Stripe Payment */}
              {paymentMethod === 'stripe' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Secure payment via Stripe. Accepts all major credit cards.
                  </p>
                  <Button
                    onClick={handleStripeCheckout}
                    disabled={isLoading || !stripePromise}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : stripePromise ? (
                      <>
                        <CreditCard className="mr-2 w-4 h-4" />
                        Pay {formatPrice(product.priceInEur)}
                      </>
                    ) : (
                      'Stripe not configured'
                    )}
                  </Button>
                </div>
              )}

              {/* Mobile Payment (Wave/Orange Money) */}
              {paymentMethod === 'mobile' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Pay via Wave or Orange Money. Amount will be pre-filled.
                  </p>
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <p className="text-sm text-foreground mb-2">
                      <strong>Amount:</strong> {convertPrice(product.priceInEur).toLocaleString()} FCFA
                    </p>
                    <p className="text-sm text-foreground">
                      <strong>Phone:</strong> +221 78 182 57 37
                    </p>
                  </div>
                  <Button
                    onClick={handleMobilePayment}
                    className="w-full bg-[#00CED1] text-white hover:bg-[#00CED1]/90"
                  >
                    <Smartphone className="mr-2 w-4 h-4" />
                    Pay with Wave / Orange Money
                  </Button>
                </div>
              )}

              {/* Payment Intent Capture Form */}
              {paymentMethod === 'capture' && (
                <form onSubmit={handleCapturePayment} className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Submit your details and we&apos;ll contact you to complete the payment.
                  </p>
                  <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      id="name"
                      value={captureForm.name}
                      onChange={(e) => setCaptureForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="bg-secondary border-border"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      value={captureForm.email}
                      onChange={(e) => setCaptureForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="bg-secondary border-border"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      value={captureForm.phone}
                      onChange={(e) => setCaptureForm(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className="bg-secondary border-border"
                    />
                  </Field>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Payment Request'
                    )}
                  </Button>
                </form>
              )}

              <p className="text-xs text-center text-muted-foreground">
                By completing this purchase, you agree to our Terms of Service.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
