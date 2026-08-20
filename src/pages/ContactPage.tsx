import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Field, Section, inputClass } from '../components/ui'
import { loadJson, saveJson } from '../lib/storage'

export function ContactPage() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    saveJson('contact-messages', [
      ...loadJson<Record<string, string>[]>('contact-messages', []),
      Object.fromEntries(data.entries()) as Record<string, string>,
    ])
    setSent(true)
  }

  return (
    <Section kicker={t('contact.kicker')} title={t('contact.title')} lead={t('contact.lead')}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          {sent ? (
            <p className="text-lg text-navy">{t('contact.sent')}</p>
          ) : (
            <form className="grid gap-4" onSubmit={onSubmit}>
              <Field label={t('contact.name')}>
                <input required name="name" autoComplete="name" className={inputClass} />
              </Field>
              <Field label={t('contact.phone')}>
                <input required name="phone" autoComplete="tel" className={inputClass} />
              </Field>
              <Field label={t('contact.email')}>
                <input required type="email" name="email" autoComplete="email" className={inputClass} />
              </Field>
              <Field label={t('contact.message')}>
                <textarea required name="message" rows={4} className={inputClass} />
              </Field>
              <Button type="submit">{t('contact.send')}</Button>
            </form>
          )}
        </Card>
        <Card className="bg-navy text-cream">
          <p>{t('footer.address')}</p>
          <p className="mt-6 text-cream/70">{t('footer.hours')}</p>
          <p className="mt-2 text-sm text-cream/60">{t('footer.shabbat')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="tel:+97225550148" variant="gold">
              {t('contact.call')}
            </Button>
            <Button href="mailto:office@chabad-kinder.demo" variant="ghost" className="text-cream">
              {t('contact.mail')}
            </Button>
          </div>
          <p className="mt-6 text-sm text-gold">{t('contact.phoneValue')}</p>
          <p className="text-sm text-gold">{t('contact.emailValue')}</p>
        </Card>
      </div>
    </Section>
  )
}
