import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { gallery, news } from '../data/mock'
import { useLang, useLoc } from '../lib/hooks'
import { asset } from '../lib/paths'
import { Button, Card, Section } from '../components/ui'

export function HomePage() {
  const { t } = useTranslation()
  const loc = useLoc()
  const lang = useLang()

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden">
        <img
          src={asset('images/hero-courtyard.png')}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 text-cream">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-soft uppercase">{t('home.kicker')}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight font-semibold md:text-6xl">
            {t('home.title')}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">{t('home.lead')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={loc('/apply')}>{t('home.ctaApply')}</Button>
            <Button to={loc('/login')} variant="cream">
              {t('home.ctaPortal')}
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <Link to={loc('/gan')} className="group relative min-h-72 overflow-hidden rounded-[2rem] no-underline">
            <img src={asset('images/gan-classroom.png')} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-navy/45" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-cream">
              <p className="font-display text-3xl">{t('home.ganCard')}</p>
              <p className="mt-2 max-w-sm text-cream/85">{t('home.ganText')}</p>
            </div>
          </Link>
          <Link to={loc('/school')} className="group relative min-h-72 overflow-hidden rounded-[2rem] no-underline">
            <img src={asset('images/school-classroom.png')} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-navy/45" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-cream">
              <p className="font-display text-3xl">{t('home.schoolCard')}</p>
              <p className="mt-2 max-w-sm text-cream/85">{t('home.schoolText')}</p>
            </div>
          </Link>
        </div>
      </Section>

      <Section kicker={t('home.newsTitle')} title={t('home.newsTitle')}>
        <div className="grid gap-4 md:grid-cols-3">
          {news.map((item) => (
            <Card key={item.id}>
              <p className="text-xs tracking-wide text-gold">{item.date}</p>
              <h3 className="mt-2 font-display text-xl text-navy">{item.title[lang]}</h3>
              <p className="mt-2 text-muted">{item.body[lang]}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section kicker={t('home.galleryTitle')} title={t('home.galleryTitle')}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((shot) => (
            <figure key={shot.src} className="overflow-hidden rounded-3xl">
              <img src={asset(shot.src)} alt={shot.caption[lang]} className="h-48 w-full object-cover md:h-56" />
              <figcaption className="bg-white px-3 py-2 text-sm text-muted">{shot.caption[lang]}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="bg-navy text-cream">
              <h3 className="font-display text-2xl text-gold">{t(`home.v${n}t`)}</h3>
              <p className="mt-2 text-cream/80">{t(`home.v${n}d`)}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}
