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
                <input required name="name" className={inputClass} />
              </Field>
              <Field label={t('contact.phone')}>
                <input required name="phone" className={inputClass} />
              </Field>
              <Field label={t('contact.email')}>
                <input required type="email" name="email" className={inputClass} />
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
          <p className="mt-2">{t('contact.phoneValue')}</p>
          <p className="mt-2">{t('contact.emailValue')}</p>
          <p className="mt-6 text-cream/70">{t('footer.hours')}</p>
        </Card>
      </div>
    </Section>
  )
}
