'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const gold = '#D4AF37';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleLogin = (provider: string) => {
    setLoading(provider);
    setTimeout(() => {
      router.push('/chat');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F19', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 44, color: gold }}>✦</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: gold, letterSpacing: 4, margin: '8px 0 0' }}>AURA</h1>
        <p style={{ color: '#555', fontSize: 13, marginTop: 8 }}>Connectez-vous pour accéder à l'expérience IA Premium</p>
      </div>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: 380, background: '#0f1420', border: `1px solid ${gold}33`, borderRadius: 20, padding: '36px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h2 style={{ textAlign: 'center', fontSize: 16, color: '#fff', margin: '0 0 8px', fontWeight: 500 }}>Choisissez votre méthode de connexion</h2>

        {/* Google */}
        <button onClick={() => handleLogin('google')} disabled={loading !== null} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          padding: '14px 20px', borderRadius: 12,
          border: `1px solid ${loading === 'google' ? '#4285F4' : '#222'}`,
          background: loading === 'google' ? 'rgba(66,133,244,0.1)' : '#111',
          color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          opacity: loading && loading !== 'google' ? 0.4 : 1,
        }}>
          {loading === 'google' ? <span style={{ color: '#4285F4' }}>Connexion en cours...</span> : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuer avec Google
            </>
          )}
        </button>

        {/* GitHub */}
        <button onClick={() => handleLogin('github')} disabled={loading !== null} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          padding: '14px 20px', borderRadius: 12,
          border: `1px solid ${loading === 'github' ? '#fff' : '#222'}`,
          background: loading === 'github' ? 'rgba(255,255,255,0.05)' : '#111',
          color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          opacity: loading && loading !== 'github' ? 0.4 : 1,
        }}>
          {loading === 'github' ? <span style={{ color: '#fff' }}>Connexion en cours...</span> : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Continuer avec GitHub
            </>
          )}
        </button>

        {/* Apple */}
        <button onClick={() => handleLogin('apple')} disabled={loading !== null} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          padding: '14px 20px', borderRadius: 12,
          border: `1px solid ${loading === 'apple' ? '#fff' : '#222'}`,
          background: loading === 'apple' ? 'rgba(255,255,255,0.05)' : '#111',
          color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          opacity: loading && loading !== 'apple' ? 0.4 : 1,
        }}>
          {loading === 'apple' ? <span>Connexion en cours...</span> : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continuer avec Apple
            </>
          )}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#1a1a2e' }} />
          <span style={{ color: '#444', fontSize: 12 }}>ou</span>
          <div style={{ flex: 1, height: 1, background: '#1a1a2e' }} />
        </div>

        {/* Essai gratuit */}
        <button onClick={() => router.push('/payment?plan=free')} style={{
          padding: '14px 20px', borderRadius: 12,
          border: `1px solid ${gold}`,
          background: 'transparent', color: gold,
          fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>
          ✦ Commencer l'essai gratuit
        </button>

        <p style={{ textAlign: 'center', color: '#333', fontSize: 11, margin: 0 }}>
          En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
        </p>
      </div>

      <button onClick={() => router.push('/')} style={{ marginTop: 24, background: 'none', border: 'none', color: '#444', fontSize: 13, cursor: 'pointer' }}>
        ← Retour à l'accueil
      </button>
    </div>
  );
                 }
