import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { gallery, news, quotes } from '../data/mock'
import { formatDate } from '../lib/format'
import { useLang, useLoc } from '../lib/hooks'
import { asset } from '../lib/paths'
import { Button, Card, CtaBand, Section } from '../components/ui'

export function HomePage() {
  const { t } = useTranslation()
  const loc = useLoc()
  const lang = useLang()
  const quote = quotes[0]

  return (
    <>
      <section className="relative min-h-[82vh] overflow-hidden">
        <img
          src={asset('images/hero-courtyard.png')}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex min-h-[82vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 text-cream">
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

      <section className="border-b border-navy/5 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n}>
              <p className="font-display text-2xl text-navy">{t(`home.stat${n}n`)}</p>
              <p className="mt-1 text-muted">{t(`home.stat${n}d`)}</p>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <Link to={loc('/gan')} className="group relative min-h-80 overflow-hidden rounded-[2rem] no-underline">
            <img src={asset('images/gan-classroom.png')} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-navy/50" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-cream">
              <p className="font-display text-3xl">{t('home.ganCard')}</p>
              <p className="mt-2 max-w-sm text-cream/85">{t('home.ganText')}</p>
              <p className="mt-4 text-sm font-semibold text-gold">{t('common.learn')} →</p>
            </div>
          </Link>
          <Link to={loc('/school')} className="group relative min-h-80 overflow-hidden rounded-[2rem] no-underline">
            <img src={asset('images/school-classroom.png')} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-navy/50" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-cream">
              <p className="font-display text-3xl">{t('home.schoolCard')}</p>
              <p className="mt-2 max-w-sm text-cream/85">{t('home.schoolText')}</p>
              <p className="mt-4 text-sm font-semibold text-gold">{t('common.learn')} →</p>
            </div>
          </Link>
        </div>
      </Section>

      <Section kicker={t('home.newsKicker')} title={t('home.newsTitle')}>
        <div className="grid gap-4 md:grid-cols-3">
          {news.map((item) => (
            <Card key={item.id}>
              <p className="text-xs tracking-wide text-gold">{formatDate(item.date, lang)}</p>
              <h3 className="mt-2 font-display text-xl text-navy">{item.title[lang]}</h3>
              <p className="mt-2 text-muted">{item.body[lang]}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section kicker={t('home.galleryTitle')} title={t('home.galleryTitle')}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((shot) => (
            <figure key={shot.src} className="overflow-hidden rounded-3xl bg-white">
              <img src={asset(shot.src)} alt={shot.caption[lang]} className="h-48 w-full object-cover md:h-56" />
              <figcaption className="px-3 py-2 text-sm text-muted">{shot.caption[lang]}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6">
          <Button to={loc('/life')} variant="navy">
            {t('nav.life')}
          </Button>
        </div>
      </Section>

      <Section kicker={t('home.valuesTitle')} title={t('home.valuesTitle')}>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="bg-navy text-cream">
              <h3 className="font-display text-2xl text-gold">{t(`home.v${n}t`)}</h3>
              <p className="mt-2 text-cream/80">{t(`home.v${n}d`)}</p>
            </Card>
          ))}
        </div>
        <blockquote className="mt-10 rounded-[2rem] bg-white px-8 py-10">
          <p className="font-display text-2xl leading-relaxed text-navy md:text-3xl">“{quote.text[lang]}”</p>
          <footer className="mt-4 text-sm text-gold">{quote.by[lang]}</footer>
        </blockquote>
      </Section>

      <CtaBand />
    </>
  )
}
