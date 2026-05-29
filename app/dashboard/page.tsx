'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { AGENTS, type Agent } from '@/lib/agents'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, Loader2, Sparkles, User, Bot, RefreshCw } from 'lucide-react'

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ''
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text' && typeof p.text === 'string')
    .map((p) => p.text)
    .join('')
}

export default function DashboardPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(AGENTS[0])
  const [input, setInput] = useState('')

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: { agentId: selectedAgent.id },
    }),
  })

  const isStreaming = status === 'streaming' || status === 'submitted'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isStreaming) return

    const userMessage = input.trim()
    setInput('')
    await sendMessage({ text: userMessage })
  }

  function handleAgentChange(agentId: string) {
    const agent = AGENTS.find(a => a.id === agentId)
    if (agent) {
      setSelectedAgent(agent)
      setMessages([])
    }
  }

  function handleNewChat() {
    setMessages([])
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b border-border bg-card/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select value={selectedAgent.id} onValueChange={handleAgentChange}>
              <SelectTrigger className="w-[220px] bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {AGENTS.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    <span className="flex items-center gap-2">
                      <span>{agent.avatar}</span>
                      <span>{agent.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground hidden md:block">
              {selectedAgent.description}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            className="border-border"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 glow-gold">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              Welcome to AURA
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Start a conversation with {selectedAgent.name}. Ask anything - 
              from creative writing to complex analysis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
              {[
                'Explain quantum computing simply',
                'Write a business proposal',
                'Debug my Python code',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="p-4 bg-secondary/50 border border-border rounded-lg text-left hover:border-primary/50 transition-colors"
                >
                  <p className="text-sm text-foreground">{suggestion}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${selectedAgent.color}20` }}
                >
                  <Bot className="w-5 h-5" style={{ color: selectedAgent.color }} />
                </div>
              )}
              <Card
                className={`max-w-[70%] p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border-border'
                }`}
              >
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap m-0">{getMessageText(message)}</p>
                </div>
              </Card>
              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-foreground" />
                </div>
              )}
            </div>
          ))
        )}
        {isStreaming && messages.length > 0 && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex gap-4 justify-start">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${selectedAgent.color}20` }}
            >
              <Bot className="w-5 h-5 animate-pulse" style={{ color: selectedAgent.color }} />
            </div>
            <Card className="bg-card border-border p-4">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </Card>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 p-4">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${selectedAgent.name}...`}
            className="flex-1 bg-secondary border-border resize-none min-h-[60px] max-h-[200px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="bg-primary text-primary-foreground hover:bg-primary/90 self-end"
          >
            {isStreaming ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-2">
          AURA can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  )
}
