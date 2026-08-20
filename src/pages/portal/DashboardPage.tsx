import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  children,
  news,
  reminders,
  upcoming,
  weekMenu,
} from '../../data/mock'
import { useLang, useLoc } from '../../lib/hooks'
import { Card } from '../../components/ui'

export function DashboardPage() {
  const { t } = useTranslation()
  const lang = useLang()
  const loc = useLoc()
  const today = weekMenu[new Date().getDay() === 6 ? 0 : Math.min(new Date().getDay(), 5)]
  const [childId, setChildId] = useState(children[0].id)

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {children.map((child) => (
          <button
            key={child.id}
            type="button"
            onClick={() => setChildId(child.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              childId === child.id ? 'bg-navy text-cream' : 'bg-white text-navy'
            }`}
          >
            {child.name[lang]}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-display text-2xl text-navy">{t('portal.news')}</h2>
          <ul className="mt-3 grid gap-3">
            {news.map((item) => (
              <li key={item.id}>
                <p className="text-xs text-gold">{item.date}</p>
                <p className="font-medium text-navy">{item.title[lang]}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-2xl text-navy">{t('portal.reminders')}</h2>
          <ul className="mt-3 grid gap-2">
            {reminders.map((item) => (
              <li key={item.id} className="rounded-2xl bg-cream px-4 py-3 text-navy">
                {item.title[lang]}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <h2 className="font-display text-xl text-navy">{t('portal.fromTeachers')}</h2>
          <p className="mt-2 text-muted">
            {children.find((c) => c.id === childId)?.teacher[lang]}
          </p>
          <Link to={loc('/portal/messages')} className="mt-3 inline-block text-sm font-semibold text-gold">
            {t('portal.messages')}
          </Link>
        </Card>
        <Card>
          <h2 className="font-display text-xl text-navy">{t('portal.upcoming')}</h2>
          <ul className="mt-2 grid gap-2 text-sm">
            {upcoming.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span>{item.title[lang]}</span>
                <span className="text-gold">{item.when}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="bg-navy text-cream">
          <h2 className="font-display text-xl text-gold">{t('portal.todayMenu')}</h2>
          <p className="mt-2">{today.dish[lang]}</p>
        </Card>
      </div>
    </div>
  )
}
