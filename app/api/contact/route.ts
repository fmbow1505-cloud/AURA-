import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store in database
    const supabase = await createClient()
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
      })

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue anyway to send email notification
    }

    // Send email notification using Resend (if configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        await resend.emails.send({
          from: 'AURA Contact <onboarding@resend.dev>',
          to: 'Fmbow1505@gmail.com',
          subject: `[AURA Contact] ${subject || 'New Message'} from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        })
      } catch (emailError) {
        console.error('Email error:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
