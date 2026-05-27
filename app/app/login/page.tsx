'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Currency = 'EUR' | 'USD' | 'FCFA';

const RATES: Record<Currency, number> = { EUR: 1, USD: 1.3, FCFA: 650 };
const SYMBOLS: Record<Currency, string> = { EUR: '€', USD: '$', FCFA: 'FCFA' };

const PLANS = [
  {
    id: 'free', name: 'FREE', priceEUR: 0,
    description: 'Idéal pour le premier essai',
    features: ['1 modèle (ChatGPT Standard)', '5 messages / jour', 'Vitesse standard'],
    highlight: false,
  },
  {
    id: 'classic', name: 'CLASSIC', priceEUR: 20,
    description: 'Pour une utilisation personnelle régulière',
    features: ['3 modèles (GPT, Gemini, Claude)', '100 messages / jour', 'Streaming normal'],
    highlight: false,
  },
  {
    id: 'basic', name: 'BASIC', priceEUR: 35,
    description: 'Pour étudiants et créateurs',
    features: ['15 modèles intermédiaires', '300 messages / jour', 'Import de fichiers texte'],
    highlight: false,
  },
  {
    id: 'premium', name: 'PREMIUM', priceEUR: 50,
    description: 'Pour une utilisation professionnelle intensive',
    features: ['30 modèles spécialisés', 'Messages illimités', 'Vision & documents lourds', 'Streaming prioritaire'],
    highlight: true,
  },
  {
    id: 'vip', name: 'PREMIUM VIP', priceEUR: 100,
    description: "L'expérience ultime d'AURA",
    features: ['30 modèles + contexte maximal', 'Hyper-Streaming dédié', 'Exécution de scripts', 'Support VIP 24/7', 'Accès bêta exclusif'],
    highlight: false,
  },
];

export default function LandingPage() {
  const [currency, setCurrency] = useState<Currency>('EUR');
  const router = useRouter();
  const gold = '#D4AF37';

  const formatPrice = (eur: number) => {
    const price = Math.round(eur * RATES[currency]);
    return `${price} ${SYMBOLS[currency]}`;
  };

  return (
    <div style={{ background: '#0B0F19', minHeight: '100vh', color: '#fff', fontFamily: 'Georgia, serif' }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 60,
        background: 'rgba(11,15,25,0.95)', borderBottom: '1px solid #1a1a2e',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22, color: gold }}>✦</span>
          <span style={{ fontWeight: 700, fontSize: 20, color: gold, letterSpacing: 3 }}>AURA</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#888' }}>
          {['Fonctionnalités', 'Tarifs', 'Réseau mondial', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              style={{ color: '#888', textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = gold)}
              onMouseOut={e => (e.currentTarget.style.color = '#888')}
            >{item}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value as Currency)}
            style={{
              background: '#111', color: gold, border: `1px solid ${gold}`,
              borderRadius: 6, padding: '4px 8px', fontSize: 12, cursor: 'pointer',
            }}
          >
            <option value="EUR">🇪🇺 EUR</option>
            <option value="USD">🇺🇸 USD</option>
            <option value="FCFA">🌍 FCFA</option>
          </select>
          <button onClick={() => router.push('/login')} style={{
            padding: '8px 18px', borderRadius: 8,
            background: gold, color: '#000',
            border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer',
          }}>Se connecter</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '90vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '60px 24px',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 16px', borderRadius: 20,
          border: `1px solid ${gold}`, background: 'rgba(212,175,55,0.08)',
          fontSize: 12, color: gold, marginBottom: 40,
        }}>
          ✦ Expérience IA Premium
        </div>

        <h1 style={{ fontSize: 56, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.1 }}>
          L'avenir de l'IA
        </h1>

        <div style={{
          background: gold, padding: '10px 40px',
          borderRadius: 4, marginBottom: 32,
        }}>
          <span style={{ fontSize: 48, fontWeight: 700, color: '#7a5c00', fontStyle: 'italic' }}>
            Est-ce ici ?
          </span>
        </div>

        <p style={{ fontSize: 16, color: '#888', maxWidth: 480, lineHeight: 1.8, margin: '0 0 40px' }}>
          Découvrez GPT-4, Claude et Gemini au sein d'une interface élégante.
          AURA offre des capacités d'IA de pointe d'une sophistication inégalée.
        </p>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 80 }}>
          <button onClick={() => router.push('/login')} style={{
            padding: '12px 28px', borderRadius: 8,
            border: `1px solid ${gold}`, color: gold,
            background: 'transparent', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>Essai gratuit →</button>
          <a href="#tarifs" style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>
            Explorez les fonctionnalités
          </a>
        </div>

        <div style={{ display: 'flex', gap: 60 }}>
          {[
            { icon: '⚡', value: '99,9%', label: 'SLA de disponibilité' },
            { icon: '🛡️', value: '100%', label: 'Sécurisé' },
            { icon: '🌐', value: '3', label: 'Serveurs mondiaux' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: gold }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 36, color: gold, marginBottom: 8 }}>Nos Tarifs</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 48 }}>Choisissez le plan qui vous correspond</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {PLANS.map(plan => (
            <div key={plan.id} style={{
              flex: '1 1 180px', maxWidth: 200,
              background: '#0f1420',
              border: `1px solid ${plan.highlight ? gold : '#1a1a2e'}`,
              borderRadius: 16, padding: '24px 16px',
              display: 'flex', flexDirection: 'column', gap: 12,
              boxShadow: plan.highlight ? `0 0 24px ${gold}33` : 'none',
              position: 'relative',
            }}>
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: gold, color: '#000', fontSize: 10, fontWeight: 700,
                  padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap',
                }}>⭐ POPULAIRE</div>
              )}
              <div style={{ fontSize: 13, fontWeight: 700, color: gold, letterSpacing: 2 }}>{plan.name}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>{formatPrice(plan.priceEUR)}</div>
              <div style={{ fontSize: 11, color: '#555' }}>{plan.description}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ fontSize: 11, color: '#888', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                    <span style={{ color: gold }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => router.push('/login')} style={{
                marginTop: 'auto', padding: '10px',
                borderRadius: 8, border: `1px solid ${plan.highlight ? gold : '#333'}`,
                background: plan.highlight ? gold : 'transparent',
                color: plan.highlight ? '#000' : gold,
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}>
                {plan.priceEUR === 0 ? 'Commencer' : 'Choisir ce plan'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CONNEXION */}
      <section style={{
        padding: '80px 24px', textAlign: 'center',
        borderTop: '1px solid #1a1a2e',
      }}>
        <h2 style={{ fontSize: 32, color: gold, marginBottom: 8 }}>Connexion sécurisée</h2>
        <p style={{ color: '#666', marginBottom: 40 }}>Authentifiez-vous avec votre compte existant</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Continuer avec Google', icon: '🔵' },
            { label: 'Continuer avec GitHub', icon: '⚫' },
          ].map(btn => (
            <button key={btn.label} onClick={() => router.push('/login')} style={{
              padding: '12px 24px', borderRadius: 10,
              border: '1px solid #333', background: '#111',
              color: '#fff', fontSize: 14, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span>{btn.icon}</span> {btn.label}
            </button>
          ))}
        </div>
      </section>

      {/* PAIEMENT */}
      <section style={{ padding: '60px 24px', textAlign: 'center', borderTop: '1px solid #1a1a2e' }}>
        <p style={{ color: '#555', fontSize: 13, marginBottom: 20 }}>Moyens de paiement acceptés</p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {['PayPal', 'Orange Money', 'Wave'].map(p => (
            <div key={p} style={{
              padding: '8px 20px', borderRadius: 8,
              border: `1px solid ${gold}33`, background: '#111',
              color: '#888', fontSize: 13,
            }}>{p}</div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '24px', textAlign: 'center',
        borderTop: '1px solid #1a1a2e', color: '#333', fontSize: 12,
      }}>
        © 2025 AURA — Tous droits réservés
      </footer>

    </div>
  );
  }
