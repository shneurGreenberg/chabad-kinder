import { useTranslation } from 'react-i18next'
import { staff } from '../data/mock'
import { useLang } from '../lib/hooks'
import { Card, CtaBand, PageHero, Section } from '../components/ui'

export function AboutPage() {
  const { t } = useTranslation()
  const lang = useLang()

  return (
    <>
      <PageHero image="images/shabbat-table.png" kicker={t('about.kicker')} title={t('about.title')} />
      <Section lead={t('about.lead')}>
        <div className="grid gap-4 md:grid-cols-3">
          {['a1', 'a2', 'a3'].map((id) => (
            <Card key={id}>
              <p className="text-navy">{t(`about.${id}`)}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section kicker={t('about.staff')} title={t('about.staff')}>
        <div className="grid gap-4 md:grid-cols-3">
          {staff.map((person) => (
            <Card key={person.id} className="bg-navy text-cream">
              <p className="text-sm text-gold">{person.role[lang]}</p>
              <p className="mt-2 font-display text-2xl">{person.name[lang]}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">{person.bio[lang]}</p>
            </Card>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  )
}
