import { useTranslation } from 'react-i18next'
import { staff } from '../data/mock'
import { useLang } from '../lib/hooks'
import { asset } from '../lib/paths'
import { Card, Section } from '../components/ui'

export function AboutPage() {
  const { t } = useTranslation()
  const lang = useLang()

  return (
    <>
      <section className="relative h-[38vh] min-h-64 overflow-hidden">
        <img src={asset('images/shabbat-table.png')} alt="" className="h-full w-full object-cover" />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-5 pb-10 text-cream">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold-soft uppercase">{t('about.kicker')}</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-5xl">{t('about.title')}</h1>
          </div>
        </div>
      </section>
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
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}
