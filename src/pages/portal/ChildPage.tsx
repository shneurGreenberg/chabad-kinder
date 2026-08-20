import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { children, documents, parentContacts } from '../../data/mock'
import { useLang } from '../../lib/hooks'
import { Card } from '../../components/ui'

export function ChildPage() {
  const { t } = useTranslation()
  const lang = useLang()
  const [childId, setChildId] = useState(children[0].id)
  const child = children.find((item) => item.id === childId) ?? children[0]

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {children.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setChildId(item.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              childId === item.id ? 'bg-navy text-cream' : 'bg-white text-navy'
            }`}
          >
            {item.name[lang]}
          </button>
        ))}
      </div>
      <Card>
        <p className="text-xs tracking-wide text-gold uppercase">{t('portal.profile')}</p>
        <h1 className="mt-1 font-display text-3xl text-navy">{child.name[lang]}</h1>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">{t('portal.fullName')}</dt>
            <dd className="text-navy">{child.name[lang]}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">{t('portal.birthDate')}</dt>
            <dd className="text-navy">{child.birthDate}</dd>
          </div>
        </dl>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-navy">{t('portal.parents')}</h2>
        <ul className="mt-3 grid gap-2">
          {parentContacts.map((person) => (
            <li key={person.phone} className="flex flex-wrap justify-between gap-2 rounded-2xl bg-cream px-4 py-3">
              <span>
                {person.name[lang]} · {person.relation[lang]}
              </span>
              <span className="text-muted">{person.phone}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-navy">{t('portal.medical')}</h2>
        <p className="mt-2 text-muted">{child.medical[lang]}</p>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-navy">{t('portal.docs')}</h2>
        <ul className="mt-3 grid gap-2">
          {documents.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3">
              <span>{doc.title[lang]}</span>
              <span className="text-sm text-gold">{t('portal.open')}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-navy">{t('portal.extra')}</h2>
        <p className="mt-2 text-muted">{child.extra[lang]}</p>
      </Card>
    </div>
  )
}
