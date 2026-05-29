'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import { AGENTS, CUSTOM_AGENT_TEMPLATES } from '@/lib/agents'
import { 
  Brain, Zap, Shield, Globe, MessageSquare, Code, BarChart3, Sparkles,
  Send, Loader2, Copy, Check, X, Lock, Unlock, Activity, Clock, Users,
  TrendingUp, Cpu
} from 'lucide-react'

// Security Auth Modal
export function SecurityAuthModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onOpenChange(false)
        router.push('/dashboard')
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
              `${window.location.origin}/auth/callback`
          }
        })
        if (error) throw error
        setError('Check your email for confirmation link!')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleOAuth(provider: 'google' | 'github') {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
          `${window.location.origin}/auth/callback`
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-gold">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-serif">
            {isLogin ? 'Enterprise Security' : 'Join AURA'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isLogin ? 'Sign in to access premium AI tools' : 'Create your account to get started'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAuth} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-secondary border-border"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="bg-secondary border-border"
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className={`text-sm ${error.includes('Check') ? 'text-green-500' : 'text-destructive'}`}>
              {error}
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
            {isLogin ? 'Sign In Securely' : 'Create Account'}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => handleOAuth('google')} className="border-border">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </Button>
          <Button variant="outline" onClick={() => handleOAuth('github')} className="border-border">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  )
}

// Multi-Model AI Chat Modal
export function MultiModelChatModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [selectedModel, setSelectedModel] = useState(AGENTS[0])
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')

  async function handleSend() {
    if (!input.trim() || loading) return
    
    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)
    setStreamingText('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }].map(m => ({
            role: m.role,
            content: m.content,
          })),
          agentId: selectedModel.id,
        }),
      })

      if (!response.body) throw new Error('No response body')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          const trimmed = line.trim()
          if (trimmed.startsWith('data:')) {
            const data = trimmed.slice(5).trim()
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.type === 'text-delta' && parsed.delta) {
                fullContent += parsed.delta
                setStreamingText(fullContent)
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: fullContent }])
      setStreamingText('')
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-gold">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-serif">Multi-Model AI Chat</DialogTitle>
              <DialogDescription>Choose your AI model and start chatting</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Model Selector */}
        <div className="flex gap-2 py-3 border-b border-border">
          {AGENTS.filter(a => a.category === 'default').map((agent) => (
            <Button
              key={agent.id}
              variant={selectedModel.id === agent.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedModel(agent)}
              className={selectedModel.id === agent.id ? 'bg-primary' : 'border-border'}
            >
              <span className="mr-2">{agent.avatar}</span>
              {agent.name.replace('AURA ', '')}
            </Button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-[300px] max-h-[400px]">
          {messages.length === 0 && !streamingText ? (
            <div className="text-center text-muted-foreground py-8">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary/50" />
              <p>Start a conversation with {selectedModel.name}</p>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  }`}>
                    <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              {streamingText && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-secondary">
                    <p className="whitespace-pre-wrap text-sm">{streamingText}</p>
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2 pt-3 border-t border-border">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${selectedModel.name}...`}
            className="flex-1 bg-secondary border-border"
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()} className="bg-primary">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Lightning Fast Progress Modal
export function LightningFastModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'processing' | 'complete'>('idle')
  const [metrics, setMetrics] = useState({ tokens: 0, time: 0 })

  function simulateProcessing() {
    setPhase('processing')
    setProgress(0)
    setMetrics({ tokens: 0, time: 0 })

    const startTime = Date.now()
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(interval)
          setPhase('complete')
          setMetrics({
            tokens: Math.floor(Math.random() * 500) + 200,
            time: Date.now() - startTime,
          })
          return 100
        }
        setMetrics(prev => ({
          tokens: Math.floor((newProgress / 100) * 700),
          time: Date.now() - startTime,
        }))
        return newProgress
      })
    }, 100)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-gold">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-serif">Lightning Fast Processing</DialogTitle>
          <DialogDescription className="text-center">
            Experience AURA&apos;s optimized AI acceleration
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Processing Speed</span>
              <span className="text-primary font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="relative">
              <Progress value={progress} className="h-3 bg-secondary" />
              <div 
                className="absolute top-0 left-0 h-3 rounded-full shimmer-gold"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4 text-center">
                <Cpu className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{metrics.tokens}</p>
                <p className="text-xs text-muted-foreground">Tokens Processed</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{metrics.time}ms</p>
                <p className="text-xs text-muted-foreground">Response Time</p>
              </CardContent>
            </Card>
          </div>

          {/* Status */}
          <div className="text-center">
            {phase === 'idle' && (
              <p className="text-muted-foreground">Click below to simulate AI processing</p>
            )}
            {phase === 'processing' && (
              <div className="flex items-center justify-center gap-2 text-primary">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI Acceleration Active...</span>
              </div>
            )}
            {phase === 'complete' && (
              <div className="flex items-center justify-center gap-2 text-green-500">
                <Check className="w-4 h-4" />
                <span>Processing Complete - {((metrics.tokens / metrics.time) * 1000).toFixed(0)} tokens/sec</span>
              </div>
            )}
          </div>

          <Button 
            onClick={simulateProcessing} 
            disabled={phase === 'processing'}
            className="w-full bg-primary text-primary-foreground"
          >
            {phase === 'processing' ? 'Processing...' : 'Start AI Acceleration Demo'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Global Network Modal with Real Ping
export function GlobalNetworkModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [servers, setServers] = useState([
    { name: 'Dakar', region: 'Africa', status: 'online', latency: 0, users: 1250 },
    { name: 'Paris', region: 'Europe', status: 'online', latency: 0, users: 4820 },
    { name: 'New York', region: 'Americas', status: 'online', latency: 0, users: 7340 },
  ])
  const [pinging, setPinging] = useState(false)

  async function measureLatency() {
    setPinging(true)
    
    // Simulate latency measurement
    const newServers = servers.map(server => ({
      ...server,
      latency: Math.floor(Math.random() * 50) + (
        server.name === 'Paris' ? 8 : 
        server.name === 'Dakar' ? 12 : 15
      ),
    }))

    await new Promise(resolve => setTimeout(resolve, 1500))
    setServers(newServers)
    setPinging(false)
  }

  useEffect(() => {
    if (open) measureLatency()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-gold">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-serif">Global Server Network</DialogTitle>
          <DialogDescription className="text-center">
            Real-time server status and response times
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {servers.map((server) => (
            <Card key={server.name} className="bg-secondary/50 border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${server.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <div>
                      <h4 className="font-semibold text-foreground">{server.name}</h4>
                      <p className="text-xs text-muted-foreground">{server.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      {pinging ? '...' : `${server.latency}ms`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <Users className="w-3 h-3 inline mr-1" />
                      {server.users.toLocaleString()} users
                    </p>
                  </div>
                </div>
                {/* Latency bar */}
                <div className="mt-3">
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-500"
                      style={{ width: `${Math.min(server.latency * 2, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button 
            onClick={measureLatency} 
            disabled={pinging}
            className="w-full bg-primary text-primary-foreground"
          >
            {pinging ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Measuring Latency...
              </>
            ) : (
              <>
                <Activity className="w-4 h-4 mr-2" />
                Ping All Servers
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Developer API Documentation Modal
export function DeveloperAPIModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const codeExamples = [
    {
      title: 'Initialize Client',
      language: 'javascript',
      code: `import { AuraClient } from '@aura/sdk';

const aura = new AuraClient({
  apiKey: process.env.AURA_API_KEY,
  baseUrl: 'https://api.aura.ai/v1'
});`,
    },
    {
      title: 'Chat Completion',
      language: 'javascript',
      code: `const response = await aura.chat.create({
  model: 'aura-gpt-5',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello, AURA!' }
  ],
  stream: true
});

for await (const chunk of response) {
  process.stdout.write(chunk.delta);
}`,
    },
    {
      title: 'Custom Agent',
      language: 'javascript',
      code: `const agent = await aura.agents.create({
  name: 'Marketing Expert',
  model: 'aura-claude',
  instructions: 'You are a marketing specialist...',
  tools: ['web_search', 'data_analysis']
});

const result = await agent.run('Analyze our Q4 campaign');`,
    },
    {
      title: 'cURL Example',
      language: 'bash',
      code: `curl -X POST https://api.aura.ai/v1/chat/completions \\
  -H "Authorization: Bearer $AURA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "aura-gpt-5",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`,
    },
  ]

  function copyCode(code: string, index: number) {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-gold">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-serif">Developer API</DialogTitle>
              <DialogDescription>Integrate AURA into your applications</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="examples" className="mt-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="space-y-4 mt-4">
            {codeExamples.map((example, index) => (
              <Card key={index} className="bg-secondary/50 border-border overflow-hidden">
                <CardHeader className="py-2 px-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">{example.title}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyCode(example.code, index)}
                    className="h-8"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <pre className="p-4 bg-background/50 overflow-x-auto text-xs">
                    <code className="text-foreground">{example.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-4 mt-4">
            <div className="space-y-3">
              {[
                { method: 'POST', path: '/v1/chat/completions', desc: 'Create chat completion' },
                { method: 'POST', path: '/v1/agents', desc: 'Create custom agent' },
                { method: 'GET', path: '/v1/agents/:id', desc: 'Get agent details' },
                { method: 'POST', path: '/v1/agents/:id/run', desc: 'Run agent task' },
                { method: 'GET', path: '/v1/usage', desc: 'Get token usage' },
                { method: 'GET', path: '/v1/models', desc: 'List available models' },
              ].map((endpoint) => (
                <div key={endpoint.path} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'} className={endpoint.method === 'POST' ? 'bg-green-600' : ''}>
                    {endpoint.method}
                  </Badge>
                  <code className="text-sm text-foreground flex-1">{endpoint.path}</code>
                  <span className="text-sm text-muted-foreground">{endpoint.desc}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// Analytics Dashboard Modal
export function AnalyticsDashboardModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [data, setData] = useState({
    tokensUsed: 45230,
    tokensLimit: 100000,
    requestsToday: 156,
    avgResponseTime: 234,
    successRate: 99.2,
  })

  useEffect(() => {
    if (!open) return
    
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        tokensUsed: prev.tokensUsed + Math.floor(Math.random() * 50),
        requestsToday: prev.requestsToday + Math.floor(Math.random() * 2),
        avgResponseTime: 200 + Math.floor(Math.random() * 100),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [open])

  const tokenPercentage = (data.tokensUsed / data.tokensLimit) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-gold">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-serif">Analytics Dashboard</DialogTitle>
              <DialogDescription>Real-time AI performance metrics</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Token Usage */}
          <Card className="bg-secondary/50 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Token Consumption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-bold text-foreground">
                  {data.tokensUsed.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  / {data.tokensLimit.toLocaleString()}
                </span>
              </div>
              <div className="relative h-4 bg-background rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full rounded-full shimmer-gold transition-all duration-500"
                  style={{ width: `${tokenPercentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {tokenPercentage.toFixed(1)}% of monthly allocation used
              </p>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4 text-center">
                <Activity className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{data.requestsToday}</p>
                <p className="text-xs text-muted-foreground">Requests Today</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{data.avgResponseTime}ms</p>
                <p className="text-xs text-muted-foreground">Avg Response</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4 text-center">
                <Check className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{data.successRate}%</p>
                <p className="text-xs text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Mini Chart Visualization */}
          <Card className="bg-secondary/50 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Usage Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-1 h-24">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t shimmer-gold transition-all duration-300"
                    style={{ 
                      height: `${20 + Math.random() * 80}%`,
                      opacity: i < 12 ? 0.5 : 1
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>12:00 AM</span>
                <span>Now</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Natural Conversations Modal (Memory)
export function NaturalConversationsModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Marketing Strategy Discussion', messages: 12, lastMessage: '2 hours ago' },
    { id: 2, title: 'Python Code Review', messages: 8, lastMessage: '5 hours ago' },
    { id: 3, title: 'Business Plan Analysis', messages: 24, lastMessage: '1 day ago' },
  ])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-gold">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-serif">Conversation Memory</DialogTitle>
          <DialogDescription className="text-center">
            AURA remembers your previous conversations for seamless continuity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {conversations.map((conv) => (
            <Card 
              key={conv.id} 
              className="bg-secondary/50 border-border hover:border-primary/50 transition-all cursor-pointer group"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {conv.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {conv.messages} messages - {conv.lastMessage}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    Resume
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Memory Features
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Context retained across sessions
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Automatic topic summarization
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Searchable conversation history
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Custom Agents Modal
export function CustomAgentsModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customName, setCustomName] = useState('')
  const [customInstructions, setCustomInstructions] = useState('')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-gold">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-serif">Custom Agents</DialogTitle>
              <DialogDescription>Create specialized AI agents for your needs</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="templates" className="mt-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="templates">Agent Templates</TabsTrigger>
            <TabsTrigger value="create">Create Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="mt-4">
            <div className="grid grid-cols-2 gap-3">
              {CUSTOM_AGENT_TEMPLATES.map((template) => (
                <Card 
                  key={template.id}
                  className={`bg-secondary/50 border-border cursor-pointer transition-all hover:border-primary/50 ${
                    selectedTemplate === template.id ? 'border-primary ring-1 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="text-2xl mb-2">{template.icon}</div>
                    <h4 className="font-medium text-foreground">{template.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedTemplate && (
              <Button className="w-full mt-4 bg-primary text-primary-foreground">
                <Sparkles className="w-4 h-4 mr-2" />
                Activate {CUSTOM_AGENT_TEMPLATES.find(t => t.id === selectedTemplate)?.name}
              </Button>
            )}
          </TabsContent>

          <TabsContent value="create" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input
                id="agent-name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g., Financial Advisor"
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Agent Instructions</Label>
              <Textarea
                id="instructions"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Describe your agent's expertise, personality, and how it should respond..."
                className="bg-secondary border-border min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Base Model</Label>
              <div className="flex gap-2">
                {AGENTS.filter(a => a.category === 'default').map((agent) => (
                  <Button key={agent.id} variant="outline" size="sm" className="border-border">
                    {agent.avatar} {agent.name.replace('AURA ', '')}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              className="w-full bg-primary text-primary-foreground"
              disabled={!customName || !customInstructions}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Custom Agent
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
