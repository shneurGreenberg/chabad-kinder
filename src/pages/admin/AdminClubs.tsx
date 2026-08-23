import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card } from '../../components/ui'
import { clubs } from '../../data/mock'
import { formatMoney } from '../../lib/format'
import { useLang } from '../../lib/hooks'
import { loadJson, saveJson } from '../../lib/storage'

type ClubMeta = { id: string; capacity: number; taken: number }

export function AdminClubs() {
  const { t } = useTranslation()
  const lang = useLang()
  const [rows, setRows] = useState<ClubMeta[]>(() =>
    loadJson(
      'admin-clubs',
      clubs.map((club) => ({ id: club.id, capacity: club.capacity, taken: club.taken })),
    ),
  )

  function update(id: string, patch: Partial<ClubMeta>) {
    const next = rows.map((row) => (row.id === id ? { ...row, ...patch } : row))
    setRows(next)
    saveJson('admin-clubs', next)
  }

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="font-display text-3xl text-navy">{t('admin.nav.clubs')}</h1>
        <p className="mt-1 text-muted">{t('admin.clubs.lead')}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {clubs.map((club) => {
          const meta = rows.find((row) => row.id === club.id) ?? club
          const free = Math.max(meta.capacity - meta.taken, 0)
          return (
            <Card key={club.id}>
              <p className="font-display text-xl text-navy">{club.title[lang]}</p>
              <p className="text-sm text-muted">{club.when[lang]}</p>
              <p className="mt-2 text-gold">{formatMoney(club.price, lang)}</p>
              <p className="mt-2 text-sm">
                {t('portal.spots')}: {free} / {meta.capacity}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="navy" onClick={() => update(club.id, { taken: Math.min(meta.taken + 1, meta.capacity) })}>
                  {t('admin.clubs.addSpot')}
                </Button>
                <Button variant="ghost" onClick={() => update(club.id, { taken: Math.max(meta.taken - 1, 0) })}>
                  {t('admin.clubs.freeSpot')}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
