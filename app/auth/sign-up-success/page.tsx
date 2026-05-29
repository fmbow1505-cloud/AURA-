import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Mail, ArrowLeft } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-border/50 relative z-10 text-center">
        <CardHeader>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center glow-gold">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-serif">Check Your Email</CardTitle>
          <CardDescription className="text-base">
            We&apos;ve sent you a confirmation link
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Please check your email inbox and click the confirmation link 
            to activate your AURA account. The link will expire in 24 hours.
          </p>

          <div className="p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Tip: Check your spam folder if you don&apos;t see the email</span>
            </div>
          </div>

          <Link href="/auth/login">
            <Button variant="outline" className="w-full border-border">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
