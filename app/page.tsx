'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

type Agent = 'openai' | 'google' | 'anthropic';

export default function Home() {
  const [agent, setAgent] = useState<Agent>('openai');

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chat/${agent}`,
  });

  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <h1>AURA — Multi-Agent AI</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
        {(['openai', 'google', 'anthropic'] as Agent[]).map((a) => (
          <button
            key={a}
            onClick={() => setAgent(a)}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: '1px solid #ccc',
              background: agent === a ? '#7F77DD' : 'transparent',
              color: agent === a ? '#fff' : 'inherit',
              cursor: 'pointer',
            }}
          >
            {a === 'openai' ? 'GPT-4' : a === 'google' ? 'Gemini' : 'Claude'}
          </button>
        ))}
      </div>

      <div style={{ minHeight: 300, marginBottom: '1rem' }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 12 }}>
            <strong>{m.role === 'user' ? 'Toi' : agent.toUpperCase()}</strong>
            <p style={{ margin: '4px 0 0' }}>{m.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Envoie un message..."
          style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{ padding: '8px 16px', borderRadius: 8, background: '#7F77DD', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Envoyer
        </button>
      </form>
    </main>
  );
}
