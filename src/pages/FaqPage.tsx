import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CtaBand, Section } from '../components/ui'

const items = ['1', '2', '3', '4', '5', '6'] as const

export function FaqPage() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<string | null>('1')

  return (
    <>
      <Section kicker={t('faq.kicker')} title={t('faq.title')}>
        <div className="grid gap-3">
          {items.map((id) => {
            const expanded = open === id
            return (
              <Card key={id} className="p-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                  onClick={() => setOpen(expanded ? null : id)}
                  aria-expanded={expanded}
                >
                  <span className="font-display text-xl text-navy">{t(`faq.q${id}`)}</span>
                  <span className="text-gold">{expanded ? '–' : '+'}</span>
                </button>
                {expanded && <p className="px-6 pb-5 text-muted">{t(`faq.a${id}`)}</p>}
              </Card>
            )
          })}
        </div>
      </Section>
      <CtaBand />
    </>
  )
}
