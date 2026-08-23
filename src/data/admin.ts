import type { Lang } from '../lib/locale'
import type { Text } from './mock'

export type RoleName = 'admin' | 'teacher' | 'kitchen'
export type ChildStatus = 'active' | 'incoming' | 'alumni'
export type AppStatus = 'new' | 'accepted' | 'declined'
export type TariffUnit = 'month' | 'hour' | 'day'

export type AdminChild = {
  id: string
  name: Text | string
  track: 'gan' | 'school'
  tariffId: string
  birthDate: string
  parentName: Text | string
  parentPhone: string
  medical: Text | string
  group: string
  status: ChildStatus
  teacher: Text | string
}

export type StaffAccess = {
  children: boolean
  attendance: boolean
  finance: boolean
  messages: boolean
  photos: boolean
}

export type AdminStaff = {
  id: string
  name: Text | string
  email: string
  role: RoleName
  active: boolean
  access: StaffAccess
}

export type AdminTariff = {
  id: string
  name: Text | string
  amount: number
  unit: TariffUnit
  kind: string
  active: boolean
}

export type AdminApplication = {
  id: string
  parentName: string
  childName: string
  phone: string
  email: string
  notes: string
  track: string
  stay: string
  status: AppStatus
  at: string
}

export type AdminNewsItem = {
  id: string
  title: string
  body: string
  date: string
}

export type AdminMenuRow = {
  id: string
  day: Text | string
  dish: Text | string
}

export type AdminStore = {
  children: AdminChild[]
  staff: AdminStaff[]
  tariffs: AdminTariff[]
  applications: AdminApplication[]
  news: AdminNewsItem[]
  menu: AdminMenuRow[]
  attendance: Record<string, 'present' | 'absent' | 'sick' | 'vacation'>
}

export function labelOf(value: Text | string, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang]
}

export const defaultAdminStore: AdminStore = {
  children: [
    {
      id: 'noa',
      name: { he: 'נעה כהן', en: 'Noa Cohen', ru: 'Ноа Коэн' },
      track: 'gan',
      tariffId: 'full',
      birthDate: '2022-03-14',
      parentName: { he: 'מיכל כהן', en: 'Michal Cohen', ru: 'Михаль Коэн' },
      parentPhone: '050-555-0148',
      medical: { he: 'אלרגיה לבוטנים', en: 'Peanut allergy', ru: 'Аллергия на арахис' },
      group: 'gan',
      status: 'active',
      teacher: { he: 'חיה גולד', en: 'Chaya Gold', ru: 'Хая Гольд' },
    },
    {
      id: 'yosef',
      name: { he: 'יוסף כהן', en: 'Yosef Cohen', ru: 'Йосеф Коэн' },
      track: 'school',
      tariffId: 'school',
      birthDate: '2018-11-02',
      parentName: { he: 'מיכל כהן', en: 'Michal Cohen', ru: 'Михаль Коэн' },
      parentPhone: '050-555-0148',
      medical: { he: 'אין מגבלות', en: 'No restrictions', ru: 'Ограничений нет' },
      group: 'school',
      status: 'active',
      teacher: { he: 'יוסף מזרחי', en: 'Yosef Mizrahi', ru: 'Йосеф Мизрахи' },
    },
    {
      id: 'menachem',
      name: { he: 'מנחם ברג', en: 'Menachem Berg', ru: 'Менахем Берг' },
      track: 'gan',
      tariffId: 'half',
      birthDate: '2023-06-02',
      parentName: { he: 'אנה ברג', en: 'Anna Berg', ru: 'Анна Берг' },
      parentPhone: '054-555-0112',
      medical: { he: 'אין', en: 'None', ru: 'Нет' },
      group: 'gan',
      status: 'incoming',
      teacher: { he: 'חיה גולד', en: 'Chaya Gold', ru: 'Хая Гольд' },
    },
    {
      id: 'dina',
      name: { he: 'דינה שפירא', en: 'Dina Shapira', ru: 'Дина Шапира' },
      track: 'school',
      tariffId: 'school',
      birthDate: '2017-01-20',
      parentName: { he: 'לאה שפירא', en: 'Leah Shapira', ru: 'Лея Шапира' },
      parentPhone: '053-555-0177',
      medical: { he: 'אסטמה קלה', en: 'Mild asthma', ru: 'Лёгкая астма' },
      group: 'school',
      status: 'incoming',
      teacher: { he: 'יוסף מזרחי', en: 'Yosef Mizrahi', ru: 'Йосеф Мизрахи' },
    },
    {
      id: 'sarah',
      name: { he: 'שרה אזולאי', en: 'Sarah Azulai', ru: 'Сара Азулай' },
      track: 'gan',
      tariffId: 'full',
      birthDate: '2018-04-11',
      parentName: { he: 'רחל אזולאי', en: 'Rachel Azulai', ru: 'Рахель Азулай' },
      parentPhone: '050-555-0166',
      medical: { he: 'אין', en: 'None', ru: 'Нет' },
      group: 'gan',
      status: 'alumni',
      teacher: { he: 'חיה גולד', en: 'Chaya Gold', ru: 'Хая Гольд' },
    },
  ],
  staff: [
    {
      id: 's1',
      name: { he: 'רבקה לוי', en: 'Rivka Levi', ru: 'Рівка Леви' },
      email: 'admin@demo.local',
      role: 'admin',
      active: true,
      access: { children: true, attendance: true, finance: true, messages: true, photos: true },
    },
    {
      id: 's2',
      name: { he: 'חיה גולד', en: 'Chaya Gold', ru: 'Хая Гольд' },
      email: 'chaya@chabad-kinder.demo',
      role: 'teacher',
      active: true,
      access: { children: true, attendance: true, finance: false, messages: true, photos: true },
    },
    {
      id: 's3',
      name: { he: 'יוסף מזרחי', en: 'Yosef Mizrahi', ru: 'Йосеф Мизрахи' },
      email: 'yosef@chabad-kinder.demo',
      role: 'teacher',
      active: true,
      access: { children: true, attendance: true, finance: false, messages: true, photos: true },
    },
    {
      id: 's4',
      name: { he: 'מרים כץ', en: 'Miriam Katz', ru: 'Мирьям Кац' },
      email: 'kitchen@chabad-kinder.demo',
      role: 'kitchen',
      active: true,
      access: { children: false, attendance: false, finance: false, messages: false, photos: false },
    },
  ],
  tariffs: [
    { id: 'full', name: { he: 'יום מלא', en: 'Full day', ru: 'Полный день' }, amount: 2800, unit: 'month', kind: 'full', active: true },
    { id: 'half', name: { he: 'חצי יום', en: 'Half day', ru: 'Неполный день' }, amount: 1900, unit: 'month', kind: 'half', active: true },
    { id: 'hourly', name: { he: 'חוגים לפי שעה', en: 'Hourly clubs', ru: 'Почасовые' }, amount: 80, unit: 'hour', kind: 'hourly', active: true },
    { id: 'emergency', name: { he: 'שהייה דחופה', en: 'Emergency stay', ru: 'Экстренное' }, amount: 150, unit: 'day', kind: 'emergency', active: true },
    { id: 'school', name: { he: 'בית ספר', en: 'School', ru: 'Школа' }, amount: 2200, unit: 'month', kind: 'school', active: true },
  ],
  applications: [
    {
      id: 'app-seed',
      parentName: 'איגור פרידמן',
      childName: 'אריאל פרידמן',
      phone: '052-555-0133',
      email: 'igor@demo.local',
      notes: 'רוסית בבית, מעוניינים ביום מלא',
      track: 'gan',
      stay: 'full',
      status: 'new',
      at: '2026-08-21T09:15:00',
    },
  ],
  news: [
    { id: 'n1', title: 'קבלת שבת ביום שישי', body: 'איסוף עד 12:00. הילדים מכינים חלות.', date: '2026-08-18' },
  ],
  menu: [
    { id: 'm1', day: { he: 'ראשון', en: 'Sunday', ru: 'Воскресенье' }, dish: { he: 'פתיתים וירקות', en: 'Pasta and vegetables', ru: 'Паста с овощами' } },
    { id: 'm2', day: { he: 'שני', en: 'Monday', ru: 'Понедельник' }, dish: { he: 'אורז עם גזר', en: 'Rice with carrots', ru: 'Рис с морковью' } },
    { id: 'm3', day: { he: 'שלישי', en: 'Tuesday', ru: 'Вторник' }, dish: { he: 'שקשוקה רכה', en: 'Gentle shakshuka', ru: 'Мягкая шакшука' } },
    { id: 'm4', day: { he: 'רביעי', en: 'Wednesday', ru: 'Среда' }, dish: { he: 'מרק דלעת', en: 'Pumpkin soup', ru: 'Тыквенный суп' } },
    { id: 'm5', day: { he: 'חמישי', en: 'Thursday', ru: 'Четверг' }, dish: { he: 'קוסקוס וקטניות', en: 'Couscous and legumes', ru: 'Кус-кус с бобовыми' } },
    { id: 'm6', day: { he: 'שישי', en: 'Friday', ru: 'Пятница' }, dish: { he: 'חלה ומרק עוף', en: 'Challah and chicken soup', ru: 'Хала и куриный суп' } },
  ],
  attendance: {
    noa: 'present',
    yosef: 'present',
  },
}
