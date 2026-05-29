'use client'

import { useState } from 'react'
import { useCurrency, type Currency } from '@/lib/currency-context'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Settings, Globe, Bell, Shield, Loader2 } from 'lucide-react'

export default function SettingsPage() {
  const { currency, setCurrency } = useCurrency()
  const [notifications, setNotifications] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave() {
    setIsSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 500))
    toast.success('Settings saved successfully')
    setIsSaving(false)
  }

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Customize your AURA experience</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-2xl">
        {/* Preferences */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Preferences
            </CardTitle>
            <CardDescription>Regional and display settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Currency</p>
                <p className="text-sm text-muted-foreground">
                  Display prices in your preferred currency
                </p>
              </div>
              <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
                <SelectTrigger className="w-[140px] bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  <SelectItem value="USD">USD (Dollar)</SelectItem>
                  <SelectItem value="FCFA">FCFA (CFA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates about your account
                </p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                <div 
                  className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription>Protect your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Button variant="outline" size="sm" className="border-border" disabled>
                Coming Soon
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Settings className="mr-2 w-4 h-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
