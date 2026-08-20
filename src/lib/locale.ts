export const LANGS = ['he', 'en', 'ru'] as const
export type Lang = (typeof LANGS)[number]

export function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang)
}

export function dirOf(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'he' ? 'rtl' : 'ltr'
}

export function languageLabel(lang: Lang): string {
  if (lang === 'he') return 'עברית'
  if (lang === 'ru') return 'Русский'
  return 'English'
}

export function languageCode(lang: Lang): string {
  if (lang === 'he') return 'HE'
  if (lang === 'ru') return 'RU'
  return 'EN'
}
