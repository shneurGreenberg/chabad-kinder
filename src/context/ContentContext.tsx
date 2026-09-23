import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { defaultSiteContent, type SiteContent } from '../data/content'
import { loadJson, saveJson } from '../lib/storage'
import { api } from '../lib/api'
import type { Text } from '../data/mock'

type ContentContextValue = {
  content: SiteContent
  loading: boolean
  citySlug: string
  setCitySlug: (slug: string) => void
  updateHomepageHero: (hero: Partial<SiteContent['homepage']['hero']>) => void
  updateStat: (id: string, data: Partial<SiteContent['homepage']['stats'][0]>) => void
  addStat: (data: Omit<SiteContent['homepage']['stats'][0], 'id'>) => void
  removeStat: (id: string) => void
  updateValue: (id: string, data: Partial<SiteContent['homepage']['values'][0]>) => void
  addValue: (data: Omit<SiteContent['homepage']['values'][0], 'id'>) => void
  removeValue: (id: string) => void
  updateQuote: (id: string, data: Partial<SiteContent['homepage']['quotes'][0]>) => void
  addQuote: (data: Omit<SiteContent['homepage']['quotes'][0], 'id'>) => void
  removeQuote: (id: string) => void
  updateGanProgram: (id: string, data: Partial<SiteContent['programs']['gan'][0]>) => void
  addGanProgram: (data: Omit<SiteContent['programs']['gan'][0], 'id'>) => void
  removeGanProgram: (id: string) => void
  updateSchoolProgram: (id: string, data: Partial<SiteContent['programs']['school'][0]>) => void
  addSchoolProgram: (data: Omit<SiteContent['programs']['school'][0], 'id'>) => void
  removeSchoolProgram: (id: string) => void
  updateStaff: (id: string, data: Partial<SiteContent['staff'][0]>) => void
  addStaff: (data: Omit<SiteContent['staff'][0], 'id'>) => void
  removeStaff: (id: string) => void
  updateGallery: (id: string, data: Partial<SiteContent['gallery'][0]>) => void
  addGallery: (data: Omit<SiteContent['gallery'][0], 'id'>) => void
  removeGallery: (id: string) => void
  updateNews: (id: string, data: Partial<SiteContent['news'][0]>) => void
  addNews: (data: Omit<SiteContent['news'][0], 'id'>) => void
  removeNews: (id: string) => void
  updateMenu: (id: string, dish: Text) => void
  updateContact: (data: Partial<SiteContent['contact']>) => void
  updateAbout: (data: Partial<SiteContent['about']>) => void
  exportContent: () => string
  importContent: (json: string) => boolean
  resetToDefaults: () => void
  refreshContent: () => Promise<void>
}

const ContentContext = createContext<ContentContextValue | null>(null)

function isPartialContent(content: unknown): boolean {
  if (!content || typeof content !== 'object') return true
  const obj = content as Record<string, unknown>
  
  const hasRequiredKeys = ['homepage', 'programs', 'staff', 'gallery', 'news', 'menu', 'contact', 'about']
    .every(key => key in obj)
  
  if (!hasRequiredKeys) return true
  
  const homepage = obj.homepage as Record<string, unknown>
  if (!homepage || typeof homepage !== 'object') return true
  
  const hasHomepageSections = ['hero', 'stats', 'values', 'quotes'].every(key => key in homepage)
  return !hasHomepageSections
}

function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target }
  
  for (const key in source) {
    const sourceValue = source[key]
    const targetValue = result[key]
    
    if (sourceValue === undefined) continue
    
    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      result[key] = (sourceValue.length > 0 ? sourceValue : targetValue) as T[Extract<keyof T, string>]
    } else if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue)
    ) {
      result[key] = deepMerge(targetValue, sourceValue as Partial<T[Extract<keyof T, string>]>)
    } else {
      result[key] = sourceValue as T[Extract<keyof T, string>]
    }
  }
  
  return result
}

const DEFAULT_CITY_SLUG = 'novosibirsk'

export function ContentProvider({ children }: { children: ReactNode }) {
  const [citySlug, setCitySlug] = useState<string>(() => {
    return loadJson<string>('city-slug', DEFAULT_CITY_SLUG)
  })
  
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)
  const [loading, setLoading] = useState(true)

  async function loadContent() {
    setLoading(true)
    try {
      const session = await api.getSession().catch(() => ({ authenticated: false }))
      
      if (session.authenticated) {
        const data = await api.getAdminContent()
        if (data.content && !isPartialContent(data.content)) {
          setContent(data.content)
        } else {
          setContent(deepMerge(defaultSiteContent, data.content || {}))
        }
      } else {
        const data = await api.getPublicContent(citySlug)
        if (data.content && !isPartialContent(data.content)) {
          setContent(data.content)
        } else {
          setContent(deepMerge(defaultSiteContent, data.content || {}))
        }
      }
    } catch (error) {
      console.error('Failed to load content from API, using defaults:', error)
      const localContent = loadJson<SiteContent | null>('site-content', null)
      if (localContent && !isPartialContent(localContent)) {
        setContent(localContent)
      } else {
        setContent(defaultSiteContent)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContent()
  }, [citySlug])

  useEffect(() => {
    saveJson('city-slug', citySlug)
  }, [citySlug])

  async function persist(next: SiteContent) {
    setContent(next)
    saveJson('site-content', next)
    
    try {
      const session = await api.getSession().catch(() => ({ authenticated: false }))
      if (session.authenticated) {
        await api.updateAdminContent(next)
      }
    } catch (error) {
      console.error('Failed to save content to API:', error)
    }
  }

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      loading,
      citySlug,
      setCitySlug,
      refreshContent: loadContent,
      updateHomepageHero: (hero) => {
        persist({
          ...content,
          homepage: {
            ...content.homepage,
            hero: { ...content.homepage.hero, ...hero },
          },
        })
      },
      updateStat: (id, data) => {
        persist({
          ...content,
          homepage: {
            ...content.homepage,
            stats: content.homepage.stats.map((s) => (s.id === id ? { ...s, ...data } : s)),
          },
        })
      },
      addStat: (data) => {
        persist({
          ...content,
          homepage: {
            ...content.homepage,
            stats: [...content.homepage.stats, { ...data, id: `stat-${Date.now()}` }],
          },
        })
      },
      removeStat: (id) => {
        persist({
          ...content,
          homepage: {
            ...content.homepage,
            stats: content.homepage.stats.filter((s) => s.id !== id),
          },
        })
      },
      updateValue: (id, data) => {
        persist({
          ...content,
          homepage: {
            ...content.homepage,
            values: content.homepage.values.map((v) => (v.id === id ? { ...v, ...data } : v)),
          },
        })
      },
      addValue: (data) => {
        persist({
          ...content,
          homepage: {
            ...content.homepage,
            values: [...content.homepage.values, { ...data, id: `val-${Date.now()}` }],
          },
        })
      },
      removeValue: (id) => {
        persist({
          ...content,
          homepage: {
            ...content.homepage,
            values: content.homepage.values.filter((v) => v.id !== id),
          },
        })
      },
      updateQuote: (id, data) => {
        persist({
          ...content,
          homepage: {
            ...content.homepage,
            quotes: content.homepage.quotes.map((q) => (q.id === id ? { ...q, ...data } : q)),
          },
        })
      },
      addQuote: (data) => {
        persist({
          ...content,
          homepage: {
            ...content.homepage,
            quotes: [...content.homepage.quotes, { ...data, id: `quote-${Date.now()}` }],
          },
        })
      },
      removeQuote: (id) => {
        persist({
          ...content,
          homepage: {
            ...content.homepage,
            quotes: content.homepage.quotes.filter((q) => q.id !== id),
          },
        })
      },
      updateGanProgram: (id, data) => {
        persist({
          ...content,
          programs: {
            ...content.programs,
            gan: content.programs.gan.map((p) => (p.id === id ? { ...p, ...data } : p)),
          },
        })
      },
      addGanProgram: (data) => {
        persist({
          ...content,
          programs: {
            ...content.programs,
            gan: [...content.programs.gan, { ...data, id: `ganprog-${Date.now()}` }],
          },
        })
      },
      removeGanProgram: (id) => {
        persist({
          ...content,
          programs: {
            ...content.programs,
            gan: content.programs.gan.filter((p) => p.id !== id),
          },
        })
      },
      updateSchoolProgram: (id, data) => {
        persist({
          ...content,
          programs: {
            ...content.programs,
            school: content.programs.school.map((p) => (p.id === id ? { ...p, ...data } : p)),
          },
        })
      },
      addSchoolProgram: (data) => {
        persist({
          ...content,
          programs: {
            ...content.programs,
            school: [...content.programs.school, { ...data, id: `schoolprog-${Date.now()}` }],
          },
        })
      },
      removeSchoolProgram: (id) => {
        persist({
          ...content,
          programs: {
            ...content.programs,
            school: content.programs.school.filter((p) => p.id !== id),
          },
        })
      },
      updateStaff: (id, data) => {
        persist({
          ...content,
          staff: content.staff.map((s) => (s.id === id ? { ...s, ...data } : s)),
        })
      },
      addStaff: (data) => {
        persist({
          ...content,
          staff: [...content.staff, { ...data, id: `staff-${Date.now()}` }],
        })
      },
      removeStaff: (id) => {
        persist({
          ...content,
          staff: content.staff.filter((s) => s.id !== id),
        })
      },
      updateGallery: (id, data) => {
        persist({
          ...content,
          gallery: content.gallery.map((g) => (g.id === id ? { ...g, ...data } : g)),
        })
      },
      addGallery: (data) => {
        persist({
          ...content,
          gallery: [...content.gallery, { ...data, id: `gal-${Date.now()}` }],
        })
      },
      removeGallery: (id) => {
        persist({
          ...content,
          gallery: content.gallery.filter((g) => g.id !== id),
        })
      },
      updateNews: (id, data) => {
        persist({
          ...content,
          news: content.news.map((n) => (n.id === id ? { ...n, ...data } : n)),
        })
      },
      addNews: (data) => {
        persist({
          ...content,
          news: [{ ...data, id: `news-${Date.now()}` }, ...content.news],
        })
      },
      removeNews: (id) => {
        persist({
          ...content,
          news: content.news.filter((n) => n.id !== id),
        })
      },
      updateMenu: (id, dish) => {
        persist({
          ...content,
          menu: content.menu.map((m) => (m.id === id ? { ...m, dish } : m)),
        })
      },
      updateContact: (data) => {
        persist({
          ...content,
          contact: { ...content.contact, ...data },
        })
      },
      updateAbout: (data) => {
        persist({
          ...content,
          about: { ...content.about, ...data },
        })
      },
      exportContent: () => {
        return JSON.stringify(content, null, 2)
      },
      importContent: (json: string) => {
        try {
          const imported = JSON.parse(json) as SiteContent
          persist(imported)
          return true
        } catch {
          return false
        }
      },
      resetToDefaults: () => {
        persist(defaultSiteContent)
      },
    }),
    [content, loading, citySlug],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('ContentProvider missing')
  return ctx
}
