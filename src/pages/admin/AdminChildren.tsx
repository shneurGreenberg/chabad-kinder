import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Field, inputClass } from '../../components/ui'
import { useAdmin } from '../../context/AdminContext'
import { labelOf, type ChildStatus } from '../../data/admin'
import { formatDate } from '../../lib/format'
import { useLang } from '../../lib/hooks'

const tabs: ChildStatus[] = ['active', 'incoming', 'alumni']

export function AdminChildren() {
  const { t } = useTranslation()
  const lang = useLang()
  const { store, addChild, setChildStatus } = useAdmin()
  const [tab, setTab] = useState<ChildStatus>('active')
  const [open, setOpen] = useState(false)
  const rows = store.children.filter((child) => child.status === tab)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    addChild({
      name: String(data.get('name') || ''),
      track: data.get('track') === 'school' ? 'school' : 'gan',
      tariffId: String(data.get('tariffId') || 'full'),
      birthDate: String(data.get('birthDate') || ''),
      parentName: String(data.get('parentName') || ''),
      parentPhone: String(data.get('parentPhone') || ''),
      medical: String(data.get('medical') || ''),
      group: data.get('track') === 'school' ? 'school' : 'gan',
      teacher: String(data.get('teacher') || ''),
      status: 'incoming',
    })
    setOpen(false)
    setTab('incoming')
    event.currentTarget.reset()
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-navy">{t('admin.nav.children')}</h1>
        <Button onClick={() => setOpen((v) => !v)}>{t('admin.children.register')}</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === id ? 'bg-navy text-cream' : 'bg-white text-navy'
            }`}
          >
            {t(`admin.children.${id}`)} ({store.children.filter((c) => c.status === id).length})
          </button>
        ))}
      </div>
      {open && (
        <Card>
          <form className="grid gap-3 md:grid-cols-2" onSubmit={onSubmit}>
            <Field label={t('admin.children.childName')}>
              <input required name="name" className={inputClass} />
            </Field>
            <Field label={t('wizard.parentName')}>
              <input required name="parentName" className={inputClass} />
            </Field>
            <Field label={t('contact.phone')}>
              <input required name="parentPhone" className={inputClass} />
            </Field>
            <Field label={t('portal.birthDate')}>
              <input name="birthDate" type="date" className={inputClass} />
            </Field>
            <Field label={t('admin.children.track')}>
              <select name="track" className={inputClass}>
                <option value="gan">{t('wizard.gan')}</option>
                <option value="school">{t('wizard.school')}</option>
              </select>
            </Field>
            <Field label={t('portal.tariff')}>
              <select name="tariffId" className={inputClass}>
                {store.tariffs.filter((row) => row.active).map((row) => (
                  <option key={row.id} value={row.id}>{labelOf(row.name, lang)}</option>
                ))}
              </select>
            </Field>
            <Field label={t('portal.medical')}>
              <input name="medical" className={inputClass} />
            </Field>
            <Field label={t('admin.children.teacher')}>
              <input name="teacher" className={inputClass} />
            </Field>
            <div className="md:col-span-2">
              <Button type="submit">{t('admin.save')}</Button>
            </div>
          </form>
        </Card>
      )}
      <div className="grid gap-3">
        {rows.map((child) => (
          <Card key={child.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl text-navy">{labelOf(child.name, lang)}</p>
                <p className="mt-1 text-sm text-muted">
                  {t(`wizard.${child.track}`)} · {labelOf(child.parentName, lang)} · {child.parentPhone}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {child.birthDate ? formatDate(child.birthDate, lang) : '—'} · {labelOf(child.medical, lang)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tab === 'incoming' && (
                  <Button onClick={() => setChildStatus(child.id, 'active')}>{t('admin.children.accept')}</Button>
                )}
                {tab === 'active' && (
                  <Button variant="ghost" onClick={() => setChildStatus(child.id, 'alumni')}>
                    {t('admin.children.graduate')}
                  </Button>
                )}
                {tab === 'alumni' && (
                  <Button variant="navy" onClick={() => setChildStatus(child.id, 'active')}>
                    {t('admin.children.restore')}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
        {rows.length === 0 && <p className="text-muted">{t('admin.empty.generic')}</p>}
      </div>
    </div>
  )
}
