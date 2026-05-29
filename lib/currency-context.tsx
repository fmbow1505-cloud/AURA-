'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type Currency = 'EUR' | 'USD' | 'FCFA'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (priceInEur: number) => string
  convertPrice: (priceInEur: number) => number
  symbol: string
}

const exchangeRates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  FCFA: 655.96,
}

const symbols: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  FCFA: 'FCFA',
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('EUR')

  const convertPrice = useCallback((priceInEur: number) => {
    return Math.round(priceInEur * exchangeRates[currency])
  }, [currency])

  const formatPrice = useCallback((priceInEur: number) => {
    const converted = convertPrice(priceInEur)
    if (currency === 'FCFA') {
      return `${converted.toLocaleString('fr-FR')} FCFA`
    }
    return new Intl.NumberFormat(currency === 'EUR' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(converted)
  }, [currency, convertPrice])

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      formatPrice,
      convertPrice,
      symbol: symbols[currency],
    }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
