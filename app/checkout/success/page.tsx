import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react'

interface SuccessPageProps {
  searchParams: Promise<{ transaction_id?: string; session_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams
  const transactionId = params.transaction_id || 'N/A'

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-border/50 relative z-10 text-center">
        <CardHeader>
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center glow-gold animate-pulse">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-serif">Payment Successful!</CardTitle>
          <CardDescription className="text-base">
            Welcome to AURA Premium
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Your subscription is now active. You have full access to all AURA features.
          </p>

          <div className="p-4 bg-secondary/50 rounded-lg border border-border text-left">
            <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
            <p className="text-foreground font-mono text-sm">{transactionId}</p>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>A confirmation email has been sent to your inbox</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/dashboard">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Go to Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full border-border">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
