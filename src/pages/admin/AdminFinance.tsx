import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card } from '../../components/ui'
import { useAdmin } from '../../context/AdminContext'
import { invoices } from '../../data/mock'
import { labelOf } from '../../data/admin'
import { formatMoney } from '../../lib/format'
import { useLang } from '../../lib/hooks'
import { loadJson, saveJson } from '../../lib/storage'

type Mark = { id: string; amount: number }

export function AdminFinance() {
  const { t } = useTranslation()
  const lang = useLang()
  const { store } = useAdmin()
  const marks = loadJson<Mark[]>('admin-finance-marks', [])
  const [tick, setTick] = useState(0)

  const rows = store.children
    .filter((child) => child.status === 'active')
    .map((child) => {
      const invoice = invoices[child.id as keyof typeof invoices]
      const billed = invoice ? invoice.tariff + invoice.extras : 0
      const paid = (invoice?.paid ?? 0) + marks.filter((m) => m.id === child.id).reduce((s, m) => s + m.amount, 0)
      return { child, billed, paid, due: billed - paid }
    })

  function collect(id: string, amount: number) {
    if (amount <= 0) return
    saveJson('admin-finance-marks', [...marks, { id, amount }])
    setTick((n) => n + 1)
  }

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="font-display text-3xl text-navy">{t('admin.nav.finance')}</h1>
        <p className="mt-1 text-muted">{t('admin.finance.lead')}</p>
        <p className="sr-only">{tick}</p>
      </div>
      {rows.map((row) => (
        <Card key={row.child.id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-xl text-navy">{labelOf(row.child.name, lang)}</p>
              <p className="text-sm text-muted">
                {t('portal.invoice')} {formatMoney(row.billed, lang)} · {t('portal.paid')} {formatMoney(row.paid, lang)}
              </p>
            </div>
            <div className="text-end">
              <p className={`font-display text-2xl ${row.due > 0 ? 'text-terracotta' : 'text-navy'}`}>
                {formatMoney(Math.abs(row.due), lang)}
              </p>
              <p className="text-xs text-muted">{row.due > 0 ? t('portal.debt') : t('portal.overpay')}</p>
              {row.due > 0 && (
                <Button className="mt-2" onClick={() => collect(row.child.id, row.due)}>
                  {t('admin.finance.collect')}
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
