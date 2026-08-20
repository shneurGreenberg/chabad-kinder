import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import { useLang, useLoc } from '../lib/hooks'
import { Button, Logo } from './ui'
import { LanguageSwitcher } from './LanguageSwitcher'

const links = [
  { to: '', key: 'nav.home' },
  { to: '/gan', key: 'nav.gan' },
  { to: '/school', key: 'nav.school' },
  { to: '/life', key: 'nav.life' },
  { to: '/about', key: 'nav.about' },
  { to: '/faq', key: 'nav.faq' },
  { to: '/contact', key: 'nav.contact' },
] as const

export function PublicLayout() {
  const { t } = useTranslation()
  const loc = useLoc()
  const lang = useLang()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-40 border-b border-navy/5 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Logo to={loc()} />
          <nav className="hidden items-center gap-4 text-sm font-medium text-navy lg:flex">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={loc(item.to)}
                end={item.to === ''}
                className={({ isActive }) =>
                  `no-underline transition hover:text-gold ${isActive ? 'text-gold' : 'text-navy'}`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <Button to={user ? loc('/portal') : loc('/login')} variant="navy">
              {user ? t('nav.portal') : t('nav.login')}
            </Button>
            <Button to={loc('/apply')}>{t('nav.apply')}</Button>
          </div>
          <button
            type="button"
            className="rounded-full border border-navy/15 px-3 py-2 text-sm font-semibold lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
        {open && (
          <div className="border-t border-navy/5 bg-cream px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-3 text-base font-medium">
              {links.map((item) => (
                <NavLink
                  key={item.to}
                  to={loc(item.to)}
                  onClick={() => setOpen(false)}
                  className="text-navy no-underline"
                >
                  {t(item.key)}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <LanguageSwitcher />
              <Button to={user ? loc('/portal') : loc('/login')} variant="navy">
                {user ? t('nav.portal') : t('nav.login')}
              </Button>
              <Button to={loc('/apply')}>{t('nav.apply')}</Button>
            </div>
          </div>
        )}
      </header>
      <Outlet />
      <footer className="mt-8 border-t border-navy/10 bg-navy text-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">{t('brand')}</p>
            <p className="mt-2 text-cream/70">{t('tagline')}</p>
          </div>
          <div className="text-sm leading-7 text-cream/80">
            <p>{t('footer.address')}</p>
            <p>{t('footer.hours')}</p>
            <p>{t('footer.shabbat')}</p>
          </div>
          <p className="text-sm text-cream/60">{t('footer.rights')}</p>
        </div>
        <p className="sr-only">{lang}</p>
      </footer>
    </div>
  )
}
