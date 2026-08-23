import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Field, inputClass } from '../../components/ui'
import { useAdmin } from '../../context/AdminContext'
import { labelOf, type RoleName, type StaffAccess } from '../../data/admin'
import { useLang } from '../../lib/hooks'

const accessKeys: (keyof StaffAccess)[] = ['children', 'attendance', 'finance', 'messages', 'photos']

export function AdminStaff() {
  const { t } = useTranslation()
  const lang = useLang()
  const { store, addStaff, setStaffActive, setStaffRole, setStaffAccess } = useAdmin()
  const [open, setOpen] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const role = String(data.get('role') || 'teacher') as RoleName
    addStaff({
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      role,
      active: true,
      access: {
        children: role !== 'kitchen',
        attendance: role !== 'kitchen',
        finance: role === 'admin',
        messages: role !== 'kitchen',
        photos: role !== 'kitchen',
      },
    })
    setOpen(false)
    event.currentTarget.reset()
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-navy">{t('admin.nav.staff')}</h1>
        <Button onClick={() => setOpen((v) => !v)}>{t('admin.staff.add')}</Button>
      </div>
      {open && (
        <Card>
          <form className="grid gap-3 md:grid-cols-3" onSubmit={onSubmit}>
            <Field label={t('contact.name')}>
              <input required name="name" className={inputClass} />
            </Field>
            <Field label={t('login.email')}>
              <input required type="email" name="email" className={inputClass} />
            </Field>
            <Field label={t('admin.staff.role')}>
              <select name="role" className={inputClass}>
                <option value="teacher">{t('admin.staff.teacher')}</option>
                <option value="admin">{t('admin.staff.admin')}</option>
                <option value="kitchen">{t('admin.staff.kitchen')}</option>
              </select>
            </Field>
            <Button type="submit">{t('admin.save')}</Button>
          </form>
        </Card>
      )}
      {store.staff.map((person) => (
        <Card key={person.id} className={person.active ? '' : 'opacity-70'}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-xl text-navy">{labelOf(person.name, lang)}</p>
              <p className="text-sm text-muted">{person.email}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                className={inputClass}
                value={person.role}
                onChange={(event) => setStaffRole(person.id, event.target.value as RoleName)}
              >
                <option value="admin">{t('admin.staff.admin')}</option>
                <option value="teacher">{t('admin.staff.teacher')}</option>
                <option value="kitchen">{t('admin.staff.kitchen')}</option>
              </select>
              <Button variant={person.active ? 'ghost' : 'navy'} onClick={() => setStaffActive(person.id, !person.active)}>
                {person.active ? t('admin.staff.disable') : t('admin.staff.enable')}
              </Button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {accessKeys.map((key) => (
              <label key={key} className="flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-xs font-semibold">
                <input
                  type="checkbox"
                  checked={person.access[key]}
                  onChange={(event) =>
                    setStaffAccess(person.id, { ...person.access, [key]: event.target.checked })
                  }
                />
                {t(`admin.staff.access.${key}`)}
              </label>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
