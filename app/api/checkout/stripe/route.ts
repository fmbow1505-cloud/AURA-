import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getProductById } from '@/lib/products'
import { createClient } from '@/lib/supabase/server'

// Exchange rates for currency conversion
const exchangeRates: Record<string, number> = {
  EUR: 1,
  USD: 1.08,
  FCFA: 655.96,
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, transactionId, currency = 'EUR' } = body

    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Get current user if logged in
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Calculate price in the requested currency (in cents)
    const rate = exchangeRates[currency] || 1
    const amountInCurrency = Math.round(product.priceInEur * rate)
    
    // Stripe uses smallest currency unit (cents for USD/EUR, CFA for XOF)
    const stripeCurrency = currency === 'FCFA' ? 'xof' : currency.toLowerCase()
    const unitAmount = currency === 'FCFA' ? amountInCurrency : amountInCurrency * 100

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: stripeCurrency,
            product_data: {
              name: `AURA ${product.name}`,
              description: product.description,
            },
            unit_amount: unitAmount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}&transaction_id=${transactionId}`,
      cancel_url: `${request.headers.get('origin')}/checkout/${productId}?currency=${currency}`,
      metadata: {
        productId,
        transactionId,
        userId: user?.id || 'anonymous',
      },
      customer_email: user?.email || undefined,
    })

    // Store payment intent in database
    await supabase.from('payment_intents').insert({
      transaction_id: transactionId,
      plan_id: productId,
      amount_cents: unitAmount,
      currency,
      status: 'pending',
      payment_method: 'stripe',
      stripe_session_id: session.id,
      user_id: user?.id || null,
      metadata: { session_url: session.url },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    )
  }
}
