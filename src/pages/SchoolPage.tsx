import { useTranslation } from 'react-i18next'
import { Button, Card, CtaBand, PageHero, Section } from '../components/ui'
import { useLoc } from '../lib/hooks'

export function SchoolPage() {
  const { t } = useTranslation()
  const loc = useLoc()

  return (
    <>
      <PageHero image="images/school-classroom.png" kicker={t('school.kicker')} title={t('school.title')} lead={t('school.priceNote')} />
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
      <CtaBand />
    </>
  )
}
