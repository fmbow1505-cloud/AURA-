'use client'

import { useCurrency, type Currency } from '@/lib/currency-context'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const currencies: { value: Currency; label: string; flag: string }[] = [
  { value: 'EUR', label: 'EUR', flag: '🇪🇺' },
  { value: 'USD', label: 'USD', flag: '🇺🇸' },
  { value: 'FCFA', label: 'FCFA', flag: '🇸🇳' },
]

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
      <SelectTrigger className="w-[110px] bg-secondary border-border text-foreground">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {currencies.map((c) => (
          <SelectItem key={c.value} value={c.value} className="text-foreground hover:bg-secondary">
            <span className="flex items-center gap-2">
              <span>{c.flag}</span>
              <span>{c.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
