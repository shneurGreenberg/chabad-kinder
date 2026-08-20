import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { children, clubs, defaultClubState, type EnrollmentStatus } from '../../data/mock'
import { useLang } from '../../lib/hooks'
import { loadJson, saveJson } from '../../lib/storage'
import { Button, Card } from '../../components/ui'

export function ClubsPage() {
  const { t } = useTranslation()
  const lang = useLang()
  const [childId, setChildId] = useState(children[0].id)
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
                  {club.price} ₪ · {t('portal.spots')}: {free}
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
