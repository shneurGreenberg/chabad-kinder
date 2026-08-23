import { useTranslation } from 'react-i18next'
import { Button, Card } from '../../components/ui'
import { useAdmin } from '../../context/AdminContext'
import { labelOf } from '../../data/admin'
import { useLang } from '../../lib/hooks'

const statuses = ['present', 'absent', 'sick', 'vacation'] as const

export function AdminAttendance() {
  const { t } = useTranslation()
  const lang = useLang()
  const { store, setAttendance } = useAdmin()
  const active = store.children.filter((child) => child.status === 'active')

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="font-display text-3xl text-navy">{t('admin.nav.attendance')}</h1>
        <p className="mt-1 text-muted">{t('admin.attendance.lead')}</p>
      </div>
      {active.map((child) => {
        const current = store.attendance[child.id] ?? 'present'
        return (
          <Card key={child.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-xl text-navy">{labelOf(child.name, lang)}</p>
                <p className="text-sm text-muted">
                  {t(`wizard.${child.track}`)} · {labelOf(child.teacher, lang)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <Button
                    key={status}
                    variant={current === status ? 'navy' : 'ghost'}
                    onClick={() => setAttendance(child.id, status)}
                  >
                    {t(`portal.${status}`)}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
