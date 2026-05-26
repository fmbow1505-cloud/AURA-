'use client';

import { useChat } from 'ai/react/dist';
import { useState } from 'react';

export default function Home() {
  const [modelId, setModelId] = useState('gpt-4o');
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { modelId },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0B0F19', color: '#F1F5F9', fontFamily: 'sans-serif' }}>
      
      {/* Header Premium AURA */}
      <header style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#0F172A', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#14B8A6', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', color: '#0F172A' }}>
            A
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600, letterSpacing: '0.05em' }}>AURA</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Intelligence Hub</p>
          </div>
        </div>

        <div>
          <select 
            value={modelId} 
            onChange={(e) => setModelId(e.target.value)}
            style={{ backgroundColor: '#1E293B', border: '1px solid #334155', color: '#E2E8F0', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', outline: 'none' }}
          >
            <option value="gpt-4o">GPT-4o (OpenAI)</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro (Google)</option>
            <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Anthropic)</option>
          </select>
        </div>
      </header>

      {/* Zone de Discussion */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        {messages.length === 0 ? (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: '100px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              🤖
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 500, color: '#E2E8F0', marginBottom: '8px' }}>Comment puis-je vous aider aujourd'hui ?</h2>
            <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '400px', margin: '0' }}>
              Sélectionnez votre modèle d'intelligence en haut à droite pour lancer la discussion.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((m) => (
              <div 
                key={m.id} 
                style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: m.role === 'user' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(20, 184, 166, 0.1)',
                  backgroundColor: m.role === 'user' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(20, 184, 166, 0.03)',
                  marginLeft: m.role === 'user' ? '48px' : '0px',
                  marginRight: m.role === 'user' ? '0px' : '48px'
                }}
              >
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '6px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '14px',
                  backgroundColor: m.role === 'user' ? '#334155' : '#14B8A6',
                  color: m.role === 'user' ? '#F1F5F9' : '#0F172A',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {m.role === 'user' ? 'U' : 'A'}
                </div>
                <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#E2E8F0', whiteSpace: 'pre-wrap', flex: 1, paddingTop: '4px' }}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Barre d'envoi */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#0F172A', padding: '16px' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '800px', width: '100%', margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Écrire un message à AURA..."
            style={{ width: '100%', backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '12px', padding: '16px', paddingRight: '60px', fontSize: '14px', color: '#F1F5F9', outline: 'none' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            style={{ position: 'absolute', right: '12px', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#14B8A6', border: 'none', color: '#0F172A', fontWeight: 'bold', cursor: 'pointer', opacity: (!input.trim() || isLoading) ? 0.3 : 1 }}
          >
            ➔
          </button>
        </form>
      </footer>

    </div>
  );
            }
