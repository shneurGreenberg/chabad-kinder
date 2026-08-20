import { useParams } from 'react-router-dom'
import { isLang, type Lang } from './locale'
import { locPath } from './paths'

export function useLang(): Lang {
  const { lang } = useParams()
  return isLang(lang) ? lang : 'he'
}

export function useLoc(): (path?: string) => string {
  const lang = useLang()
  return (path = '') => locPath(lang, path)
}
