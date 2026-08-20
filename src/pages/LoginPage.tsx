import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { useAuth } from '../context/AuthContext'
import { useLoc } from '../lib/hooks'
import { Button, Card, Field, Logo, Section, inputClass } from '../components/ui'

export function LoginPage() {
  const { t } = useTranslation()
  const loc = useLoc()
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  if (user) return <Navigate to={loc('/portal')} replace />

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const ok = login(String(data.get('email') || ''), String(data.get('password') || ''))
    if (!ok) {
      setError(true)
      return
    }
    navigate(loc('/portal'))
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
            <Field label={t('login.email')}>
              <input name="email" type="email" required className={inputClass} defaultValue="parent@demo.local" />
            </Field>
            <Field label={t('login.password')}>
              <input name="password" type="password" required className={inputClass} defaultValue="demo" />
            </Field>
            {error && <p className="text-sm text-terracotta">{t('login.error')}</p>}
            <Button type="submit">{t('login.submit')}</Button>
          </form>
          <p className="mt-4 text-sm text-muted">{t('login.hint')}</p>
          <Link to={loc()} className="mt-4 inline-block text-sm text-navy">
            {t('login.back')}
          </Link>
        </Card>
        </div>
      </Section>
    </div>
  )
}
