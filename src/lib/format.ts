import type { Lang } from './locale'

const localeOf: Record<Lang, string> = {
  he: 'he-IL',
  en: 'en-GB',
  ru: 'ru-RU',
}

export function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(localeOf[lang], {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${iso}T12:00:00`))
}

export function formatMoney(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(localeOf[lang], {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: 0,
  }).format(amount)
}
