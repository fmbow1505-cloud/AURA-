'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

const gold = '#D4AF37';

const PLANS_INFO: Record<string, { name: string; priceEUR: number; priceUSD: number; priceFCFA: number }> = {
  free:     { name: 'Free',         priceEUR: 0,   priceUSD: 0,   priceFCFA: 0 },
  starter:  { name: 'Starter',      priceEUR: 50,  priceUSD: 65,  priceFCFA: 32500 },
  pro:      { name: 'Pro',          priceEUR: 150, priceUSD: 195, priceFCFA: 97500 },
  business: { name: 'Business',     priceEUR: 250, priceUSD: 325, priceFCFA: 162500 },
  empire:   { name: 'Empire',       priceEUR: 300, priceUSD: 390, priceFCFA: 195000 },
};

type PayMethod = 'orange' | 'wave' | 'paypal' | 'stripe' | null;

function PaymentContent() {
  const router = useRouter();
  const params = useSearchParams();
  const planId = params.get('plan') ?? 'starter';
  const plan = PLANS_INFO[planId] ?? PLANS_INFO['starter'];

  const [method, setMethod] = useState<PayMethod>(null);
  const [phone, setPhone] = useState('78 182 57 37');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handlePay = () => {
    if (!method) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2000);
  };

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: '#0B0F19', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center', padding: 24 }}>
        <div style={{ fontSize: 64, color: gold }}>✦</div>
        <h2 style={{ fontSize: 28, color: '#fff', margin: 0 }}>Paiement confirmé !</h2>
        <p style={{ color: '#888', fontSize: 14 }}>Votre plan <span style={{ color: gold }}>{plan.name}</span> est maintenant actif.</p>
        <button onClick={() => router.push('/chat')} style={{ marginTop: 16, padding: '12px 28px', borderRadius: 8, background: gold, color: '#000', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          Accéder à AURA →
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F19', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>

      {/* Logo */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 32, color: gold }}>✦</div>
        <h1 style={{ fontSize: 22, color: gold, letterSpacing: 3, margin: '8px 0 0', fontWeight: 700 }}>AURA</h1>
      </div>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: 460, background: '#0f1420', border: `1px solid ${gold}33`, borderRadius: 20, padding: '32px 28px' }}>

        {/* Plan résumé */}
        <div style={{ background: '#0B0F19', border: `1px solid ${gold}22`, borderRadius: 12, padding: '16px 20px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>Plan sélectionné</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{plan.name}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: gold }}>{plan.priceEUR} €</div>
            <div style={{ fontSize: 11, color: '#666' }}>{plan.priceFCFA.toLocaleString()} FCFA</div>
          </div>
        </div>

        <h2 style={{ fontSize: 16, color: '#fff', margin: '0 0 20px', fontWeight: 600 }}>Choisissez votre moyen de paiement</h2>

        {/* Méthodes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>

          {/* Orange Money */}
          <button onClick={() => setMethod('orange')} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 18px', borderRadius: 12, cursor: 'pointer',
            border: `1px solid ${method === 'orange' ? '#FF6600' : '#1a1a2e'}`,
            background: method === 'orange' ? 'rgba(255,102,0,0.1)' : '#111',
            color: '#fff', textAlign: 'left',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FF6600', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🟠</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Orange Money</div>
              <div style={{ fontSize: 11, color: '#666' }}>Paiement mobile instantané</div>
            </div>
            {method === 'orange' && <span style={{ marginLeft: 'auto', color: '#FF6600', fontSize: 18 }}>✓</span>}
          </button>

          {/* Wave */}
          <button onClick={() => setMethod('wave')} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 18px', borderRadius: 12, cursor: 'pointer',
            border: `1px solid ${method === 'wave' ? '#1A75FF' : '#1a1a2e'}`,
            background: method === 'wave' ? 'rgba(26,117,255,0.1)' : '#111',
            color: '#fff', textAlign: 'left',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1A75FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🌊</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Wave</div>
              <div style={{ fontSize: 11, color: '#666' }}>Transfert rapide et gratuit</div>
            </div>
            {method === 'wave' && <span style={{ marginLeft: 'auto', color: '#1A75FF', fontSize: 18 }}>✓</span>}
          </button>

          {/* PayPal */}
          <button onClick={() => setMethod('paypal')} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 18px', borderRadius: 12, cursor: 'pointer',
            border: `1px solid ${method === 'paypal' ? '#003087' : '#1a1a2e'}`,
            background: method === 'paypal' ? 'rgba(0,48,135,0.2)' : '#111',
            color: '#fff', textAlign: 'left',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#003087', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🅿️</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>PayPal</div>
              <div style={{ fontSize: 11, color: '#666' }}>Paiement sécurisé international</div>
            </div>
            {method === 'paypal' && <span style={{ marginLeft: 'auto', color: '#0070E0', fontSize: 18 }}>✓</span>}
          </button>

          {/* Stripe */}
          <button onClick={() => setMethod('stripe')} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 18px', borderRadius: 12, cursor: 'pointer',
            border: `1px solid ${method === 'stripe' ? '#635BFF' : '#1a1a2e'}`,
            background: method === 'stripe' ? 'rgba(99,91,255,0.1)' : '#111',
            color: '#fff', textAlign: 'left',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#635BFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>💳</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Stripe</div>
              <div style={{ fontSize: 11, color: '#666' }}>Carte bancaire internationale</div>
            </div>
            {method === 'stripe' && <span style={{ marginLeft: 'auto', color: '#635BFF', fontSize: 18 }}>✓</span>}
          </button>
        </div>

        {/* Formulaire selon méthode */}
        {(method === 'orange' || method === 'wave') && (
          <div style={{ background: '#0B0F19', border: '1px solid #1a1a2e', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: '#888' }}>Numéro de téléphone</label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Ex: 77 000 00 00"
              style={{ width: '100%', marginTop: 8, padding: '10px 14px', borderRadius: 8, border: `1px solid ${gold}33`, background: '#0B0F19', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
            />
            <p style={{ fontSize: 11, color: '#555', margin: '8px 0 0' }}>
              {method === 'orange' ? '📱 Vous recevrez une demande de confirmation Orange Money' : '🌊 Vous recevrez une notification Wave sur ce numéro'}
            </p>
          </div>
        )}

        {method === 'paypal' && (
          <div style={{ background: '#0B0F19', border: '1px solid #1a1a2e', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: '#888' }}>Email PayPal</label>
            <input
              placeholder="votre@paypal.com"
              style={{ width: '100%', marginTop: 8, padding: '10px 14px', borderRadius: 8, border: `1px solid ${gold}33`, background: '#0B0F19', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
            />
            <p style={{ fontSize: 11, color: '#555', margin: '8px 0 0' }}>🅿️ Vous serez redirigé vers PayPal pour confirmer</p>
          </div>
        )}

        {method === 'stripe' && (
          <div style={{ background: '#0B0F19', border: '1px solid #1a1a2e', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: '#888' }}>Numéro de carte</label>
            <input placeholder="4242 4242 4242 4242" style={{ width: '100%', marginTop: 8, padding: '10px 14px', borderRadius: 8, border: `1px solid ${gold}33`, background: '#0B0F19', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, color: '#888' }}>Expiration</label>
                <input placeholder="MM/AA" style={{ width: '100%', marginTop: 8, padding: '10px', borderRadius: 8, border: `1px solid ${gold}33`, background: '#0B0F19', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, color: '#888' }}>CVC</label>
                <input placeholder="123" style={{ width: '100%', marginTop: 8, padding: '10px', borderRadius: 8, border: `1px solid ${gold}33`, background: '#0B0F19', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
              </div>
            </div>
            <p style={{ fontSize: 11, color: '#555', margin: '8px 0 0' }}>💳 Paiement sécurisé par Stripe</p>
          </div>
        )}

        {/* Bouton payer */}
        <button
          onClick={handlePay}
          disabled={!method || loading}
          style={{
            width: '100%', padding: '14px', borderRadius: 12,
            background: method ? gold : '#1a1a2e',
            color: method ? '#000' : '#444',
            border: 'none', fontWeight: 700, fontSize: 15,
            cursor: method ? 'pointer' : 'not-allowed',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Traitement en cours...' : method ? `Payer ${plan.priceEUR} € avec ${method === 'orange' ? 'Orange Money' : method === 'wave' ? 'Wave' : method === 'paypal' ? 'PayPal' : 'Stripe'}` : 'Sélectionnez un moyen de paiement'}
        </button>

        <button onClick={() => router.back()} style={{ width: '100%', marginTop: 12, padding: '10px', borderRadius: 12, background: 'transparent', border: '1px solid #1a1a2e', color: '#666', fontSize: 13, cursor: 'pointer' }}>
          ← Retour
        </button>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0B0F19', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', fontSize: 24 }}>✦</div>}>
      <PaymentContent />
    </Suspense>
  );
             }
