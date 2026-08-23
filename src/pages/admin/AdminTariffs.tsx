import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Field, inputClass } from '../../components/ui'
import { useAdmin } from '../../context/AdminContext'
import { labelOf, type TariffUnit } from '../../data/admin'
import { formatMoney } from '../../lib/format'
import { useLang } from '../../lib/hooks'

export function AdminTariffs() {
  const { t } = useTranslation()
  const lang = useLang()
  const { store, addTariff, setTariff } = useAdmin()
  const [open, setOpen] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    addTariff({
      name: String(data.get('name') || ''),
      amount: Number(data.get('amount') || 0),
      unit: String(data.get('unit') || 'month') as TariffUnit,
      kind: 'custom',
    })
    setOpen(false)
    event.currentTarget.reset()
  }

  function unitKey(unit: TariffUnit) {
    if (unit === 'hour') return 'common.perHour'
    if (unit === 'day') return 'common.perDay'
    return 'common.perMonth'
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-navy">{t('admin.nav.tariffs')}</h1>
          <p className="mt-1 text-muted">{t('admin.tariffs.lead')}</p>
        </div>
        <Button onClick={() => setOpen((v) => !v)}>{t('admin.tariffs.add')}</Button>
      </div>
      {open && (
        <Card>
          <form className="grid gap-3 md:grid-cols-3" onSubmit={onSubmit}>
            <Field label={t('admin.tariffs.name')}>
              <input required name="name" className={inputClass} />
            </Field>
            <Field label={t('admin.tariffs.amount')}>
              <input required name="amount" type="number" min={0} className={inputClass} />
            </Field>
            <Field label={t('admin.tariffs.unit')}>
              <select name="unit" className={inputClass}>
                <option value="month">{t('common.perMonth')}</option>
                <option value="hour">{t('common.perHour')}</option>
                <option value="day">{t('common.perDay')}</option>
              </select>
            </Field>
            <Button type="submit">{t('admin.save')}</Button>
          </form>
        </Card>
      )}
      <div className="grid gap-3 md:grid-cols-2">
        {store.tariffs.map((row) => (
          <Card key={row.id}>
            <p className="font-display text-xl text-navy">{labelOf(row.name, lang)}</p>
            <p className="mt-2 text-gold">
              {formatMoney(row.amount, lang)} {t(unitKey(row.unit))}
            </p>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <Field label={t('admin.tariffs.amount')}>
                <input
                  type="number"
                  className={inputClass}
                  defaultValue={row.amount}
                  onBlur={(event) => setTariff(row.id, { amount: Number(event.target.value) || row.amount })}
                />
              </Field>
              <Button variant="ghost" onClick={() => setTariff(row.id, { active: !row.active })}>
                {row.active ? t('admin.tariffs.pause') : t('admin.tariffs.resume')}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
