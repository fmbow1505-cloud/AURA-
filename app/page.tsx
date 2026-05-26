'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';

type Agent = 'openai' | 'google' | 'anthropic';

const agentConfig = {
  openai:    { label: 'GPT-4',   color: '#10a37f', bg: '#0d1117' },
  google:    { label: 'Gemini',  color: '#4285f4', bg: '#0d1117' },
  anthropic: { label: 'Claude',  color: '#d97757', bg: '#0d1117' },
};

export default function Home() {
  const [agent, setAgent] = useState<Agent>('openai');
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `/api/chat/${agent}`,
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeColor = agentConfig[agent].color;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh',
      background: '#0d1117',
      color: '#e6edf3',
      fontFamily: 'system-ui, sans-serif',
    }}>

      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #21262d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#161b22',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#e6edf3' }}>
            ✦ AURA
          </h1>
          <p style={{ margin: 0, fontSize: 12, color: '#8b949e' }}>Multi-Agent AI</p>
        </div>

        {/* Agent selector */}
        <div style={{ display: 'flex', gap: 6 }}>
          {(Object.keys(agentConfig) as Agent[]).map((a) => (
            <button
              key={a}
              onClick={() => setAgent(a)}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                border: `1px solid ${agent === a ? agentConfig[a].color : '#30363d'}`,
                background: agent === a ? agentConfig[a].color + '22' : 'transparent',
                color: agent === a ? agentConfig[a].color : '#8b949e',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {agentConfig[a].label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        {messages.length === 0 && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8b949e',
            textAlign: 'center',
            paddingTop: 60,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
            <p style={{ fontSize: 18, fontWeight: 600, color: '#e6edf3', margin: '0 0 8px' }}>
              Bonjour, je suis AURA
            </p>
            <p style={{ fontSize: 14, margin: 0 }}>
              Sélectionne un agent et envoie ton premier message
            </p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{
              maxWidth: '75%',
              padding: '10px 14px',
              borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.role === 'user' ? activeColor : '#161b22',
              border: m.role === 'user' ? 'none' : '1px solid #21262d',
              color: '#e6edf3',
              fontSize: 14,
              lineHeight: 1.6,
            }}>
              {m.role === 'assistant' && (
                <p style={{ margin: '0 0 4px', fontSize: 11, color: activeColor, fontWeight: 600 }}>
                  {agentConfig[agent].label}
                </p>
              )}
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '10px 16px',
              borderRadius: '18px 18px 18px 4px',
              background: '#161b22',
              border: '1px solid #21262d',
              color: '#8b949e',
              fontSize: 14,
            }}>
              ···
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid #21262d',
        background: '#161b22',
      }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', gap: 8, alignItems: 'center' }}
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder={`Message ${agentConfig[agent].label}...`}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 24,
              border: '1px solid #30363d',
              background: '#0d1117',
              color: '#e6edf3',
              fontSize: 14,
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{
              padding: '10px 18px',
              borderRadius: 24,
              border: 'none',
              background: activeColor,
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              opacity: isLoading || !input.trim() ? 0.5 : 1,
            }}
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
          }
