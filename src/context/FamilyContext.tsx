import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { children } from '../data/mock'
import { loadJson, saveJson } from '../lib/storage'

type FamilyContextValue = {
  childId: string
  setChildId: (id: string) => void
}

const FamilyContext = createContext<FamilyContextValue | null>(null)

export function FamilyProvider({ children: nodes }: { children: ReactNode }) {
  const [childId, setChildIdState] = useState(() => loadJson('childId', children[0].id))

  const value = useMemo<FamilyContextValue>(
    () => ({
      childId: children.some((child) => child.id === childId) ? childId : children[0].id,
      setChildId: (id) => {
        setChildIdState(id)
        saveJson('childId', id)
      },
    }),
    [childId],
  )

  return <FamilyContext.Provider value={value}>{nodes}</FamilyContext.Provider>
}

export function useFamily(): FamilyContextValue {
  const ctx = useContext(FamilyContext)
  if (!ctx) throw new Error('FamilyProvider missing')
  return ctx
}
