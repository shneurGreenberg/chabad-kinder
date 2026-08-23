import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  defaultAdminStore,
  type AdminApplication,
  type AdminChild,
  type AdminNewsItem,
  type AdminStaff,
  type AdminStore,
  type AdminTariff,
  type ChildStatus,
  type StaffAccess,
} from '../data/admin'
import { loadJson, saveJson } from '../lib/storage'

type WizardApp = {
  parentName?: string
  childName?: string
  phone?: string
  email?: string
  notes?: string
  track?: string
  stay?: string
  at?: string
}

type AdminContextValue = {
  store: AdminStore
  addChild: (child: Omit<AdminChild, 'id' | 'status'> & { status?: ChildStatus }) => void
  setChildStatus: (id: string, status: ChildStatus) => void
  addStaff: (staff: Omit<AdminStaff, 'id'>) => void
  setStaffActive: (id: string, active: boolean) => void
  setStaffRole: (id: string, role: AdminStaff['role']) => void
  setStaffAccess: (id: string, access: StaffAccess) => void
  addTariff: (tariff: Omit<AdminTariff, 'id' | 'active'> & { active?: boolean }) => void
  setTariff: (id: string, patch: Partial<AdminTariff>) => void
  setApplicationStatus: (id: string, status: AdminApplication['status']) => void
  ingestWizardApps: () => void
  addNews: (item: Omit<AdminNewsItem, 'id'>) => void
  setMenuDish: (id: string, dish: string) => void
  setAttendance: (childId: string, status: AdminStore['attendance'][string]) => void
}

const AdminContext = createContext<AdminContextValue | null>(null)

function mergeWizard(store: AdminStore): AdminStore {
  const incoming = loadJson<WizardApp[]>('applications', [])
  const extras: AdminApplication[] = incoming
    .filter((app) => app.childName && !store.applications.some((row) => row.at === app.at && row.childName === app.childName))
    .map((app) => ({
      id: `wiz-${app.at || Date.now()}`,
      parentName: app.parentName || '',
      childName: app.childName || '',
      phone: app.phone || '',
      email: app.email || '',
      notes: app.notes || '',
      track: app.track || '',
      stay: app.stay || '',
      status: 'new',
      at: app.at || new Date().toISOString(),
    }))
  if (!extras.length) return store
  return { ...store, applications: [...extras, ...store.applications] }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<AdminStore>(() =>
    mergeWizard(loadJson('admin-store', defaultAdminStore)),
  )

  function persist(next: AdminStore) {
    saveJson('admin-store', next)
    setStore(next)
  }

  const value = useMemo<AdminContextValue>(
    () => ({
      store,
      addChild: (child) => {
        persist({
          ...store,
          children: [
            {
              ...child,
              id: `c-${Date.now()}`,
              status: child.status ?? 'incoming',
            },
            ...store.children,
          ],
        })
      },
      setChildStatus: (id, status) => {
        persist({
          ...store,
          children: store.children.map((child) => (child.id === id ? { ...child, status } : child)),
        })
      },
      addStaff: (staff) => {
        persist({ ...store, staff: [{ ...staff, id: `st-${Date.now()}` }, ...store.staff] })
      },
      setStaffActive: (id, active) => {
        persist({
          ...store,
          staff: store.staff.map((row) => (row.id === id ? { ...row, active } : row)),
        })
      },
      setStaffRole: (id, role) => {
        persist({
          ...store,
          staff: store.staff.map((row) => (row.id === id ? { ...row, role } : row)),
        })
      },
      setStaffAccess: (id, access) => {
        persist({
          ...store,
          staff: store.staff.map((row) => (row.id === id ? { ...row, access } : row)),
        })
      },
      addTariff: (tariff) => {
        persist({
          ...store,
          tariffs: [{ ...tariff, id: `t-${Date.now()}`, active: tariff.active ?? true }, ...store.tariffs],
        })
      },
      setTariff: (id, patch) => {
        persist({
          ...store,
          tariffs: store.tariffs.map((row) => (row.id === id ? { ...row, ...patch } : row)),
        })
      },
      setApplicationStatus: (id, status) => {
        const app = store.applications.find((row) => row.id === id)
        let children = store.children
        if (app && status === 'accepted' && !children.some((child) => child.parentPhone === app.phone && labelMatch(child.name, app.childName))) {
          children = [
            {
              id: `c-${Date.now()}`,
              name: app.childName,
              track: app.track === 'school' ? 'school' : 'gan',
              tariffId: app.stay || 'full',
              birthDate: '',
              parentName: app.parentName,
              parentPhone: app.phone,
              medical: app.notes,
              group: app.track === 'school' ? 'school' : 'gan',
              status: 'incoming',
              teacher: '',
            },
            ...children,
          ]
        }
        persist({
          ...store,
          children,
          applications: store.applications.map((row) => (row.id === id ? { ...row, status } : row)),
        })
      },
      ingestWizardApps: () => {
        const next = mergeWizard(store)
        if (next !== store) persist(next)
      },
      addNews: (item) => {
        persist({ ...store, news: [{ ...item, id: `n-${Date.now()}` }, ...store.news] })
      },
      setMenuDish: (id, dish) => {
        persist({
          ...store,
          menu: store.menu.map((row) => (row.id === id ? { ...row, dish } : row)),
        })
      },
      setAttendance: (childId, status) => {
        persist({ ...store, attendance: { ...store.attendance, [childId]: status } })
      },
    }),
    [store],
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

function labelMatch(name: AdminChild['name'], childName: string): boolean {
  if (typeof name === 'string') return name === childName
  return Object.values(name).includes(childName)
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('AdminProvider missing')
  return ctx
}
