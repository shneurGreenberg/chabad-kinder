const PREFIX = 'chabad-kinder:'

export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function saveJson(key: string, value: unknown): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(value))
}

export function removeKey(key: string): void {
  localStorage.removeItem(PREFIX + key)
}
