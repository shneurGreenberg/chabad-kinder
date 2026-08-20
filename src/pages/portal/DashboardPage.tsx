import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChildSwitcher } from '../../components/ChildSwitcher'
import { Card } from '../../components/ui'
import { useFamily } from '../../context/FamilyContext'
import { children, news, reminders, upcoming, weekMenu } from '../../data/mock'
import { formatDate } from '../../lib/format'
import { useLang, useLoc } from '../../lib/hooks'

export function DashboardPage() {
  const { t } = useTranslation()
  const lang = useLang()
  const loc = useLoc()
  const { childId } = useFamily()
  const weekday = new Date().getDay()
  const menuIndex = weekday === 6 ? 5 : Math.min(Math.max(weekday, 0), 5)
  const today = weekMenu[menuIndex]
  const child = children.find((item) => item.id === childId) ?? children[0]
  const childUpcoming = upcoming.filter((item) => item.childId === childId)

  return (
    <div className="grid gap-5">
      <ChildSwitcher />
      <div className="grid gap-3 sm:grid-cols-3">
        <Link to={loc('/portal/attendance')} className="rounded-2xl bg-white px-4 py-4 text-sm font-semibold text-navy no-underline shadow-sm">
          {t('portal.reportAbsence')}
        </Link>
        <Link to={loc('/portal/finance')} className="rounded-2xl bg-white px-4 py-4 text-sm font-semibold text-navy no-underline shadow-sm">
          {t('portal.finance')}
        </Link>
        <Link to={loc('/portal/photos')} className="rounded-2xl bg-white px-4 py-4 text-sm font-semibold text-navy no-underline shadow-sm">
          {t('portal.photos')}
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-display text-2xl text-navy">{t('portal.news')}</h2>
          <ul className="mt-3 grid gap-3">
            {news.map((item) => (
              <li key={item.id}>
                <p className="text-xs text-gold">{formatDate(item.date, lang)}</p>
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
          <p className="mt-2 text-muted">{child.teacher[lang]}</p>
          <Link to={loc('/portal/messages')} className="mt-3 inline-block text-sm font-semibold text-gold">
            {t('portal.messages')}
          </Link>
        </Card>
        <Card>
          <h2 className="font-display text-xl text-navy">{t('portal.upcoming')}</h2>
          <ul className="mt-2 grid gap-2 text-sm">
            {childUpcoming.map((item) => (
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
