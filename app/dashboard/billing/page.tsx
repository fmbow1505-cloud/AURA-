import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreditCard, Package, ArrowUpRight, Sparkles } from 'lucide-react'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch user's payment history
  const { data: payments } = await supabase
    .from('payment_intents')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Plan */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Current Plan
            </CardTitle>
            <CardDescription>Your active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">Free Tier</span>
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Limited to 1,000 tokens per month
              </p>
            </div>
            <Link href="/#pricing">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Payment Method
            </CardTitle>
            <CardDescription>Manage your payment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border text-center">
              <p className="text-muted-foreground mb-4">
                No payment method on file
              </p>
              <Link href="/#pricing">
                <Button variant="outline" className="border-border">
                  Add Payment Method
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Payment History</CardTitle>
          <CardDescription>Your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {payments && payments.length > 0 ? (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      AURA {payment.plan_id?.replace('aura-', '').replace(/^\w/, (c: string) => c.toUpperCase())}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      {(payment.amount_cents / 100).toLocaleString()} {payment.currency}
                    </p>
                    <p className={`text-sm ${
                      payment.status === 'completed' ? 'text-green-500' : 
                      payment.status === 'pending' ? 'text-yellow-500' : 'text-muted-foreground'
                    }`}>
                      {payment.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payment history yet</p>
              <Link href="/#pricing">
                <Button variant="link" className="text-primary mt-2">
                  View pricing plans <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
