import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { User, Mail, Calendar, Shield } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const createdAt = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Full Name</label>
              <p className="text-foreground font-medium">
                {user.user_metadata?.full_name || user.user_metadata?.name || 'Not set'}
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="text-foreground font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                {user.email}
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Member Since</label>
              <p className="text-foreground font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {createdAt}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Account Status
            </CardTitle>
            <CardDescription>Your subscription and security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Email Verified</label>
              <p className={`font-medium ${user.email_confirmed_at ? 'text-green-500' : 'text-yellow-500'}`}>
                {user.email_confirmed_at ? 'Verified' : 'Pending verification'}
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Auth Provider</label>
              <p className="text-foreground font-medium capitalize">
                {user.app_metadata?.provider || 'Email'}
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">User ID</label>
              <p className="text-muted-foreground font-mono text-xs truncate">
                {user.id}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
