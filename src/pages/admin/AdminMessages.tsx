import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, inputClass } from '../../components/ui'
import { seedMessages, type Text } from '../../data/mock'
import { useLang } from '../../lib/hooks'
import { loadJson, saveJson } from '../../lib/storage'

type Msg = { id: string; from: 'staff' | 'parent'; text: Text; at: string }

export function AdminMessages() {
  const { t } = useTranslation()
  const lang = useLang()
  const stored = loadJson<{ admin: Msg[] }>('messages', seedMessages)
  const [thread, setThread] = useState<Msg[]>(stored.admin)

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const text = String(data.get('text') || '').trim()
    if (!text) return
    const msg: Msg = {
      id: String(Date.now()),
      from: 'staff',
      text: { he: text, en: text, ru: text },
      at: new Date().toISOString(),
    }
    const next = [...thread, msg]
    setThread(next)
    saveJson('messages', { ...stored, admin: next })
    event.currentTarget.reset()
  }

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="font-display text-3xl text-navy">{t('admin.nav.messages')}</h1>
        <p className="mt-1 text-muted">{t('admin.messages.lead')}</p>
      </div>
      <div className="rounded-[2rem] bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-gold">{t('portal.adminChat')} · {t('admin.messages.family')}</p>
        <div className="grid max-h-[50vh] gap-3 overflow-y-auto">
          {thread.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === 'staff' ? 'justify-end' : 'justify-start'}`}>
              <p
                className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm ${
                  msg.from === 'staff' ? 'bg-navy text-cream' : 'bg-cream text-navy'
                }`}
              >
                {msg.text[lang]}
              </p>
            </div>
          ))}
        </div>
        <form className="mt-4 flex gap-2" onSubmit={send}>
          <input name="text" className={inputClass} placeholder={t('portal.write')} />
          <Button type="submit">{t('portal.send')}</Button>
        </form>
      </div>
    </div>
  )
}
