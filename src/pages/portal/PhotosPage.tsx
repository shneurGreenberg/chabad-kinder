import { useTranslation } from 'react-i18next'
import { ChildSwitcher } from '../../components/ChildSwitcher'
import { Card } from '../../components/ui'
import { useFamily } from '../../context/FamilyContext'
import { achievements, developmentNotes, gallery, teacherComments } from '../../data/mock'
import { useLang } from '../../lib/hooks'
import { asset } from '../../lib/paths'

export function PhotosPage() {
  const { t } = useTranslation()
  const lang = useLang()
  const { childId } = useFamily()

  return (
    <div className="grid gap-5">
      <ChildSwitcher />
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
