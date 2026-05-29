import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getProductById } from '@/lib/products'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, productId, transactionId, currency, amount } = body

    if (!name || !email || !phone || !productId || !transactionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Store payment intent
    const { error: dbError } = await supabase.from('payment_intents').insert({
      transaction_id: transactionId,
      plan_id: productId,
      amount_cents: amount * 100,
      currency,
      status: 'pending',
      payment_method: 'manual',
      user_id: user?.id || null,
      metadata: {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        product_name: product.name,
      },
    })

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue to send notification even if DB fails
    }

    // Send email notification if Resend is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        await resend.emails.send({
          from: 'AURA Payments <onboarding@resend.dev>',
          to: 'Fmbow1505@gmail.com',
          subject: `[AURA] New Payment Request - ${product.name}`,
          html: `
            <h2>New Payment Request</h2>
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
            <p><strong>Product:</strong> AURA ${product.name}</p>
            <p><strong>Amount:</strong> ${amount.toLocaleString()} ${currency}</p>
            <hr>
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          `,
        })
      } catch (emailError) {
        console.error('Email error:', emailError)
      }
    }

    return NextResponse.json({ success: true, transactionId })
  } catch (error) {
    console.error('Capture payment error:', error)
    return NextResponse.json(
      { error: 'Failed to capture payment intent' },
      { status: 500 }
    )
  }
}
