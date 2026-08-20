import { useMemo, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ChildSwitcher } from '../../components/ChildSwitcher'
import { Button, Card, Field, inputClass } from '../../components/ui'
import { useFamily } from '../../context/FamilyContext'
import { attendanceSeed, type AttendanceStatus } from '../../data/mock'
import { useLang } from '../../lib/hooks'
import { loadJson, saveJson } from '../../lib/storage'

type Report = { childId: string; date: string; reason: AttendanceStatus; file?: string }

const weekdayLabels: Record<string, string[]> = {
  he: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ru: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
}

export function AttendancePage() {
  const { t } = useTranslation()
  const lang = useLang()
  const { childId } = useFamily()
  const [saved, setSaved] = useState(false)
  const [fileName, setFileName] = useState('')
  const [picked, setPicked] = useState('2026-08-20')
  const reports = loadJson<Report[]>('absence-reports', [])

  const days = useMemo(() => {
    const seed = attendanceSeed[childId as keyof typeof attendanceSeed] ?? attendanceSeed.noa
    const overlay = Object.fromEntries(
      reports.filter((r) => r.childId === childId).map((r) => [r.date, r.reason]),
    )
    return seed.map((row) => ({ ...row, status: overlay[row.date] ?? row.status }))
  }, [childId, reports])

  const pad = new Date(`${days[0]?.date ?? '2026-08-01'}T12:00:00`).getDay()

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
      <ChildSwitcher />
      <Card>
        <h1 className="font-display text-2xl text-navy">{t('portal.attendance')}</h1>
        <p className="mt-1 text-sm text-muted">{t('portal.monthLabel')}</p>
        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold text-muted">
          {weekdayLabels[lang].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {Array.from({ length: pad }).map((_, index) => (
            <div key={`pad-${index}`} />
          ))}
          {days.map((day) => (
            <button
              key={day.date}
              type="button"
              title={t(`portal.${day.status}`)}
              onClick={() => {
                setPicked(day.date)
                setSaved(false)
              }}
              className={`rounded-2xl px-1 py-3 text-center text-xs ${statusClass(day.status)} ${
                picked === day.date ? 'ring-2 ring-gold ring-offset-2' : ''
              }`}
            >
              {Number(day.date.slice(-2))}
            </button>
          ))}
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
          <div className="mt-3">
            <p className="text-muted">{t('portal.reportSaved')}</p>
            <Button className="mt-3" variant="navy" onClick={() => setSaved(false)}>
              {t('portal.anotherReport')}
            </Button>
          </div>
        ) : (
          <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={onSubmit}>
            <Field label={t('common.today')}>
              <input
                name="date"
                type="date"
                required
                value={picked}
                onChange={(event) => setPicked(event.target.value)}
                className={inputClass}
              />
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
              {fileName && (
                <p className="mt-1 text-sm text-gold">
                  {t('portal.fileAttached')}: {fileName}
                </p>
              )}
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
