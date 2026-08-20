import { useTranslation } from 'react-i18next'
import { gallery, holidays, weekMenu } from '../data/mock'
import { useLang } from '../lib/hooks'
import { asset } from '../lib/paths'
import { Card, Section } from '../components/ui'

export function LifePage() {
  const { t } = useTranslation()
  const lang = useLang()

  return (
    <>
      <section className="relative h-[38vh] min-h-64 overflow-hidden">
        <img src={asset('images/garden-activity.png')} alt="" className="h-full w-full object-cover" />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-5 pb-10 text-cream">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold-soft uppercase">{t('life.kicker')}</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-5xl">{t('life.title')}</h1>
          </div>
        </div>
      </section>
      <Section lead={t('life.lead')} />
      <Section kicker={t('life.gallery')} title={t('life.gallery')}>
        <div className="grid gap-4 md:grid-cols-2">
          {gallery.map((shot) => (
            <figure key={shot.src} className="overflow-hidden rounded-[2rem] bg-white">
              <img src={asset(shot.src)} alt={shot.caption[lang]} className="h-64 w-full object-cover" />
              <figcaption className="px-5 py-3 text-navy">{shot.caption[lang]}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
      <Section kicker={t('life.holidays')} title={t('life.holidays')}>
        <div className="grid gap-3 md:grid-cols-3">
          {holidays.map((day) => (
            <Card key={day.date}>
              <p className="text-sm text-gold">{day.date}</p>
              <p className="mt-1 font-display text-2xl text-navy">{day.title[lang]}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section kicker={t('life.menu')} title={t('life.menu')}>
        <div className="overflow-hidden rounded-3xl bg-white">
          {weekMenu.map((row) => (
            <div key={row.day.en} className="flex items-center justify-between gap-4 border-b border-navy/5 px-5 py-4 last:border-0">
              <span className="font-semibold text-navy">{row.day[lang]}</span>
              <span className="text-muted">{row.dish[lang]}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
