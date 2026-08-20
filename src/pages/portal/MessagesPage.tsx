import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { seedMessages, type Text } from '../../data/mock'
import { useLang } from '../../lib/hooks'
import { loadJson, saveJson } from '../../lib/storage'
import { Button, inputClass } from '../../components/ui'

type Channel = 'teacher' | 'admin'
type Msg = { id: string; from: 'staff' | 'parent'; text: Text; at: string; file?: string }

export function MessagesPage() {
  const { t } = useTranslation()
  const lang = useLang()
  const [channel, setChannel] = useState<Channel>('teacher')
  const [fileName, setFileName] = useState('')
  const stored = loadJson<Record<Channel, Msg[]>>('messages', seedMessages)
  const [messages, setMessages] = useState(stored)

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const text = String(data.get('text') || '').trim()
    if (!text && !fileName) return
    const msg: Msg = {
      id: String(Date.now()),
      from: 'parent',
      text: { he: text, en: text, ru: text },
      at: new Date().toISOString(),
      file: fileName || undefined,
    }
    const next = { ...messages, [channel]: [...messages[channel], msg] }
    setMessages(next)
    saveJson('messages', next)
    setFileName('')
    event.currentTarget.reset()
  }

  return (
    <div className="grid gap-4">
      <div className="flex gap-2">
        {(['teacher', 'admin'] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setChannel(id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              channel === id ? 'bg-navy text-cream' : 'bg-white text-navy'
            }`}
          >
            {id === 'teacher' ? t('portal.teacherChat') : t('portal.adminChat')}
          </button>
        ))}
      </div>
      <div className="rounded-[2rem] bg-white p-4 shadow-sm">
        <div className="grid max-h-[50vh] gap-3 overflow-y-auto">
          {messages[channel].map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === 'parent' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm ${
                  msg.from === 'parent' ? 'bg-navy text-cream' : 'bg-cream text-navy'
                }`}
              >
                <p>{msg.text[lang]}</p>
                {msg.file && <p className="mt-1 opacity-70">{msg.file}</p>}
              </div>
            </div>
          ))}
        </div>
        <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={send}>
          <input name="text" className={inputClass} placeholder={t('portal.write')} />
          <label className="cursor-pointer rounded-full bg-cream px-4 py-3 text-sm font-semibold text-navy">
            {t('portal.attach')}
            <input
              type="file"
              className="hidden"
              onChange={(event) => setFileName(event.target.files?.[0]?.name || '')}
            />
          </label>
          <Button type="submit">{t('portal.send')}</Button>
        </form>
        {fileName && <p className="mt-2 text-sm text-gold">{fileName}</p>}
      </div>
    </div>
  )
}
