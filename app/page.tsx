'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';

export default function Home() {
  const [modelId, setModelId] = useState('gpt-4o');
  
  // On passe le modelId personnalisé à notre API
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { modelId },
  });

  return (
    <div className="flex flex-col h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-teal-500/30">
      
      {/* Header Minimaliste / Style Luxe */}
      <header className="border-b border-slate-800/60 bg-[#0F172A]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-teal-500 to-emerald-400 p-2 rounded-xl shadow-lg shadow-teal-500/10">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AURA
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Intelligence Hub</p>
          </div>
        </div>

        {/* Sélecteur de Modèles Premium */}
        <div className="relative">
          <select 
            value={modelId} 
            onChange={(e) => setModelId(e.target.value)}
            className="appearance-none bg-[#1E293B] border border-slate-700/80 text-slate-200 px-4 py-2 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:border-teal-500 transition-all cursor-pointer shadow-inner"
          >
            <optgroup label="ChatGPT (OpenAI)" className="bg-[#1E293B]">
              <option value="gpt-4o">GPT-4o (Principal)</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </optgroup>
            <optgroup label="Gemini (Google)" className="bg-[#1E293B]">
              <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
            </optgroup>
            <optgroup label="Claude (Anthropic)" className="bg-[#1E293B]">
              <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
              <option value="claude-3-opus">Claude 3.0 Opus</option>
            </optgroup>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            ▼
          </div>
        </div>
      </header>

      {/* Zone de Discussion */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl w-full mx-auto scrollbar-thin scrollbar-thumb-slate-800">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-center mb-4 shadow-xl">
              <Bot className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-2xl font-medium text-slate-200 mb-2">Comment puis-je vous aider aujourd'hui ?</h2>
            <p className="text-sm text-slate-500 max-w-md">
              Sélectionnez votre moteur IA en haut à droite et commencez à concevoir vos stratégies ou vos scripts de contenu automatisés.
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex gap-4 p-4 rounded-2xl transition-all border ${
                m.role === 'user' 
                  ? 'bg-slate-800/30 border-slate-700/30 ml-12' 
                  : 'bg-teal-950/10 border-teal-500/10 mr-12'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-md ${
                m.role === 'user' ? 'bg-slate-700 text-slate-200' : 'bg-gradient-to-br from-teal-500 to-emerald-400 text-slate-950'
              }`}>
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap flex-1 pt-0.5">
                {m.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-4 p-4 mr-12 animate-pulse bg-slate-900/40 rounded-2xl border border-slate-800/50">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-teal-400" />
            </div>
            <div className="space-y-2 flex-1 pt-2">
              <div className="h-2 bg-slate-700 rounded w-1/4"></div>
              <div className="h-2 bg-slate-700 rounded w-3/4"></div>
            </div>
          </div>
        )}
      </main>

      {/* Barre d'entrée de message */}
      <footer className="border-t border-slate-800/60 bg-[#0F172A]/40 backdrop-blur-sm p-4 sticky bottom-0">
        <form onSubmit={handleSubmit} className="max-w-4xl w-full mx-auto relative flex items-center">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder={`Écrire un message à AURA (${modelId})...`}
            className="w-full bg-[#131C2E] border border-slate-800 rounded-2xl py-4 pl-5 pr-14 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all shadow-xl"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 p-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 transition-all active:scale-95 disabled:opacity-30 disabled:scale-100 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 cursor-pointer shadow-md shadow-teal-500/10"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </footer>

    </div>
  );
      }
