'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Provider = 'openai' | 'google' | 'anthropic';

const MODELS: Record<Provider, { id: string; label: string }[]> = {
  openai: [
    { id: 'gpt-4o', label: 'GPT-4o' },
    { id: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { id: 'gpt-4o-mini', label: 'GPT-4o Mini' },
    { id: 'gpt-4', label: 'GPT-4' },
    { id: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { id: 'gpt-4o-coder', label: 'GPT-4o Coder' },
    { id: 'gpt-4-vision', label: 'GPT-4 Vision' },
    { id: 'gpt-4o-128k', label: 'GPT-4o 128K' },
    { id: 'gpt-3.5-turbo-16k', label: 'GPT-3.5 16K' },
    { id: 'gpt-4-32k', label: 'GPT-4 32K' },
  ],
  google: [
    { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
    { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
    { id: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro' },
    { id: 'gemini-1.5-pro-vision', label: 'Gemini Vision' },
    { id: 'gemini-1.5-flash-8b', label: 'Gemini Flash 8B' },
    { id: 'gemini-ultra', label: 'Gemini Ultra' },
    { id: 'gemini-nano', label: 'Gemini Nano' },
    { id: 'gemini-1.5-pro-exp', label: 'Gemini Pro Exp' },
    { id: 'gemini-flash-thinking', label: 'Flash Thinking' },
    { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
  ],
  anthropic: [
    { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
    { id: 'claude-3-5-haiku', label: 'Claude 3.5 Haiku' },
    { id: 'claude-3-opus', label: 'Claude 3 Opus' },
    { id: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
    { id: 'claude-3-haiku', label: 'Claude 3 Haiku' },
    { id: 'claude-2-1', label: 'Claude 2.1' },
    { id: 'claude-2-0', label: 'Claude 2.0' },
    { id: 'claude-instant', label: 'Claude Instant' },
    { id: 'claude-3-opus-vision', label: 'Claude Vision' },
    { id: 'claude-3-5-sonnet-200k', label: 'Claude 200K' },
  ],
};

const PROVIDER_COLORS: Record<Provider, string> = {
  openai: '#10a37f',
  google: '#4285f4',
  anthropic: '#d97757',
};

export default function ChatPage() {
  const router = useRouter();
  const [provider, setProvider] = useState<Provider>('openai');
  const [modelId, setModelId] = useState('gpt-4o');
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { modelId },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleProviderChange = (p: Provider) => {
    setProvider(p);
    setModelId(MODELS[p][0].id);
  };

  const gold = '#D4AF37';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100dvh', background: '#0B0F19',
      color: '#fff', fontFamily: 'system-ui, sans-serif',
    }}>

      {/* HEADER */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', height: 56,
        background: '#0f1420', borderBottom: `1px solid ${gold}33`,
        flexShrink: 0,
      }}>
        <button onClick={() => router.push('/')} style={{
          background: 'none', border: 'none', color: gold,
          fontSize: 20, cursor: 'pointer', fontWeight: 700, letterSpacing: 2,
        }}>✦ AURA</button>

        {/* Provider tabs */}
        <div style={{ display: 'flex', gap: 6 }}>
          {(Object.keys(MODELS) as Provider[]).map(p => (
            <button key={p} onClick={() => handleProviderChange(p)} style={{
              padding: '5px 12px', borderRadius: 16, fontSize: 12, fontWeight: 600,
              cursor: 'pointer', border: `1px solid ${provider === p ? PROVIDER_COLORS[p] : '#333'}`,
              background: provider === p ? PROVIDER_COLORS[p] + '22' : 'transparent',
              color: provider === p ? PROVIDER_COLORS[p] : '#666',
            }}>
              {p === 'openai' ? 'GPT' : p === 'google' ? 'Gemini' : 'Claude'}
            </button>
          ))}
        </div>

        {/* Model selector */}
        <select
          value={modelId}
          onChange={e => setModelId(e.target.value)}
          style={{
            background: '#111', color: gold,
            border: `1px solid ${gold}55`, borderRadius: 8,
            padding: '5px 10px', fontSize: 12, cursor: 'pointer',
          }}
        >
          {MODELS[provider].map(m => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* MESSAGES */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '20px 16px',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {messages.length === 0 && (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', paddingTop: 80,
          }}>
            <div style={{ fontSize: 56, color: gold, marginBottom: 20 }}>✦</div>
            <h2 style={{ fontSize: 24, color: gold, margin: '0 0 8px' }}>
              Bonjour, je suis AURA
            </h2>
            <p style={{ color: '#555', fontSize: 14 }}>
              Sélectionnez un modèle et commencez votre conversation
            </p>
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} style={{
            display: 'flex',
            justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '78%', padding: '10px 14px',
              borderRadius: m.role === 'user'
                ? '18px 18px 4px 18px'
                : '18px 18px 18px 4px',
              background: m.role === 'user' ? gold : '#111827',
              border: m.role === 'assistant' ? `1px solid ${gold}33` : 'none',
              color: m.role === 'user' ? '#000' : '#e2e8f0',
              fontSize: 14, lineHeight: 1.7,
            }}>
              {m.role === 'assistant' && (
                <p style={{
                  margin: '0 0 4px', fontSize: 10,
                  color: gold, fontWeight: 700, letterSpacing: 1,
                }}>
                  ✦ AURA — {MODELS[provider].find(x => x.id === modelId)?.label}
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
              background: '#111827',
              border: `1px solid ${gold}33`,
              color: gold, fontSize: 18, letterSpacing: 4,
            }}>···</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div style={{
        padding: '12px 16px',
        background: '#0f1420',
        borderTop: `1px solid ${gold}33`,
        flexShrink: 0,
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder={`Message ${MODELS[provider].find(x => x.id === modelId)?.label}...`}
            style={{
              flex: 1, padding: '11px 18px', borderRadius: 24,
              border: `1px solid ${gold}44`, background: '#111',
              color: '#fff', fontSize: 14, outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{
              width: 44, height: 44, borderRadius: '50%',
              border: 'none', background: gold,
              color: '#000', fontSize: 18, fontWeight: 700,
              cursor: 'pointer',
              opacity: isLoading || !input.trim() ? 0.4 : 1,
            }}
          >↑</button>
        </form>
      </div>
    </div>
  );
  }
