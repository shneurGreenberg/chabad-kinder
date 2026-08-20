import { useTranslation } from 'react-i18next'
import { useLoc } from '../lib/hooks'
import { asset } from '../lib/paths'
import { Button, Card, Section } from '../components/ui'

export function SchoolPage() {
  const { t } = useTranslation()
  const loc = useLoc()

  return (
    <>
      <section className="relative h-[42vh] min-h-72 overflow-hidden">
        <img src={asset('images/school-classroom.png')} alt="" className="h-full w-full object-cover" />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-5 pb-10 text-cream">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold-soft uppercase">{t('school.kicker')}</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-5xl">{t('school.title')}</h1>
          </div>
        </div>
      </section>
      <Section lead={t('school.lead')}>
        <div className="grid gap-4 md:grid-cols-3">
          {['g1', 'g2', 'g3'].map((id) => (
            <Card key={id}>
              <p className="font-display text-2xl text-navy">{t(`school.${id}`)}</p>
              <p className="mt-2 text-muted">{t(`school.${id}d`)}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section kicker={t('school.valuesTitle')} title={t('school.valuesTitle')}>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="bg-navy text-cream">
              <p className="font-display text-2xl text-gold">{t(`school.v${n}`)}</p>
              <p className="mt-2 text-cream/80">{t(`school.v${n}d`)}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section kicker={t('school.scheduleTitle')} title={t('school.scheduleTitle')}>
        <div className="grid gap-4 md:grid-cols-3">
          {['sunThu', 'fri', 'sat'].map((id) => (
            <Card key={id}>
              <p className="font-display text-2xl text-navy">{t(`school.${id}`)}</p>
              <p className="mt-2 text-muted">{t(`school.${id}D`)}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button to={loc('/apply')}>{t('nav.apply')}</Button>
        </div>
      </Section>
    </>
  )
}
