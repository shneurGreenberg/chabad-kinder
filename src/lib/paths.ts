export function asset(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}

export function locPath(lang: string, path = ''): string {
  const suffix = path && !path.startsWith('/') ? `/${path}` : path
  return `/${lang}${suffix}`
}
