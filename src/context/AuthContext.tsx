import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from 'react'
import { adminDemo, parentDemo } from '../data/mock'
import type { Text } from '../data/mock'
import { loadJson, removeKey, saveJson } from '../lib/storage'
import { api } from '../lib/api'

export type UserRole = 'parent' | 'admin'

export type AuthState = {
  email: string
  role: UserRole
  name: Text
  slug?: string
} | null

type AuthContextValue = {
  user: AuthState
  loading: boolean
  login: (email: string, password: string, slug?: string) => Promise<boolean>
  logout: () => Promise<void>
  checkSession: () => Promise<void>
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    try {
      const session = await api.getSession()
      if (session.authenticated) {
        setUser({
          email: session.userId,
          role: 'admin',
          name: { he: 'מנהל', en: 'Admin', ru: 'Администратор' },
          slug: session.slug,
        })
        saveJson('auth', { email: session.userId, role: 'admin', slug: session.slug })
      }
    } catch (error) {
      console.error('Session check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      checkSession,
      login: async (email, password, slug) => {
        try {
          if (slug) {
            const result = await api.login(slug, email, password)
            if (result.success) {
              const next: AuthState = {
                email: result.user.email,
                role: 'admin',
                name: result.user.name ? 
                  { he: result.user.name, en: result.user.name, ru: result.user.name } :
                  { he: 'מנהל', en: 'Admin', ru: 'Администратор' },
                slug: result.user.slug,
              }
              saveJson('auth', next)
              setUser(next)
              return true
            }
            return false
          } else {
            const match = accounts.find(
              (account) =>
                account.email === email.trim().toLowerCase() && account.password === password,
            )
            if (!match) return false
            const next = { email: match.email, role: match.role, name: match.name }
            saveJson('auth', next)
            setUser(next)
            return true
          }
        } catch (error) {
          console.error('Login failed:', error)
          return false
        }
      },
      logout: async () => {
        try {
          await api.logout()
        } catch (error) {
          console.error('Logout failed:', error)
        }
        removeKey('auth')
        setUser(null)
      },
    }),
    [user, loading],
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
