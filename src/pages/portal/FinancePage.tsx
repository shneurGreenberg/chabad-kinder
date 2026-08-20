import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChildSwitcher } from '../../components/ChildSwitcher'
import { Button, Card } from '../../components/ui'
import { useFamily } from '../../context/FamilyContext'
import { children, invoices, paymentsSeed, tariffs } from '../../data/mock'
import { formatDate, formatMoney } from '../../lib/format'
import { useLang } from '../../lib/hooks'
import { loadJson, saveJson } from '../../lib/storage'

type ExtraPayment = { id: string; date: string; amount: number; note: string; receipt: boolean }

export function FinancePage() {
  const { t } = useTranslation()
  const lang = useLang()
  const { childId } = useFamily()
  const extras = loadJson<ExtraPayment[]>('payments', [])
  const [receiptId, setReceiptId] = useState<string | null>(null)
  const child = children.find((item) => item.id === childId) ?? children[0]
  const invoice = invoices[childId as keyof typeof invoices] ?? invoices.noa
  const extraPaid = extras.filter((p) => p.id.startsWith(childId)).reduce((sum, p) => sum + p.amount, 0)
  const billed = invoice.tariff + invoice.extras
  const paid = invoice.paid + extraPaid
  const delta = billed - paid

  const history = useMemo(() => {
    const seeded = paymentsSeed.filter((p) =>
      childId === 'noa' ? p.note.en.includes('Noa') : p.note.en.includes('Yosef'),
    )
    return [
      ...seeded.map((p) => ({ ...p, extra: false })),
      ...extras.filter((p) => p.id.startsWith(childId)).map((p) => ({
        id: p.id,
        date: p.date,
        amount: p.amount,
        note: { he: p.note, en: p.note, ru: p.note },
        extra: true,
      })),
    ]
  }, [childId, extras])

  function pay() {
    if (delta <= 0) return
    const payment: ExtraPayment = {
      id: `${childId}-${Date.now()}`,
      date: '2026-08-20',
      amount: delta,
      note: t('portal.payNow'),
      receipt: true,
    }
    saveJson('payments', [...extras, payment])
    setReceiptId(payment.id)
  }

  return (
    <div className="grid gap-5">
      <ChildSwitcher />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-muted">{t('portal.tariff')}</p>
          <p className="mt-1 font-display text-2xl text-navy">
            {child.track === 'gan' ? t('gan.full') : t('wizard.school')}
          </p>
          <p className="text-gold">
            {formatMoney(tariffs[child.tariffId as keyof typeof tariffs].amount, lang)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted">{t('portal.invoice')}</p>
          <p className="mt-1 font-display text-2xl text-navy">{formatMoney(billed, lang)}</p>
          <p className="text-sm text-muted">
            {t('portal.visits')} {formatMoney(invoice.tariff, lang)} · {t('portal.extras')} {formatMoney(invoice.extras, lang)}
          </p>
        </Card>
        <Card className={delta > 0 ? 'bg-terracotta text-cream' : 'bg-navy text-cream'}>
          <p className="text-sm opacity-80">{delta > 0 ? t('portal.debt') : t('portal.overpay')}</p>
          <p className="mt-1 font-display text-3xl">{formatMoney(Math.abs(delta), lang)}</p>
        </Card>
      </div>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl text-navy">{t('portal.history')}</h2>
          {delta > 0 && <Button onClick={pay}>{t('portal.payNow')}</Button>}
        </div>
        <ul className="mt-4 grid gap-2">
          {history.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-cream px-4 py-3">
              <span>
                {formatDate(row.date, lang)} · {row.note[lang]}
              </span>
              <span className="font-semibold text-navy">{formatMoney(row.amount, lang)}</span>
            </li>
          ))}
        </ul>
        {receiptId && (
          <div className="mt-4 rounded-2xl border border-gold bg-white p-4">
            <p className="text-sm text-gold">{t('portal.receipt')}</p>
            <p className="mt-1 text-navy">
              {t('portal.paid')} · {receiptId}
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
