import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { adminDemo, parentDemo } from '../data/mock'
import type { Text } from '../data/mock'
import { loadJson, removeKey, saveJson } from '../lib/storage'

export type UserRole = 'parent' | 'admin'

export type AuthState = {
  email: string
  role: UserRole
  name: Text
} | null

type AuthContextValue = {
  user: AuthState
  login: (email: string, password: string) => boolean
  logout: () => void
}

const accounts = [
  { ...parentDemo, role: 'parent' as const },
  { ...adminDemo, role: 'admin' as const },
]

function normalize(saved: AuthState | { email: string } | null): AuthState {
  if (!saved) return null
  const match = accounts.find((account) => account.email === saved.email)
  if (!match) return null
  return { email: match.email, role: match.role, name: match.name }
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState>(() => normalize(loadJson<AuthState>('auth', null)))

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (email, password) => {
        const match = accounts.find(
          (account) =>
            account.email === email.trim().toLowerCase() && account.password === password,
        )
        if (!match) return false
        const next = { email: match.email, role: match.role, name: match.name }
        saveJson('auth', next)
        setUser(next)
        return true
      },
      logout: () => {
        removeKey('auth')
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('AuthProvider missing')
  return ctx
}

export function homePath(role: UserRole | undefined): string {
  return role === 'admin' ? '/admin' : '/portal'
}
