import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { achievements, children, developmentNotes, gallery, teacherComments } from '../../data/mock'
import { useLang } from '../../lib/hooks'
import { asset } from '../../lib/paths'
import { Card } from '../../components/ui'

export function PhotosPage() {
  const { t } = useTranslation()
  const lang = useLang()
  const [childId, setChildId] = useState(children[0].id)

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
        <h1 className="font-display text-2xl text-navy">{t('portal.photoReports')}</h1>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {gallery.map((shot) => (
            <figure key={shot.src} className="overflow-hidden rounded-2xl">
              <img src={asset(shot.src)} alt={shot.caption[lang]} className="h-40 w-full object-cover" />
              <figcaption className="bg-cream px-3 py-2 text-sm text-muted">{shot.caption[lang]}</figcaption>
            </figure>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-navy">{t('portal.achievements')}</h2>
        <ul className="mt-3 grid gap-2">
          {achievements
            .filter((item) => item.childId === childId)
            .map((item) => (
              <li key={item.title.en} className="rounded-2xl bg-cream px-4 py-3 text-navy">
                {item.title[lang]}
              </li>
            ))}
        </ul>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-navy">{t('portal.reports')}</h2>
        {developmentNotes
          .filter((item) => item.childId === childId)
          .map((item) => (
            <p key={item.body.en} className="mt-2 text-muted">
              {item.body[lang]}
            </p>
          ))}
      </Card>
      <Card>
        <h2 className="font-display text-xl text-navy">{t('portal.comments')}</h2>
        {teacherComments
          .filter((item) => item.childId === childId)
          .map((item) => (
            <p key={item.body.en} className="mt-2 text-muted">
              {item.body[lang]}
            </p>
          ))}
      </Card>
    </div>
  )
}
