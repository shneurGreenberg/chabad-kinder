import { useEffect } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PortalLayout } from './components/PortalLayout'
import { PublicLayout } from './components/PublicLayout'
import { dirOf, isLang } from './lib/locale'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { EnrollmentWizard } from './pages/EnrollmentWizard'
import { FaqPage } from './pages/FaqPage'
import { GanPage } from './pages/GanPage'
import { HomePage } from './pages/HomePage'
import { LifePage } from './pages/LifePage'
import { LoginPage } from './pages/LoginPage'
import { SchoolPage } from './pages/SchoolPage'
import { AttendancePage } from './pages/portal/AttendancePage'
import { ChildPage } from './pages/portal/ChildPage'
import { ClubsPage } from './pages/portal/ClubsPage'
import { DashboardPage } from './pages/portal/DashboardPage'
import { FinancePage } from './pages/portal/FinancePage'
import { MessagesPage } from './pages/portal/MessagesPage'
import { PhotosPage } from './pages/portal/PhotosPage'
import i18n from './i18n'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function LocaleLayout() {
  const { lang } = useParams()
  const valid = isLang(lang)

  useEffect(() => {
    if (!valid) return
    void i18n.changeLanguage(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = dirOf(lang)
    document.title = lang === 'he' ? 'חב״ד קינדר' : lang === 'ru' ? 'Хабад Киндер' : 'Chabad Kinder'
  }, [lang, valid])

  if (!valid) return <Navigate to="/he" replace />
  return <Outlet />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Navigate to="/he" replace />} />
          <Route path="/:lang" element={<LocaleLayout />}>
            <Route element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="gan" element={<GanPage />} />
              <Route path="school" element={<SchoolPage />} />
              <Route path="life" element={<LifePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="apply" element={<EnrollmentWizard />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="portal" element={<PortalLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="child" element={<ChildPage />} />
              <Route path="attendance" element={<AttendancePage />} />
              <Route path="finance" element={<FinancePage />} />
              <Route path="clubs" element={<ClubsPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="photos" element={<PhotosPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/he" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
