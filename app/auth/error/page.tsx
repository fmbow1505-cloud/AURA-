import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowLeft } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/5 via-background to-background" />
      
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-border/50 relative z-10 text-center">
        <CardHeader>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-serif">Authentication Error</CardTitle>
          <CardDescription className="text-base">
            Something went wrong during authentication
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            The authentication process could not be completed. This might happen if 
            the link expired or was already used.
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/auth/login">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Try Again
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full border-border">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
