import { useTranslation } from 'react-i18next'
import { staff, tariffs, weekMenu } from '../data/mock'
import { formatMoney } from '../lib/format'
import { useLang, useLoc } from '../lib/hooks'
import { Button, Card, CtaBand, PageHero, Section } from '../components/ui'

const tracks = [
  { key: 'full' as const, unit: 'perMonth' },
  { key: 'half' as const, unit: 'perMonth' },
  { key: 'hourly' as const, unit: 'perHour' },
  { key: 'emergency' as const, unit: 'perDay' },
]

const day = ['d1', 'd2', 'd3', 'd4', 'd5'] as const

export function GanPage() {
  const { t } = useTranslation()
  const loc = useLoc()
  const lang = useLang()

  return (
    <>
      <PageHero image="images/gan-classroom.png" kicker={t('gan.kicker')} title={t('gan.title')} lead={t('gan.ageRange')} />
      <Section lead={t('gan.lead')}>
        <div className="grid gap-4 md:grid-cols-2">
          {tracks.map((track) => (
            <Card key={track.key} className="flex flex-col justify-between">
              <div>
                <p className="font-display text-2xl text-navy">{t(`gan.${track.key}`)}</p>
                <p className="mt-2 text-muted">{t(`gan.${track.key}D`)}</p>
              </div>
              <p className="mt-4 text-sm font-semibold text-gold">
                {formatMoney(tariffs[track.key].amount, lang)} {t(`common.${track.unit}`)}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button to={loc('/apply')}>{t('nav.apply')}</Button>
        </div>
      </Section>
      <Section kicker={t('gan.dayTitle')} title={t('gan.dayTitle')}>
        <ol className="grid gap-3">
          {day.map((id) => (
            <li key={id} className="flex gap-4 rounded-2xl bg-white px-5 py-4">
              <span className="w-16 shrink-0 font-semibold text-gold">{t(`gan.${id}t`)}</span>
              <span className="text-navy">{t(`gan.${id}d`)}</span>
            </li>
          ))}
        </ol>
      </Section>
      <Section kicker={t('gan.menuTitle')} title={t('gan.menuTitle')} lead={t('gan.kitchenLead')}>
        <div className="overflow-hidden rounded-3xl bg-white">
          {weekMenu.map((row) => (
            <div key={row.day.en} className="flex items-center justify-between gap-4 border-b border-navy/5 px-5 py-4 last:border-0">
              <span className="font-semibold text-navy">{row.day[lang]}</span>
              <span className="text-muted">{row.dish[lang]}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section kicker={t('gan.staffTitle')} title={t('gan.staffTitle')}>
        <div className="grid gap-4 md:grid-cols-3">
          {staff.map((person) => (
            <Card key={person.id}>
              <p className="text-sm text-gold">{person.role[lang]}</p>
              <p className="mt-1 font-display text-2xl text-navy">{person.name[lang]}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{person.bio[lang]}</p>
            </Card>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  )
}
