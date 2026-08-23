import { useEffect } from 'react'
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AdminProvider } from '../context/AdminContext'
import { useAuth } from '../context/AuthContext'
import { useLang, useLoc } from '../lib/hooks'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './ui'

const tabs = [
  { to: '', key: 'admin.nav.home' },
  { to: '/children', key: 'admin.nav.children' },
  { to: '/applications', key: 'admin.nav.applications' },
  { to: '/staff', key: 'admin.nav.staff' },
  { to: '/tariffs', key: 'admin.nav.tariffs' },
  { to: '/attendance', key: 'admin.nav.attendance' },
  { to: '/finance', key: 'admin.nav.finance' },
  { to: '/clubs', key: 'admin.nav.clubs' },
  { to: '/campus', key: 'admin.nav.campus' },
  { to: '/messages', key: 'admin.nav.messages' },
] as const

export function AdminLayout() {
  const { t } = useTranslation()
  const loc = useLoc()
  const lang = useLang()
  const { user, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (!user) return <Navigate to={loc('/login')} replace />
  if (user.role !== 'admin') return <Navigate to={loc('/portal')} replace />

  return (
    <AdminProvider>
      <div className="min-h-screen bg-cream text-ink lg:flex">
        <aside className="hidden w-64 shrink-0 flex-col bg-navy text-cream lg:flex">
          <div className="border-b border-white/10 px-5 py-4">
            <Logo to={loc('/admin')} compact />
            <p className="mt-3 text-xs text-cream/60">{t('admin.kicker')}</p>
            <p className="font-semibold">{user.name[lang]}</p>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={loc(`/admin${tab.to}`)}
                end={tab.to === ''}
                className={({ isActive }) =>
                  `rounded-2xl px-3 py-2 text-sm no-underline ${
                    isActive ? 'bg-gold text-navy' : 'text-cream/80 hover:bg-white/10'
                  }`
                }
              >
                {t(tab.key)}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-navy/5 bg-navy text-cream">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="lg:hidden">
                <Logo to={loc('/admin')} compact />
              </div>
              <p className="hidden font-display text-xl text-cream lg:block">{t('admin.title')}</p>
              <div className="flex items-center gap-2">
                <NavLink to={loc()} className="hidden text-xs text-gold no-underline sm:inline">
                  {t('portal.toSite')}
                </NavLink>
                <LanguageSwitcher light />
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-current/20 px-3 py-1.5 text-xs font-semibold"
                >
                  {t('portal.logout')}
                </button>
              </div>
            </div>
            <nav className="overflow-x-auto lg:hidden">
              <div className="flex gap-1 px-3 pb-2">
                {tabs.map((tab) => (
                  <NavLink
                    key={tab.to}
                    to={loc(`/admin${tab.to}`)}
                    end={tab.to === ''}
                    className={({ isActive }) =>
                      `shrink-0 rounded-full px-3 py-1.5 text-xs no-underline ${
                        isActive ? 'bg-gold text-navy' : 'text-cream/80'
                      }`
                    }
                  >
                    {t(tab.key)}
                  </NavLink>
                ))}
              </div>
            </nav>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-6 pb-16">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  )
}
