import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card } from '../../components/ui'
import { useAdmin } from '../../context/AdminContext'
import { invoices } from '../../data/mock'
import { useLoc } from '../../lib/hooks'

export function AdminDashboard() {
  const { t } = useTranslation()
  const loc = useLoc()
  const { store } = useAdmin()
  const active = store.children.filter((c) => c.status === 'active')
  const incoming = store.children.filter((c) => c.status === 'incoming')
  const apps = store.applications.filter((a) => a.status === 'new')
  const present = active.filter((c) => store.attendance[c.id] === 'present').length
  const debt =
    (invoices.noa.tariff + invoices.noa.extras - invoices.noa.paid) +
    Math.max(invoices.yosef.tariff + invoices.yosef.extras - invoices.yosef.paid, 0)

  const cards = [
    { label: t('admin.dash.active'), value: String(active.length), to: '/admin/children' },
    { label: t('admin.dash.incoming'), value: String(incoming.length), to: '/admin/children' },
    { label: t('admin.dash.apps'), value: String(apps.length), to: '/admin/applications' },
    { label: t('admin.dash.present'), value: `${present}/${active.length}`, to: '/admin/attendance' },
    { label: t('admin.dash.staff'), value: String(store.staff.filter((s) => s.active).length), to: '/admin/staff' },
    { label: t('admin.dash.debt'), value: `${debt} ₪`, to: '/admin/finance' },
  ]

  return (
    <div className="grid gap-5">
      <div>
        <p className="text-xs tracking-[0.16em] text-gold uppercase">{t('admin.kicker')}</p>
        <h1 className="font-display text-3xl text-navy">{t('admin.dash.title')}</h1>
        <p className="mt-2 max-w-2xl text-muted">{t('admin.dash.lead')}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} to={loc(card.to)} className="no-underline">
            <Card>
              <p className="text-sm text-muted">{card.label}</p>
              <p className="mt-1 font-display text-3xl text-navy">{card.value}</p>
            </Card>
          </Link>
        ))}
      </div>
      <Card>
        <h2 className="font-display text-xl text-navy">{t('admin.dash.today')}</h2>
        <ul className="mt-3 grid gap-2">
          {apps.slice(0, 3).map((app) => (
            <li key={app.id} className="flex justify-between gap-3 rounded-2xl bg-cream px-4 py-3 text-sm">
              <span>{app.childName} · {app.parentName}</span>
              <Link to={loc('/admin/applications')} className="text-gold">{t('admin.open')}</Link>
            </li>
          ))}
          {apps.length === 0 && <li className="text-muted">{t('admin.empty.apps')}</li>}
        </ul>
      </Card>
    </div>
  )
}
