import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { homePath, useAuth } from '../context/AuthContext'
import { useLoc } from '../lib/hooks'
import { Button, Logo } from './ui'
import { LanguageSwitcher } from './LanguageSwitcher'

const links = [
  { to: '', key: 'nav.home' },
  { to: '/gan', key: 'nav.gan' },
  { to: '/school', key: 'nav.school' },
  { to: '/life', key: 'nav.life' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
] as const

export function PublicLayout() {
  const { t } = useTranslation()
  const loc = useLoc()
  const { user } = useAuth()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-cream text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
      >
        {t('nav.skip')}
      </a>
      <div className="hidden bg-navy text-cream md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2 text-xs">
          <p className="text-cream/80">
            {t('footer.address')} · {t('footer.hours')}
          </p>
          <a className="font-semibold text-gold no-underline" href="tel:+97225550148">
            {t('contact.phoneValue')}
          </a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-navy/5 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Logo to={loc()} />
          <nav className="hidden items-center gap-5 text-sm font-medium text-navy lg:flex">
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
            <Button to={user ? loc(homePath(user.role)) : loc('/login')} variant="navy">
              {user ? (user.role === 'admin' ? t('nav.admin') : t('nav.portal')) : t('nav.login')}
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
                  className="text-navy no-underline"
                >
                  {t(item.key)}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <LanguageSwitcher />
              <Button to={user ? loc(homePath(user.role)) : loc('/login')} variant="navy">
                {user ? (user.role === 'admin' ? t('nav.admin') : t('nav.portal')) : t('nav.login')}
              </Button>
              <Button to={loc('/apply')}>{t('nav.apply')}</Button>
            </div>
          </div>
        )}
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="mt-8 border-t border-navy/10 bg-navy text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl">{t('brand')}</p>
            <p className="mt-2 max-w-sm text-cream/70">{t('tagline')}</p>
            <p className="mt-4 text-sm text-cream/70">{t('footer.shabbat')}</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-gold uppercase">{t('footer.explore')}</p>
            <div className="mt-3 grid gap-2 text-sm">
              {links.map((item) => (
                <NavLink key={item.to} to={loc(item.to)} className="text-cream/80 no-underline hover:text-gold">
                  {t(item.key)}
                </NavLink>
              ))}
              <NavLink to={loc('/faq')} className="text-cream/80 no-underline hover:text-gold">
                {t('nav.faq')}
              </NavLink>
              <NavLink to={loc('/apply')} className="text-cream/80 no-underline hover:text-gold">
                {t('nav.apply')}
              </NavLink>
            </div>
          </div>
          <div className="text-sm leading-7 text-cream/80">
            <p className="text-xs tracking-[0.16em] text-gold uppercase">{t('nav.contact')}</p>
            <p className="mt-3">{t('footer.address')}</p>
            <p>{t('footer.hours')}</p>
            <a className="mt-2 block text-gold no-underline" href="tel:+97225550148">
              {t('contact.phoneValue')}
            </a>
            <a className="block text-gold no-underline" href="mailto:office@chabad-kinder.demo">
              {t('contact.emailValue')}
            </a>
          </div>
        </div>
        <p className="border-t border-white/10 px-5 py-4 text-center text-xs text-cream/50">{t('footer.rights')}</p>
      </footer>
    </div>
  )
}
