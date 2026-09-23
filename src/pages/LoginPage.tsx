import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { homePath, useAuth } from '../context/AuthContext'
import { adminDemo, parentDemo } from '../data/mock'
import { useLoc } from '../lib/hooks'
import { Button, Card, Field, Logo, Section, inputClass } from '../components/ui'

export function LoginPage() {
  const { t } = useTranslation()
  const loc = useLoc()
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState(parentDemo.email)
  const [showTenantLogin, setShowTenantLogin] = useState(false)

  if (user) return <Navigate to={loc(homePath(user.role))} replace />

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(false)
    setLoading(true)
    
    const data = new FormData(event.currentTarget)
    const emailValue = String(data.get('email') || '')
    const passwordValue = String(data.get('password') || '')
    const slugValue = showTenantLogin ? String(data.get('slug') || '') : undefined
    
    try {
      const ok = await login(emailValue, passwordValue, slugValue)
      if (!ok) {
        setError(true)
        setLoading(false)
        return
      }
      const role = emailValue.toLowerCase() === adminDemo.email ? 'admin' : 'parent'
      navigate(loc(homePath(role)))
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy pattern-gold">
      <Section className="flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 flex items-center justify-between text-cream">
            <Logo to={loc()} />
            <LanguageSwitcher light />
          </div>
        <Card className="w-full">
          <p className="text-xs tracking-[0.18em] text-gold uppercase">{t('login.kicker')}</p>
          <h1 className="mt-2 font-display text-3xl text-navy">{t('login.title')}</h1>
          <p className="mt-2 text-muted">{t('login.lead')}</p>
          <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
            {showTenantLogin && (
              <Field label="City / Kindergarten">
                <input 
                  name="slug" 
                  type="text" 
                  required={showTenantLogin}
                  placeholder="novosibirsk" 
                  className={inputClass} 
                  defaultValue="novosibirsk"
                />
              </Field>
            )}
            <Field label={t('login.email')}>
              <input name="email" type="email" required className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label={t('login.password')}>
              <input name="password" type="password" required className={inputClass} defaultValue="demo" />
            </Field>
            {error && <p className="text-sm text-terracotta">{t('login.error')}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : t('login.submit')}
            </Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {!showTenantLogin ? (
              <>
                <Button variant="ghost" onClick={() => setEmail(parentDemo.email)}>
                  {t('login.asParent')}
                </Button>
                <Button variant="ghost" onClick={() => setEmail(adminDemo.email)}>
                  {t('login.asAdmin')}
                </Button>
                <Button variant="ghost" onClick={() => setShowTenantLogin(true)}>
                  Tenant Admin
                </Button>
              </>
            ) : (
              <Button variant="ghost" onClick={() => setShowTenantLogin(false)}>
                Demo Login
              </Button>
            )}
          </div>
          <p className="mt-4 text-sm text-muted">{t('login.hint')}</p>
          {showTenantLogin ? (
            <p className="mt-1 text-sm text-muted">
              Login with your city slug, admin email, and password.
            </p>
          ) : (
            <p className="mt-1 text-sm text-muted">{t('login.adminHint')}</p>
          )}
          <Link to={loc()} className="mt-4 inline-block text-sm text-navy">
            {t('login.back')}
          </Link>
        </Card>
        </div>
      </Section>
    </div>
  )
}
