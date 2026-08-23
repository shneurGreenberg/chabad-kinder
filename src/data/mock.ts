import type { Lang } from '../lib/locale'

export type Text = Record<Lang, string>
export type AttendanceStatus = 'present' | 'absent' | 'sick' | 'vacation' | 'off'
export type EnrollmentStatus = 'enrolled' | 'waiting' | 'none'

export const tariffs = {
  full: { id: 'full', amount: 2800, unit: 'month' as const },
  half: { id: 'half', amount: 1900, unit: 'month' as const },
  hourly: { id: 'hourly', amount: 80, unit: 'hour' as const },
  emergency: { id: 'emergency', amount: 150, unit: 'day' as const },
  school: { id: 'school', amount: 2200, unit: 'month' as const },
}

export const news = [
  {
    id: 'n1',
    date: '2026-08-18',
    title: {
      he: 'קבלת שבת בגן ביום שישי',
      en: 'Kabbalat Shabbat in the gan on Friday',
      ru: 'Каббалат шаббат в саду в пятницу',
    },
    body: {
      he: 'הילדים יכינו חלות קטנות. איסוף עד 12:00.',
      en: 'The children will bake small challot. Pickup by 12:00.',
      ru: 'Дети испекут маленькие халы. Сбор до 12:00.',
    },
  },
  {
    id: 'n2',
    date: '2026-08-16',
    title: {
      he: 'תמונות מטיול החצר עלו לפורטל',
      en: 'Yard-trip photographs are in the portal',
      ru: 'Фото прогулки по двору уже в кабинете',
    },
    body: {
      he: 'אלבום קצר בכניסת ההורים.',
      en: 'A short album in the parent portal.',
      ru: 'Короткий альбом во входе для родителей.',
    },
  },
  {
    id: 'n3',
    date: '2026-08-12',
    title: {
      he: 'שינוי בתפריט יום רביעי',
      en: 'Wednesday menu change',
      ru: 'Изменение меню в среду',
    },
    body: {
      he: 'מרק דלעת במקום אורז, אחרי הודעת ספק על אלרגן.',
      en: 'Pumpkin soup instead of rice, after a supplier allergen notice.',
      ru: 'Тыквенный суп вместо риса — уведомление поставщика об аллергене.',
    },
  },
]

export const holidays = [
  {
    date: '2026-09-13',
    title: { he: 'ערב ראש השנה', en: 'Erev Rosh Hashanah', ru: 'Канун Рош һа-Шана' },
  },
  {
    date: '2026-09-14',
    title: { he: 'ראש השנה', en: 'Rosh Hashanah', ru: 'Рош һа-Шана' },
  },
  {
    date: '2026-09-23',
    title: { he: 'ערב יום כיפור', en: 'Erev Yom Kippur', ru: 'Канун Йом-Кипура' },
  },
]

export const weekMenu = [
  { day: { he: 'ראשון', en: 'Sunday', ru: 'Воскресенье' }, dish: { he: 'פתיתים וירקות', en: 'Pasta and vegetables', ru: 'Паста с овощами' } },
  { day: { he: 'שני', en: 'Monday', ru: 'Понедельник' }, dish: { he: 'אורז עם גזר', en: 'Rice with carrots', ru: 'Рис с морковью' } },
  { day: { he: 'שלישי', en: 'Tuesday', ru: 'Вторник' }, dish: { he: 'שקשוקה רכה', en: 'Gentle shakshuka', ru: 'Мягкая шакшука' } },
  { day: { he: 'רביעי', en: 'Wednesday', ru: 'Среда' }, dish: { he: 'מרק דלעת', en: 'Pumpkin soup', ru: 'Тыквенный суп' } },
  { day: { he: 'חמישי', en: 'Thursday', ru: 'Четверг' }, dish: { he: 'קוסקוס וקטניות', en: 'Couscous and legumes', ru: 'Кус-кус с бобовыми' } },
  { day: { he: 'שישי', en: 'Friday', ru: 'Пятница' }, dish: { he: 'חלה ומרק עוף', en: 'Challah and chicken soup', ru: 'Хала и куриный суп' } },
]

export const staff = [
  {
    id: 's1',
    role: { he: 'מנהלת', en: 'Director', ru: 'Директор' },
    name: { he: 'רבקה לוי', en: 'Rivka Levi', ru: 'Рівка Леви' },
    bio: {
      he: 'עשר שנים בחינוך חב״ד. מדברת עברית, אנגלית ורוסית עם ההורים.',
      en: 'Ten years in Chabad education. Speaks Hebrew, English and Russian with parents.',
      ru: 'Десять лет в образовании Хабад. С родителями говорит на иврите, английском и русском.',
    },
  },
  {
    id: 's2',
    role: { he: 'גננת ראשית', en: 'Lead teacher', ru: 'Старший воспитатель' },
    name: { he: 'חיה גולד', en: 'Chaya Gold', ru: 'Хая Гольд' },
    bio: {
      he: 'אחראית על הגיל הרך. שמה לב לפרידה בבוקר ולשינה בצהריים.',
      en: 'Leads early years. Pays attention to morning goodbye and afternoon rest.',
      ru: 'Отвечает за малышей. Следит за утренним прощанием и дневным сном.',
    },
  },
  {
    id: 's3',
    role: { he: 'מחנך כיתה ב׳', en: 'Grade 2 teacher', ru: 'Учитель 2 класса' },
    name: { he: 'יוסף מזרחי', en: 'Yosef Mizrahi', ru: 'Йосеф Мизрахи' },
    bio: {
      he: 'מלמד קודש וחול באותו קול. בחצר הוא הראשון עם הכדור.',
      en: 'Teaches Torah and general studies in the same voice. First with the ball in the yard.',
      ru: 'Преподаёт Тору и светские предметы одним голосом. Во дворе первым берёт мяч.',
    },
  },
]

export const quotes = [
  {
    id: 'q1',
    text: {
      he: 'הילדה חוזרת הביתה רגועה. זה כל מה שביקשתי, בלי מילים גדולות.',
      en: 'Our daughter comes home calm. That is all we asked for — without big words.',
      ru: 'Дочь возвращается домой спокойной. Это всё, что мы просили — без громких слов.',
    },
    by: {
      he: 'אם בגן, משפחה דוברת רוסית',
      en: 'A gan mother, Russian-speaking family',
      ru: 'Мама из сада, русскоязычная семья',
    },
  },
]

export const parentDemo = {
  email: 'parent@demo.local',
  password: 'demo',
  name: { he: 'מיכל כהן', en: 'Michal Cohen', ru: 'Михаль Коэн' },
}

export const adminDemo = {
  email: 'admin@demo.local',
  password: 'demo',
  name: { he: 'רבקה לוי', en: 'Rivka Levi', ru: 'Рівка Леви' },
}

export const children = [
  {
    id: 'noa',
    track: 'gan' as const,
    tariffId: 'full',
    name: { he: 'נעה כהן', en: 'Noa Cohen', ru: 'Ноа Коэн' },
    birthDate: '2022-03-14',
    medical: {
      he: 'אלרגיה לבוטנים. אין אפיפן בתיק — החלטה עם ההורים.',
      en: 'Peanut allergy. No EpiPen in the bag — decided with parents.',
      ru: 'Аллергия на арахис. Эпипен в сумке нет — решение с родителями.',
    },
    extra: {
      he: 'אוהבת מים וציור. נרדמת טוב יותר עם שיר שקט.',
      en: 'Loves water and drawing. Falls asleep more easily with a quiet song.',
      ru: 'Любит воду и рисование. Легче засыпает под тихую песню.',
    },
    teacher: { he: 'חיה גולד', en: 'Chaya Gold', ru: 'Хая Гольд' },
  },
  {
    id: 'yosef',
    track: 'school' as const,
    tariffId: 'school',
    name: { he: 'יוסף כהן', en: 'Yosef Cohen', ru: 'Йосеф Коэн' },
    birthDate: '2018-11-02',
    medical: {
      he: 'אין מגבלות. משקפיים לקריאה בלבד.',
      en: 'No restrictions. Glasses for reading only.',
      ru: 'Ограничений нет. Очки только для чтения.',
    },
    extra: {
      he: 'אוהב כדורגל בחצר וסיפורי חסידים קצרים.',
      en: 'Loves yard football and short Chassidic stories.',
      ru: 'Любит футбол во дворе и короткие хасидские истории.',
    },
    teacher: { he: 'יוסף מזרחי', en: 'Yosef Mizrahi', ru: 'Йосеф Мизрахи' },
  },
]

export const parentContacts = [
  { name: { he: 'מיכל כהן', en: 'Michal Cohen', ru: 'Михаль Коэн' }, phone: '050-555-0148', relation: { he: 'אם', en: 'Mother', ru: 'Мама' } },
  { name: { he: 'דוד כהן', en: 'David Cohen', ru: 'Давид Коэн' }, phone: '052-555-0190', relation: { he: 'אב', en: 'Father', ru: 'Папа' } },
]

export const documents = [
  { id: 'd1', title: { he: 'חוזה 2026', en: 'Contract 2026', ru: 'Договор 2026' } },
  { id: 'd2', title: { he: 'הסכמה לצילום', en: 'Photo consent', ru: 'Согласие на фото' } },
  { id: 'd3', title: { he: 'הצהרת בריאות', en: 'Health declaration', ru: 'Мед. декларация' } },
]

export const reminders = [
  {
    id: 'r1',
    title: { he: 'מחר — ציוד לציור בגן', en: 'Tomorrow — art smock for gan', ru: 'Завтра — фартук для рисования' },
  },
  {
    id: 'r2',
    title: { he: 'יום ראשון — תשלום יתרת אוגוסט', en: 'Sunday — August balance due', ru: 'В воскресенье — остаток за август' },
  },
]

export const upcoming = [
  { id: 'u1', childId: 'noa', when: '08:00', title: { he: 'מעגל בוקר', en: 'Morning circle', ru: 'Утренний круг' } },
  { id: 'u2', childId: 'noa', when: '15:15', title: { he: 'חוג אמנות', en: 'Art club', ru: 'Кружок искусства' } },
  { id: 'u3', childId: 'yosef', when: '10:00', title: { he: 'פרשה', en: 'Parsha', ru: 'Недельная глава' } },
]

export const clubs = [
  {
    id: 'art',
    childIds: ['noa'],
    capacity: 8,
    taken: 7,
    price: 180,
    title: { he: 'אמנות', en: 'Art', ru: 'Искусство' },
    when: { he: 'א׳ 15:15', en: 'Sun 15:15', ru: 'вс 15:15' },
  },
  {
    id: 'music',
    childIds: ['noa', 'yosef'],
    capacity: 6,
    taken: 6,
    price: 200,
    title: { he: 'מוזיקה', en: 'Music', ru: 'Музыка' },
    when: { he: 'ג׳ 15:15', en: 'Tue 15:15', ru: 'вт 15:15' },
  },
  {
    id: 'judo',
    childIds: ['yosef'],
    capacity: 10,
    taken: 4,
    price: 220,
    title: { he: 'תנועה', en: 'Movement', ru: 'Движение' },
    when: { he: 'ד׳ 15:30', en: 'Wed 15:30', ru: 'ср 15:30' },
  },
  {
    id: 'parsha',
    childIds: ['yosef'],
    capacity: 12,
    taken: 9,
    price: 120,
    title: { he: 'חוג פרשה', en: 'Parsha club', ru: 'Кружок главы недели' },
    when: { he: 'ה׳ 14:00', en: 'Thu 14:00', ru: 'чт 14:00' },
  },
]

export const defaultClubState: Record<string, EnrollmentStatus> = {
  art: 'enrolled',
  music: 'waiting',
  judo: 'none',
  parsha: 'enrolled',
}

export const paymentsSeed = [
  { id: 'p1', date: '2026-07-05', amount: 2980, note: { he: 'יולי · נעה + חוג', en: 'July · Noa + club', ru: 'Июль · Ноа + кружок' } },
  { id: 'p2', date: '2026-08-04', amount: 2500, note: { he: 'אוגוסט חלקי · נעה', en: 'Partial August · Noa', ru: 'Частично август · Ноа' } },
  { id: 'p3', date: '2026-08-04', amount: 2320, note: { he: 'אוגוסט · יוסף + פרשה', en: 'August · Yosef + parsha', ru: 'Август · Йосеф + глава' } },
]

export const invoices = {
  noa: { tariff: 2800, extras: 180, paid: 2500 },
  yosef: { tariff: 2200, extras: 120, paid: 2320 },
}

export const achievements = [
  {
    childId: 'noa',
    title: { he: 'שרה לבד במעגל', en: 'Sang alone in the circle', ru: 'Спела одна в кругу' },
  },
  {
    childId: 'yosef',
    title: { he: 'עזר לילד חדש בחצר', en: 'Helped a new child in the yard', ru: 'Помог новому ребёнку во дворе' },
  },
]

export const developmentNotes = [
  {
    childId: 'noa',
    body: {
      he: 'מצב רוח טוב. אוכלת יציב. נפרדת בבוקר אחרי חיבוק אחד.',
      en: 'Good mood. Eating steadily. Parts in the morning after one hug.',
      ru: 'Настроение хорошее. Ест стабильно. Утром прощается после одного объятия.',
    },
  },
  {
    childId: 'yosef',
    body: {
      he: 'קשוב בפרשה. בחצר לפעמים צריך תזכורת על תור.',
      en: 'Attentive in parsha. In the yard sometimes needs a reminder about taking turns.',
      ru: 'Внимателен на главе недели. Во дворе иногда нужно напомнить про очередь.',
    },
  },
]

export const teacherComments = [
  {
    childId: 'noa',
    body: {
      he: 'נעה מוצאת מקום שקט ליד החלון כשיש רעש. כדאי להמשיך כך.',
      en: 'Noa finds a quiet place by the window when it is noisy. Worth keeping.',
      ru: 'Ноа находит тихое место у окна, когда шумно. Стоит продолжать.',
    },
  },
  {
    childId: 'yosef',
    body: {
      he: 'יוסף שואל שאלות טובות. אפשר לתת לו להקריא שורה בבית.',
      en: 'Yosef asks good questions. He can read a line at home.',
      ru: 'Йосеф задаёт хорошие вопросы. Можно дать ему прочитать строку дома.',
    },
  },
]

export const seedMessages = {
  teacher: [
    {
      id: 'm1',
      from: 'staff' as const,
      text: {
        he: 'נעה אכלה הכל היום, כולל הירקות.',
        en: 'Noa ate everything today, including the vegetables.',
        ru: 'Ноа сегодня всё съела, включая овощи.',
      },
      at: '2026-08-19T11:40:00',
    },
    {
      id: 'm2',
      from: 'parent' as const,
      text: {
        he: 'תודה. מחר נאסוף קצת יותר מוקדם, ב־15:30.',
        en: 'Thank you. Tomorrow we will pick up a little earlier, at 15:30.',
        ru: 'Спасибо. Завтра заберём чуть раньше, в 15:30.',
      },
      at: '2026-08-19T12:02:00',
    },
  ],
  admin: [
    {
      id: 'm3',
      from: 'staff' as const,
      text: {
        he: 'יתרת אוגוסט לנעה: 480 ₪. אפשר לשלם בפורטל.',
        en: 'August balance for Noa: ₪480. You can pay in the portal.',
        ru: 'Остаток за август по Ноа: 480 ₪. Можно оплатить в кабинете.',
      },
      at: '2026-08-18T09:10:00',
    },
  ],
}

export const gallery = [
  { src: 'images/gan-classroom.png', caption: { he: 'הגן בבוקר', en: 'The gan in the morning', ru: 'Сад утром' } },
  { src: 'images/school-classroom.png', caption: { he: 'כיתה בבית הספר', en: 'A school classroom', ru: 'Класс в школе' } },
  { src: 'images/garden-activity.png', caption: { he: 'גינת התבלינים', en: 'The herb garden', ru: 'Огород пряностей' } },
  { src: 'images/shabbat-table.png', caption: { he: 'קבלת שבת', en: 'Kabbalat Shabbat', ru: 'Встреча шаббата' } },
]

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function isoDate(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`
}

export function buildMonthDays(year: number, month: number): { date: string; status: AttendanceStatus }[] {
  const last = new Date(year, month, 0).getDate()
  const rows: { date: string; status: AttendanceStatus }[] = []
  for (let day = 1; day <= last; day++) {
    const date = new Date(year, month - 1, day)
    const wd = date.getDay()
    let status: AttendanceStatus = 'present'
    if (wd === 6) status = 'off'
    else if (wd === 5) status = day % 2 === 0 ? 'present' : 'present'
    if (day === 5) status = 'sick'
    if (day === 12) status = 'vacation'
    if (day === 6 && wd !== 6) status = 'absent'
    rows.push({ date: isoDate(year, month, day), status })
  }
  return rows
}

export const attendanceSeed = {
  noa: buildMonthDays(2026, 8),
  yosef: buildMonthDays(2026, 8).map((row) =>
    row.date === '2026-08-05' ? { ...row, status: 'present' as const } : row,
  ),
}
