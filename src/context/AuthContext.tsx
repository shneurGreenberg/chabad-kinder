import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { parentDemo } from '../data/mock'
import { loadJson, removeKey, saveJson } from '../lib/storage'

type AuthState = { email: string } | null

type AuthContextValue = {
  user: AuthState
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState>(() => loadJson<AuthState>('auth', null))

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (email, password) => {
        const ok =
          email.trim().toLowerCase() === parentDemo.email && password === parentDemo.password
        if (!ok) return false
        const next = { email: parentDemo.email }
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
