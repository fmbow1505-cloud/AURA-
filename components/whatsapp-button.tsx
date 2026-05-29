'use client'

import { useCurrency } from '@/lib/currency-context'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const { currency, symbol } = useCurrency()

  const handleClick = () => {
    const message = encodeURIComponent(
      `Bonjour! Je suis intéressé par AURA Premium AI Platform.\n\nDevise préférée: ${currency} (${symbol})\n\nPourriez-vous me donner plus d'informations sur vos forfaits?`
    )
    window.open(`https://wa.me/221781825737?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-300 glow-gold"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  )
}
