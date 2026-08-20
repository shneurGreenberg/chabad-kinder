import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChildSwitcher } from '../../components/ChildSwitcher'
import { Button, Card } from '../../components/ui'
import { useFamily } from '../../context/FamilyContext'
import { clubs, defaultClubState, type EnrollmentStatus } from '../../data/mock'
import { formatMoney } from '../../lib/format'
import { useLang } from '../../lib/hooks'
import { loadJson, saveJson } from '../../lib/storage'

export function ClubsPage() {
  const { t } = useTranslation()
  const lang = useLang()
  const { childId } = useFamily()
  const [state, setState] = useState<Record<string, EnrollmentStatus>>(
    () => loadJson('clubs', defaultClubState),
  )

  function update(id: string, status: EnrollmentStatus) {
    const next = { ...state, [id]: status }
    setState(next)
    saveJson('clubs', next)
  }

  return (
    <div className="grid gap-5">
      <ChildSwitcher />
      <div className="grid gap-4 md:grid-cols-2">
        {clubs
          .filter((club) => club.childIds.includes(childId))
          .map((club) => {
            const status = state[club.id] ?? 'none'
            const free = Math.max(club.capacity - club.taken, 0)
            return (
              <Card key={club.id}>
                <p className="font-display text-2xl text-navy">{club.title[lang]}</p>
                <p className="mt-1 text-sm text-muted">{club.when[lang]}</p>
                <p className="mt-2 text-gold">
                  {formatMoney(club.price, lang)} · {t('portal.spots')}: {free}
                </p>
                <p className="mt-2 text-sm">
                  {status === 'enrolled' && t('portal.enrolled')}
                  {status === 'waiting' && t('portal.waiting')}
                  {status === 'none' && (free === 0 ? t('portal.full') : t('portal.spots'))}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {status === 'none' && free > 0 && (
                    <Button onClick={() => update(club.id, 'enrolled')}>{t('portal.enroll')}</Button>
                  )}
                  {status === 'none' && free === 0 && (
                    <Button onClick={() => update(club.id, 'waiting')}>{t('portal.waitlist')}</Button>
                  )}
                  {status !== 'none' && (
                    <Button variant="ghost" onClick={() => update(club.id, 'none')}>
                      {t('portal.cancel')}
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
      </div>
    </div>
  )
}
