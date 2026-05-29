'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  MessageSquare, 
  Settings, 
  CreditCard, 
  LogOut,
  Home,
  User as UserIcon
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface DashboardSidebarProps {
  user: User
}

const navItems = [
  { href: '/dashboard', icon: MessageSquare, label: 'AI Chat' },
  { href: '/dashboard/profile', icon: UserIcon, label: 'Profile' },
  { href: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center glow-gold">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-serif text-xl font-bold text-primary">AURA</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href="/" className="flex-1">
            <Button variant="outline" size="sm" className="w-full border-border">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSignOut}
            className="border-border text-destructive hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
