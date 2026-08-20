import { useTranslation } from 'react-i18next'
import { staff } from '../data/mock'
import { useLang, useLoc } from '../lib/hooks'
import { asset } from '../lib/paths'
import { Button, Card, Section } from '../components/ui'

const tracks = [
  { key: 'full', price: '2,800 ₪' },
  { key: 'half', price: '1,900 ₪' },
  { key: 'hourly', price: '80 ₪' },
  { key: 'emergency', price: '150 ₪' },
] as const

const day = ['d1', 'd2', 'd3', 'd4', 'd5'] as const

export function GanPage() {
  const { t } = useTranslation()
  const loc = useLoc()
  const lang = useLang()

  return (
    <>
      <section className="relative h-[42vh] min-h-72 overflow-hidden">
        <img src={asset('images/gan-classroom.png')} alt="" className="h-full w-full object-cover" />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-5 pb-10 text-cream">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold-soft uppercase">{t('gan.kicker')}</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-5xl">{t('gan.title')}</h1>
          </div>
        </div>
      </section>
      <Section lead={t('gan.lead')}>
        <div className="grid gap-4 md:grid-cols-2">
          {tracks.map((track) => (
            <Card key={track.key}>
              <p className="font-display text-2xl text-navy">{t(`gan.${track.key}`)}</p>
              <p className="mt-2 text-muted">{t(`gan.${track.key}D`)}</p>
              <p className="mt-4 text-sm font-semibold text-gold">{track.price}</p>
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
              <span className="w-16 font-semibold text-gold">{t(`gan.${id}t`)}</span>
              <span className="text-navy">{t(`gan.${id}d`)}</span>
            </li>
          ))}
        </ol>
      </Section>
      <Section kicker={t('gan.staffTitle')} title={t('gan.staffTitle')}>
        <div className="grid gap-4 md:grid-cols-3">
          {staff.map((person) => (
            <Card key={person.id}>
              <p className="text-sm text-gold">{person.role[lang]}</p>
              <p className="mt-1 font-display text-2xl text-navy">{person.name[lang]}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}
