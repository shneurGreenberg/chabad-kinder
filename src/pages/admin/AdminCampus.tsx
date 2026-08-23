import { type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Field, inputClass } from '../../components/ui'
import { useAdmin } from '../../context/AdminContext'
import { labelOf } from '../../data/admin'
import { formatDate } from '../../lib/format'
import { useLang } from '../../lib/hooks'

export function AdminCampus() {
  const { t } = useTranslation()
  const lang = useLang()
  const { store, addNews, setMenuDish } = useAdmin()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    addNews({
      title: String(data.get('title') || ''),
      body: String(data.get('body') || ''),
      date: new Date().toISOString().slice(0, 10),
    })
    event.currentTarget.reset()
  }

  return (
    <div className="grid gap-6">
      <h1 className="font-display text-3xl text-navy">{t('admin.nav.campus')}</h1>
      <Card>
        <h2 className="font-display text-xl text-navy">{t('admin.campus.publish')}</h2>
        <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
          <Field label={t('admin.campus.title')}>
            <input required name="title" className={inputClass} />
          </Field>
          <Field label={t('contact.message')}>
            <textarea required name="body" rows={3} className={inputClass} />
          </Field>
          <Button type="submit">{t('admin.save')}</Button>
        </form>
        <ul className="mt-6 grid gap-2">
          {store.news.map((item) => (
            <li key={item.id} className="rounded-2xl bg-cream px-4 py-3">
              <p className="text-xs text-gold">{formatDate(item.date, lang)}</p>
              <p className="font-semibold text-navy">{item.title}</p>
              <p className="text-sm text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-navy">{t('admin.campus.menu')}</h2>
        <div className="mt-4 grid gap-3">
          {store.menu.map((row) => (
            <label key={row.id} className="grid gap-1 md:grid-cols-[8rem_1fr] md:items-center">
              <span className="font-semibold text-navy">{labelOf(row.day, lang)}</span>
              <input
                className={inputClass}
                defaultValue={labelOf(row.dish, lang)}
                onBlur={(event) => setMenuDish(row.id, event.target.value)}
              />
            </label>
          ))}
        </div>
      </Card>
    </div>
  )
}
