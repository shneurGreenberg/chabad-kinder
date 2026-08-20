import { Link, useLocation } from 'react-router-dom'
import { LANGS, languageLabel } from '../lib/locale'
import { locPath } from '../lib/paths'
import { useLang } from '../lib/hooks'

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const lang = useLang()
  const location = useLocation()
  const rest = location.pathname.replace(/^\/(he|en|ru)/, '') || ''

  return (
    <div className="flex items-center gap-1 rounded-full border border-current/15 p-1 text-xs font-semibold">
      {LANGS.map((code) => {
        const active = code === lang
        return (
          <Link
            key={code}
            to={locPath(code, rest)}
            lang={code}
            className={`rounded-full px-2.5 py-1 no-underline transition ${
              active
                ? light
                  ? 'bg-white text-navy'
                  : 'bg-navy text-cream'
                : light
                  ? 'text-cream/80 hover:text-white'
                  : 'text-muted hover:text-navy'
            }`}
          >
            {languageLabel(code)}
          </Link>
        )
      })}
    </div>
  )
}
