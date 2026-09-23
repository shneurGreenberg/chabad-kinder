import { type FormEvent, useState } from 'react'
import { Button, Card, Field, inputClass } from '../../components/ui'
import { useContent } from '../../context/ContentContext'
import { useLang } from '../../lib/hooks'
import type { Text } from '../../data/mock'

type Tab = 'hero' | 'stats' | 'values' | 'quotes' | 'gan' | 'school' | 'staff' | 'gallery' | 'news' | 'menu' | 'contact' | 'about' | 'export'

export function AdminContent() {
  const lang = useLang()
  const { content, updateHomepageHero, updateStat, addStat, removeStat, updateValue, addValue, removeValue, 
    updateQuote, addQuote, removeQuote, updateGanProgram, addGanProgram, removeGanProgram,
    updateSchoolProgram, addSchoolProgram, removeSchoolProgram, updateStaff, addStaff, removeStaff,
    updateGallery, addGallery, removeGallery, updateNews, addNews, removeNews, updateMenu,
    updateContact, updateAbout, exportContent, importContent, resetToDefaults } = useContent()
  const [activeTab, setActiveTab] = useState<Tab>('hero')
  const [editingId, setEditingId] = useState<string | null>(null)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'hero', label: 'כותרת ראשית' },
    { key: 'stats', label: 'סטטיסטיקות' },
    { key: 'values', label: 'ערכים' },
    { key: 'quotes', label: 'ציטוטים' },
    { key: 'gan', label: 'מסלולי גן' },
    { key: 'school', label: 'מסלולי בית ספר' },
    { key: 'staff', label: 'צוות' },
    { key: 'gallery', label: 'גלריה' },
    { key: 'news', label: 'חדשות' },
    { key: 'menu', label: 'תפריט' },
    { key: 'contact', label: 'יצירת קשר' },
    { key: 'about', label: 'אודות' },
    { key: 'export', label: 'ייצוא/ייבוא' },
  ]

  function getTextValue(text: Text, lang: 'he' | 'en' | 'ru'): string {
    return text[lang] || ''
  }

  function textFromForm(data: FormData, prefix: string): Text {
    return {
      he: String(data.get(`${prefix}_he`) || ''),
      en: String(data.get(`${prefix}_en`) || ''),
      ru: String(data.get(`${prefix}_ru`) || ''),
    }
  }

  function renderTextFields(label: string, prefix: string, value: Text) {
    return (
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-navy">{label}</label>
        <input name={`${prefix}_he`} placeholder="עברית" defaultValue={value.he} className={inputClass} />
        <input name={`${prefix}_en`} placeholder="English" defaultValue={value.en} className={inputClass} />
        <input name={`${prefix}_ru`} placeholder="Русский" defaultValue={value.ru} className={inputClass} />
      </div>
    )
  }

  function handleHeroSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    updateHomepageHero({
      kicker: textFromForm(data, 'kicker'),
      title: textFromForm(data, 'title'),
      lead: textFromForm(data, 'lead'),
    })
  }

  function handleStatSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (editingId) {
      updateStat(editingId, {
        number: textFromForm(data, 'number'),
        description: textFromForm(data, 'description'),
      })
      setEditingId(null)
    } else {
      addStat({
        number: textFromForm(data, 'number'),
        description: textFromForm(data, 'description'),
      })
    }
    e.currentTarget.reset()
  }

  function handleValueSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (editingId) {
      updateValue(editingId, {
        title: textFromForm(data, 'title'),
        description: textFromForm(data, 'description'),
      })
      setEditingId(null)
    } else {
      addValue({
        title: textFromForm(data, 'title'),
        description: textFromForm(data, 'description'),
      })
    }
    e.currentTarget.reset()
  }

  function handleQuoteSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (editingId) {
      updateQuote(editingId, {
        text: textFromForm(data, 'text'),
        by: textFromForm(data, 'by'),
      })
      setEditingId(null)
    } else {
      addQuote({
        text: textFromForm(data, 'text'),
        by: textFromForm(data, 'by'),
      })
    }
    e.currentTarget.reset()
  }

  function handleGanProgramSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const programData = {
      name: textFromForm(data, 'name'),
      description: textFromForm(data, 'description'),
      amount: Number(data.get('amount')),
      unit: String(data.get('unit')) as 'month' | 'hour' | 'day',
      active: data.get('active') === 'on',
    }
    if (editingId) {
      updateGanProgram(editingId, programData)
      setEditingId(null)
    } else {
      addGanProgram(programData)
    }
    e.currentTarget.reset()
  }

  function handleSchoolProgramSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const programData = {
      name: textFromForm(data, 'name'),
      description: textFromForm(data, 'description'),
      grades: textFromForm(data, 'grades'),
      active: data.get('active') === 'on',
    }
    if (editingId) {
      updateSchoolProgram(editingId, programData)
      setEditingId(null)
    } else {
      addSchoolProgram(programData)
    }
    e.currentTarget.reset()
  }

  function handleStaffSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const staffData = {
      role: textFromForm(data, 'role'),
      name: textFromForm(data, 'name'),
      bio: textFromForm(data, 'bio'),
      active: data.get('active') === 'on',
    }
    if (editingId) {
      updateStaff(editingId, staffData)
      setEditingId(null)
    } else {
      addStaff(staffData)
    }
    e.currentTarget.reset()
  }

  function handleGallerySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const galleryData = {
      src: String(data.get('src') || ''),
      caption: textFromForm(data, 'caption'),
      order: Number(data.get('order') || 0),
    }
    if (editingId) {
      updateGallery(editingId, galleryData)
      setEditingId(null)
    } else {
      addGallery(galleryData)
    }
    e.currentTarget.reset()
  }

  function handleNewsSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const newsData = {
      date: String(data.get('date') || new Date().toISOString().slice(0, 10)),
      title: textFromForm(data, 'title'),
      body: textFromForm(data, 'body'),
    }
    if (editingId) {
      updateNews(editingId, newsData)
      setEditingId(null)
    } else {
      addNews(newsData)
    }
    e.currentTarget.reset()
  }

  function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    updateContact({
      hours: textFromForm(data, 'hours'),
      address: textFromForm(data, 'address'),
      phone: textFromForm(data, 'phone'),
      email: textFromForm(data, 'email'),
    })
  }

  function handleAboutSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    updateAbout({
      mission: textFromForm(data, 'mission'),
      history: textFromForm(data, 'history'),
      values: textFromForm(data, 'values'),
    })
  }

  function handleExport() {
    const json = exportContent()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `site-content-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const file = data.get('file') as File
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const json = ev.target?.result as string
      if (importContent(json)) {
        alert('תוכן יובא בהצלחה!')
      } else {
        alert('שגיאה בייבוא תוכן')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="grid gap-6">
      <h1 className="font-display text-3xl text-navy">ניהול תוכן אתר</h1>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key)
              setEditingId(null)
            }}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.key
                ? 'bg-navy text-cream'
                : 'bg-cream text-navy hover:bg-navy/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'hero' && (
        <Card>
          <h2 className="font-display text-xl text-navy">כותרת ראשית דף הבית</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleHeroSubmit}>
            {renderTextFields('כותרת עליונה', 'kicker', content.homepage.hero.kicker)}
            {renderTextFields('כותרת ראשית', 'title', content.homepage.hero.title)}
            {renderTextFields('טקסט הסבר', 'lead', content.homepage.hero.lead)}
            <Button type="submit">שמור</Button>
          </form>
        </Card>
      )}

      {activeTab === 'stats' && (
        <Card>
          <h2 className="font-display text-xl text-navy">סטטיסטיקות</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleStatSubmit}>
            {renderTextFields('מספר/כותרת', 'number', editingId ? content.homepage.stats.find(s => s.id === editingId)!.number : { he: '', en: '', ru: '' })}
            {renderTextFields('תיאור', 'description', editingId ? content.homepage.stats.find(s => s.id === editingId)!.description : { he: '', en: '', ru: '' })}
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'עדכן' : 'הוסף'}</Button>
              {editingId && <Button type="button" variant="navy" onClick={() => setEditingId(null)}>ביטול</Button>}
            </div>
          </form>
          <ul className="mt-6 grid gap-2">
            {content.homepage.stats.map((stat) => (
              <li key={stat.id} className="flex items-start justify-between rounded-2xl bg-cream px-4 py-3">
                <div>
                  <p className="font-semibold text-navy">{getTextValue(stat.number, lang)}</p>
                  <p className="text-sm text-muted">{getTextValue(stat.description, lang)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(stat.id)} className="text-sm text-navy hover:underline">ערוך</button>
                  <button onClick={() => removeStat(stat.id)} className="text-sm text-red-600 hover:underline">מחק</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {activeTab === 'values' && (
        <Card>
          <h2 className="font-display text-xl text-navy">ערכים</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleValueSubmit}>
            {renderTextFields('כותרת', 'title', editingId ? content.homepage.values.find(v => v.id === editingId)!.title : { he: '', en: '', ru: '' })}
            {renderTextFields('תיאור', 'description', editingId ? content.homepage.values.find(v => v.id === editingId)!.description : { he: '', en: '', ru: '' })}
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'עדכן' : 'הוסף'}</Button>
              {editingId && <Button type="button" variant="navy" onClick={() => setEditingId(null)}>ביטול</Button>}
            </div>
          </form>
          <ul className="mt-6 grid gap-2">
            {content.homepage.values.map((value) => (
              <li key={value.id} className="flex items-start justify-between rounded-2xl bg-cream px-4 py-3">
                <div>
                  <p className="font-semibold text-navy">{getTextValue(value.title, lang)}</p>
                  <p className="text-sm text-muted">{getTextValue(value.description, lang)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(value.id)} className="text-sm text-navy hover:underline">ערוך</button>
                  <button onClick={() => removeValue(value.id)} className="text-sm text-red-600 hover:underline">מחק</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {activeTab === 'quotes' && (
        <Card>
          <h2 className="font-display text-xl text-navy">ציטוטים</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleQuoteSubmit}>
            {renderTextFields('טקסט ציטוט', 'text', editingId ? content.homepage.quotes.find(q => q.id === editingId)!.text : { he: '', en: '', ru: '' })}
            {renderTextFields('מאת', 'by', editingId ? content.homepage.quotes.find(q => q.id === editingId)!.by : { he: '', en: '', ru: '' })}
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'עדכן' : 'הוסף'}</Button>
              {editingId && <Button type="button" variant="navy" onClick={() => setEditingId(null)}>ביטול</Button>}
            </div>
          </form>
          <ul className="mt-6 grid gap-2">
            {content.homepage.quotes.map((quote) => (
              <li key={quote.id} className="flex items-start justify-between rounded-2xl bg-cream px-4 py-3">
                <div>
                  <p className="italic text-navy">"{getTextValue(quote.text, lang)}"</p>
                  <p className="mt-1 text-sm text-gold">— {getTextValue(quote.by, lang)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(quote.id)} className="text-sm text-navy hover:underline">ערוך</button>
                  <button onClick={() => removeQuote(quote.id)} className="text-sm text-red-600 hover:underline">מחק</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {activeTab === 'gan' && (
        <Card>
          <h2 className="font-display text-xl text-navy">מסלולי גן</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleGanProgramSubmit}>
            {renderTextFields('שם מסלול', 'name', editingId ? content.programs.gan.find(p => p.id === editingId)!.name : { he: '', en: '', ru: '' })}
            {renderTextFields('תיאור', 'description', editingId ? content.programs.gan.find(p => p.id === editingId)!.description : { he: '', en: '', ru: '' })}
            <Field label="מחיר">
              <input type="number" name="amount" defaultValue={editingId ? content.programs.gan.find(p => p.id === editingId)!.amount : 0} className={inputClass} />
            </Field>
            <Field label="יחידה">
              <select name="unit" defaultValue={editingId ? content.programs.gan.find(p => p.id === editingId)!.unit : 'month'} className={inputClass}>
                <option value="month">חודש</option>
                <option value="hour">שעה</option>
                <option value="day">יום</option>
              </select>
            </Field>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="active" defaultChecked={editingId ? content.programs.gan.find(p => p.id === editingId)!.active : true} />
              <span>פעיל</span>
            </label>
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'עדכן' : 'הוסף'}</Button>
              {editingId && <Button type="button" variant="navy" onClick={() => setEditingId(null)}>ביטול</Button>}
            </div>
          </form>
          <ul className="mt-6 grid gap-2">
            {content.programs.gan.map((program) => (
              <li key={program.id} className="flex items-start justify-between rounded-2xl bg-cream px-4 py-3">
                <div>
                  <p className="font-semibold text-navy">{getTextValue(program.name, lang)}</p>
                  <p className="text-sm text-muted">{getTextValue(program.description, lang)}</p>
                  <p className="mt-1 text-sm text-gold">{program.amount}₪ / {program.unit}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(program.id)} className="text-sm text-navy hover:underline">ערוך</button>
                  <button onClick={() => removeGanProgram(program.id)} className="text-sm text-red-600 hover:underline">מחק</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {activeTab === 'school' && (
        <Card>
          <h2 className="font-display text-xl text-navy">מסלולי בית ספר</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleSchoolProgramSubmit}>
            {renderTextFields('שם מסלול', 'name', editingId ? content.programs.school.find(p => p.id === editingId)!.name : { he: '', en: '', ru: '' })}
            {renderTextFields('תיאור', 'description', editingId ? content.programs.school.find(p => p.id === editingId)!.description : { he: '', en: '', ru: '' })}
            {renderTextFields('כיתות', 'grades', editingId ? content.programs.school.find(p => p.id === editingId)!.grades : { he: '', en: '', ru: '' })}
            <label className="flex items-center gap-2">
              <input type="checkbox" name="active" defaultChecked={editingId ? content.programs.school.find(p => p.id === editingId)!.active : true} />
              <span>פעיל</span>
            </label>
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'עדכן' : 'הוסף'}</Button>
              {editingId && <Button type="button" variant="navy" onClick={() => setEditingId(null)}>ביטול</Button>}
            </div>
          </form>
          <ul className="mt-6 grid gap-2">
            {content.programs.school.map((program) => (
              <li key={program.id} className="flex items-start justify-between rounded-2xl bg-cream px-4 py-3">
                <div>
                  <p className="font-semibold text-navy">{getTextValue(program.name, lang)}</p>
                  <p className="text-sm text-muted">{getTextValue(program.description, lang)}</p>
                  <p className="mt-1 text-sm text-gold">{getTextValue(program.grades, lang)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(program.id)} className="text-sm text-navy hover:underline">ערוך</button>
                  <button onClick={() => removeSchoolProgram(program.id)} className="text-sm text-red-600 hover:underline">מחק</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {activeTab === 'staff' && (
        <Card>
          <h2 className="font-display text-xl text-navy">צוות</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleStaffSubmit}>
            {renderTextFields('תפקיד', 'role', editingId ? content.staff.find(s => s.id === editingId)!.role : { he: '', en: '', ru: '' })}
            {renderTextFields('שם', 'name', editingId ? content.staff.find(s => s.id === editingId)!.name : { he: '', en: '', ru: '' })}
            {renderTextFields('ביוגרפיה', 'bio', editingId ? content.staff.find(s => s.id === editingId)!.bio : { he: '', en: '', ru: '' })}
            <label className="flex items-center gap-2">
              <input type="checkbox" name="active" defaultChecked={editingId ? content.staff.find(s => s.id === editingId)!.active : true} />
              <span>פעיל</span>
            </label>
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'עדכן' : 'הוסף'}</Button>
              {editingId && <Button type="button" variant="navy" onClick={() => setEditingId(null)}>ביטול</Button>}
            </div>
          </form>
          <ul className="mt-6 grid gap-2">
            {content.staff.filter(s => s.active).map((person) => (
              <li key={person.id} className="flex items-start justify-between rounded-2xl bg-cream px-4 py-3">
                <div>
                  <p className="text-sm text-gold">{getTextValue(person.role, lang)}</p>
                  <p className="font-semibold text-navy">{getTextValue(person.name, lang)}</p>
                  <p className="text-sm text-muted">{getTextValue(person.bio, lang)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(person.id)} className="text-sm text-navy hover:underline">ערוך</button>
                  <button onClick={() => removeStaff(person.id)} className="text-sm text-red-600 hover:underline">מחק</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {activeTab === 'gallery' && (
        <Card>
          <h2 className="font-display text-xl text-navy">גלריה</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleGallerySubmit}>
            <Field label="נתיב תמונה (images/...)">
              <input name="src" defaultValue={editingId ? content.gallery.find(g => g.id === editingId)!.src : ''} className={inputClass} />
            </Field>
            {renderTextFields('כיתוב', 'caption', editingId ? content.gallery.find(g => g.id === editingId)!.caption : { he: '', en: '', ru: '' })}
            <Field label="סדר תצוגה">
              <input type="number" name="order" defaultValue={editingId ? content.gallery.find(g => g.id === editingId)!.order : 0} className={inputClass} />
            </Field>
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'עדכן' : 'הוסף'}</Button>
              {editingId && <Button type="button" variant="navy" onClick={() => setEditingId(null)}>ביטול</Button>}
            </div>
          </form>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {content.gallery.sort((a, b) => a.order - b.order).map((item) => (
              <div key={item.id} className="rounded-2xl bg-cream p-3">
                <div className="relative">
                  <img src={`/chabad-kinder/${item.src}`} alt={getTextValue(item.caption, lang)} className="h-40 w-full rounded-lg object-cover" />
                </div>
                <p className="mt-2 text-sm text-navy">{getTextValue(item.caption, lang)}</p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => setEditingId(item.id)} className="text-sm text-navy hover:underline">ערוך</button>
                  <button onClick={() => removeGallery(item.id)} className="text-sm text-red-600 hover:underline">מחק</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'news' && (
        <Card>
          <h2 className="font-display text-xl text-navy">חדשות ועדכונים</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleNewsSubmit}>
            <Field label="תאריך">
              <input type="date" name="date" defaultValue={editingId ? content.news.find(n => n.id === editingId)!.date : new Date().toISOString().slice(0, 10)} className={inputClass} />
            </Field>
            {renderTextFields('כותרת', 'title', editingId ? content.news.find(n => n.id === editingId)!.title : { he: '', en: '', ru: '' })}
            {renderTextFields('תוכן', 'body', editingId ? content.news.find(n => n.id === editingId)!.body : { he: '', en: '', ru: '' })}
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'עדכן' : 'הוסף'}</Button>
              {editingId && <Button type="button" variant="navy" onClick={() => setEditingId(null)}>ביטול</Button>}
            </div>
          </form>
          <ul className="mt-6 grid gap-2">
            {content.news.map((item) => (
              <li key={item.id} className="flex items-start justify-between rounded-2xl bg-cream px-4 py-3">
                <div>
                  <p className="text-xs text-gold">{item.date}</p>
                  <p className="font-semibold text-navy">{getTextValue(item.title, lang)}</p>
                  <p className="text-sm text-muted">{getTextValue(item.body, lang)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(item.id)} className="text-sm text-navy hover:underline">ערוך</button>
                  <button onClick={() => removeNews(item.id)} className="text-sm text-red-600 hover:underline">מחק</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {activeTab === 'menu' && (
        <Card>
          <h2 className="font-display text-xl text-navy">תפריט שבועי</h2>
          <div className="mt-4 grid gap-3">
            {content.menu.map((row) => (
              <div key={row.id} className="grid gap-2 rounded-2xl bg-cream p-3">
                <p className="font-semibold text-navy">{getTextValue(row.day, lang)}</p>
                <input
                  placeholder="עברית"
                  defaultValue={row.dish.he}
                  onBlur={(e) => updateMenu(row.id, { ...row.dish, he: e.target.value })}
                  className={inputClass}
                />
                <input
                  placeholder="English"
                  defaultValue={row.dish.en}
                  onBlur={(e) => updateMenu(row.id, { ...row.dish, en: e.target.value })}
                  className={inputClass}
                />
                <input
                  placeholder="Русский"
                  defaultValue={row.dish.ru}
                  onBlur={(e) => updateMenu(row.id, { ...row.dish, ru: e.target.value })}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'contact' && (
        <Card>
          <h2 className="font-display text-xl text-navy">יצירת קשר</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleContactSubmit}>
            {renderTextFields('שעות פעילות', 'hours', content.contact.hours)}
            {renderTextFields('כתובת', 'address', content.contact.address)}
            {renderTextFields('טלפון', 'phone', content.contact.phone)}
            {renderTextFields('אימייל', 'email', content.contact.email)}
            <Button type="submit">שמור</Button>
          </form>
        </Card>
      )}

      {activeTab === 'about' && (
        <Card>
          <h2 className="font-display text-xl text-navy">אודות המוסד</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleAboutSubmit}>
            {renderTextFields('משימה', 'mission', content.about.mission)}
            {renderTextFields('היסטוריה', 'history', content.about.history)}
            {renderTextFields('ערכים', 'values', content.about.values)}
            <Button type="submit">שמור</Button>
          </form>
        </Card>
      )}

      {activeTab === 'export' && (
        <Card>
          <h2 className="font-display text-xl text-navy">ייצוא וייבוא תוכן</h2>
          <div className="mt-4 grid gap-4">
            <div>
              <p className="text-sm text-muted mb-2">ייצא את כל תוכן האתר לקובץ JSON</p>
              <Button onClick={handleExport}>ייצא תוכן</Button>
            </div>
            <form onSubmit={handleImport} className="grid gap-2">
              <p className="text-sm text-muted">ייבא תוכן מקובץ JSON (יחליף את התוכן הקיים)</p>
              <input type="file" name="file" accept=".json" className={inputClass} />
              <Button type="submit">ייבא תוכן</Button>
            </form>
            <div>
              <p className="text-sm text-muted mb-2">איפוס לתוכן ברירת מחדל</p>
              <Button variant="navy" onClick={() => {
                if (confirm('האם אתה בטוח? זה ימחק את כל השינויים שלך!')) {
                  resetToDefaults()
                }
              }}>איפוס לברירת מחדל</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
