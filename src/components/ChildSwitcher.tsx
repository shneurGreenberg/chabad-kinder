import { useTranslation } from 'react-i18next'
import { children } from '../data/mock'
import { useFamily } from '../context/FamilyContext'
import { useLang } from '../lib/hooks'

export function ChildSwitcher() {
  const { t } = useTranslation()
  const lang = useLang()
  const { childId, setChildId } = useFamily()

  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label={t('portal.child')}>
      {children.map((child) => (
        <button
          key={child.id}
          type="button"
          role="tab"
          aria-selected={childId === child.id}
          onClick={() => setChildId(child.id)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            childId === child.id ? 'bg-navy text-cream' : 'bg-white text-navy hover:bg-gold-soft'
          }`}
        >
          {child.name[lang]}
        </button>
      ))}
    </div>
  )
}
