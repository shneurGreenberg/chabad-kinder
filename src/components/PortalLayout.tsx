import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FamilyProvider } from '../context/FamilyContext'
import { useAuth } from '../context/AuthContext'
import { parentDemo } from '../data/mock'
import { useLang, useLoc } from '../lib/hooks'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './ui'

const tabs = [
  { to: '', key: 'portal.home', icon: 'home' },
  { to: '/child', key: 'portal.child', icon: 'child' },
  { to: '/attendance', key: 'portal.attendance', icon: 'cal' },
  { to: '/finance', key: 'portal.finance', icon: 'pay' },
  { to: '/clubs', key: 'portal.clubs', icon: 'club' },
  { to: '/messages', key: 'portal.messages', icon: 'msg' },
  { to: '/photos', key: 'portal.photos', icon: 'photo' },
] as const

function Icon({ name }: { name: string }) {
  const common = 'h-5 w-5'
  if (name === 'home') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
      </svg>
    )
  }
  if (name === 'child') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3" />
        <path d="M6 20c1-3.5 3-5 6-5s5 1.5 6 5" />
      </svg>
    )
  }
  if (name === 'cal') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    )
  }
  if (name === 'pay') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </svg>
    )
  }
  if (name === 'club') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    )
  }
  if (name === 'msg') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6h14v10H8l-3 3z" />
      </svg>
    )
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M4 16l5-4 4 3 7-6" />
    </svg>
  )
}

export function PortalLayout() {
  const { t } = useTranslation()
  const loc = useLoc()
  const lang = useLang()
  const { user, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (!user) return <Navigate to={loc('/login')} replace />

  return (
    <FamilyProvider>
      <div className="min-h-screen bg-cream text-ink">
        <header className="sticky top-0 z-40 border-b border-navy/5 bg-navy text-cream">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <Logo to={loc('/portal')} compact />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-cream/70">{t('portal.hello')}</p>
              <p className="truncate font-semibold">{parentDemo.name[lang]}</p>
            </div>
            <div className="flex items-center gap-2">
              <NavLink to={loc()} className="hidden text-xs text-gold no-underline sm:inline">
                {t('portal.toSite')}
              </NavLink>
              <LanguageSwitcher light />
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold"
              >
                {t('portal.logout')}
              </button>
            </div>
          </div>
          <nav className="hidden overflow-x-auto md:block">
            <div className="mx-auto flex max-w-6xl gap-1 px-4 pb-2">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.to}
                  to={loc(`/portal${tab.to}`)}
                  end={tab.to === ''}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-1.5 text-sm no-underline ${
                      isActive ? 'bg-gold text-navy' : 'text-cream/80 hover:text-white'
                    }`
                  }
                >
                  {t(tab.key)}
                </NavLink>
              ))}
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 pb-28 md:pb-10">
          <Outlet />
        </main>
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
          <div className="grid grid-cols-7">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={loc(`/portal${tab.to}`)}
                end={tab.to === ''}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2 text-[10px] no-underline ${
                    isActive ? 'text-gold' : 'text-muted'
                  }`
                }
              >
                <Icon name={tab.icon} />
                <span className="max-w-full truncate px-0.5">{t(tab.key)}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </FamilyProvider>
  )
}
