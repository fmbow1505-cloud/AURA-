'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      fontFamily: 'Georgia, serif',
    }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid #222',
        background: '#0a0a0a',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>✦</span>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#f5c842', letterSpacing: 2 }}>AURA</span>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#aaa' }}>
          <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Fonctionnalités</a>
          <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Tarifs</a>
          <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Réseau mondial</a>
          <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Contact</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#aaa' }}>🇪🇺 EUR</span>
          <a href="/chat" style={{
            padding: '8px 16px',
            borderRadius: 8,
            background: '#f5c842',
            color: '#0a0a0a',
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none',
          }}>Se connecter</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '100px 24px 60px',
        minHeight: '80vh',
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 14px',
          borderRadius: 20,
          border: '1px solid #333',
          background: '#111',
          fontSize: 12,
          color: '#f5c842',
          marginBottom: 40,
        }}>
          ✦ Expérience IA Premium
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 52,
          fontWeight: 700,
          margin: '0 0 16px',
          lineHeight: 1.1,
          color: '#fff',
        }}>
          L'avenir de l'IA
        </h1>

        {/* Gold highlight */}
        <div style={{
          background: '#f5c842',
          padding: '8px 32px',
          borderRadius: 4,
          marginBottom: 32,
        }}>
          <span style={{
            fontSize: 44,
            fontWeight: 700,
            color: '#b8860b',
            fontStyle: 'italic',
          }}>
            Est-ce ici ?
          </span>
        </div>

        {/* Subtitle */}
        <p style={{
          fontSize: 15,
          color: '#888',
          maxWidth: 420,
          lineHeight: 1.7,
          margin: '0 0 40px',
        }}>
          Découvrez GPT-4, Claude et Gemini au sein d'une interface élégante.
          AURA offre des capacités d'IA de pointe d'une sophistication inégalée.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 80 }}>
          <a href="/chat" style={{
            padding: '12px 24px',
            borderRadius: 8,
            border: '1px solid #f5c842',
            color: '#f5c842',
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            Essai gratuit →
          </a>
          <a href="#features" style={{
            fontSize: 14,
            color: '#aaa',
            textDecoration: 'none',
          }}>
            Explorez les fonctionnalités
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: 48,
          justifyContent: 'center',
        }}>
          {[
            { icon: '⚡', value: '99,9%', label: 'SLA de disponibilité' },
            { icon: '🛡️', value: '100%', label: 'Sécurisé' },
            { icon: '🌐', value: '3', label: 'Serveurs mondiaux' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#f5c842' }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
      }
