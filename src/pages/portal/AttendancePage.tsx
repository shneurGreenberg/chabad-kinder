import { useMemo, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { attendanceSeed, children, type AttendanceStatus } from '../../data/mock'
import { useLang } from '../../lib/hooks'
import { loadJson, saveJson } from '../../lib/storage'
import { Button, Card, Field, inputClass } from '../../components/ui'

type Report = { childId: string; date: string; reason: AttendanceStatus; file?: string }

const weekdayLabels: Record<string, string[]> = {
  he: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ru: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
}

export function AttendancePage() {
  const { t } = useTranslation()
  const lang = useLang()
  const [childId, setChildId] = useState(children[0].id)
  const [saved, setSaved] = useState(false)
  const [fileName, setFileName] = useState('')
  const reports = loadJson<Report[]>('absence-reports', [])

  const days = useMemo(() => {
    const seed = attendanceSeed[childId as keyof typeof attendanceSeed] ?? attendanceSeed.noa
    const overlay = Object.fromEntries(
      reports.filter((r) => r.childId === childId).map((r) => [r.date, r.reason]),
    )
    return seed.map((row) => ({ ...row, status: overlay[row.date] ?? row.status }))
  }, [childId, reports])

  function statusClass(status: AttendanceStatus) {
    if (status === 'present') return 'bg-navy text-cream'
    if (status === 'sick') return 'bg-terracotta text-cream'
    if (status === 'vacation') return 'bg-gold text-navy'
    if (status === 'absent') return 'bg-gold-soft text-navy'
    return 'bg-cream text-muted'
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: Report = {
      childId,
      date: String(data.get('date')),
      reason: String(data.get('reason')) as AttendanceStatus,
      file: fileName || undefined,
    }
    saveJson('absence-reports', [...reports, next])
    setSaved(true)
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {children.map((child) => (
          <button
            key={child.id}
            type="button"
            onClick={() => setChildId(child.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              childId === child.id ? 'bg-navy text-cream' : 'bg-white text-navy'
            }`}
          >
            {child.name[lang]}
          </button>
        ))}
      </div>
      <Card>
        <h1 className="font-display text-2xl text-navy">{t('portal.attendance')}</h1>
        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold text-muted">
          {weekdayLabels[lang].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {days.map((day) => {
            const date = new Date(`${day.date}T12:00:00`)
            const offset = date.getDay()
            return (
              <div
                key={day.date}
                className={`rounded-2xl px-1 py-3 text-center text-xs ${statusClass(day.status)}`}
                style={day.date.endsWith('-01') ? { gridColumnStart: offset + 1 } : undefined}
              >
                <div>{Number(day.date.slice(-2))}</div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          {(['present', 'absent', 'sick', 'vacation', 'off'] as const).map((status) => (
            <span key={status} className={`rounded-full px-3 py-1 ${statusClass(status)}`}>
              {t(`portal.${status}`)}
            </span>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-navy">{t('portal.reportAbsence')}</h2>
        {saved ? (
          <p className="mt-3 text-muted">{t('portal.reportSaved')}</p>
        ) : (
          <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={onSubmit}>
            <Field label={t('common.today')}>
              <input name="date" type="date" required defaultValue="2026-08-20" className={inputClass} />
            </Field>
            <Field label={t('portal.reason')}>
              <select name="reason" className={inputClass}>
                <option value="absent">{t('portal.absent')}</option>
                <option value="sick">{t('portal.sick')}</option>
                <option value="vacation">{t('portal.vacation')}</option>
              </select>
            </Field>
            <Field label={t('portal.attachSick')}>
              <input
                type="file"
                className={inputClass}
                onChange={(event) => setFileName(event.target.files?.[0]?.name || '')}
              />
              {fileName && <p className="mt-1 text-sm text-gold">{t('portal.fileAttached')}: {fileName}</p>}
            </Field>
            <div className="self-end">
              <Button type="submit">{t('portal.saveReport')}</Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  )
}
