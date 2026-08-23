import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card } from '../../components/ui'
import { useAdmin } from '../../context/AdminContext'
import { formatDate } from '../../lib/format'
import { useLang } from '../../lib/hooks'

export function AdminApplications() {
  const { t } = useTranslation()
  const lang = useLang()
  const { store, setApplicationStatus, ingestWizardApps } = useAdmin()

  useEffect(() => {
    ingestWizardApps()
  }, [ingestWizardApps])

  return (
    <div className="grid gap-5">
      <h1 className="font-display text-3xl text-navy">{t('admin.nav.applications')}</h1>
      <p className="text-muted">{t('admin.apps.lead')}</p>
      {store.applications.map((app) => (
        <Card key={app.id}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-xl text-navy">{app.childName}</p>
              <p className="mt-1 text-sm text-muted">
                {app.parentName} · {app.phone} · {app.email}
              </p>
              <p className="mt-1 text-sm text-muted">
                {app.track} {app.stay ? `· ${app.stay}` : ''} · {formatDate(app.at.slice(0, 10), lang)}
              </p>
              {app.notes && <p className="mt-2 text-navy">{app.notes}</p>}
              <p className="mt-2 text-xs font-semibold text-gold">{t(`admin.apps.${app.status}`)}</p>
            </div>
            {app.status === 'new' && (
              <div className="flex gap-2">
                <Button onClick={() => setApplicationStatus(app.id, 'accepted')}>{t('admin.apps.accept')}</Button>
                <Button variant="ghost" onClick={() => setApplicationStatus(app.id, 'declined')}>
                  {t('admin.apps.decline')}
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
      {store.applications.length === 0 && <p className="text-muted">{t('admin.empty.apps')}</p>}
    </div>
  )
}
