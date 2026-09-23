import { type FormEvent, useState } from 'react'
import { Button, Card, Field, inputClass } from '../../components/ui'
import { useContent } from '../../context/ContentContext'
import { GitHubService, loadGitHubConfig, saveGitHubConfig, clearGitHubConfig, type GitHubConfig } from '../../lib/github'

export function AdminGitHub() {
  const { content } = useContent()
  const [config, setConfig] = useState<GitHubConfig | null>(loadGitHubConfig())
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [pushStatus, setPushStatus] = useState<'idle' | 'pushing' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string>('')

  async function handleSaveConfig(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const newConfig: GitHubConfig = {
      token: String(data.get('token') || ''),
      owner: String(data.get('owner') || ''),
      repo: String(data.get('repo') || ''),
      branch: String(data.get('branch') || 'main'),
    }
    saveGitHubConfig(newConfig)
    setConfig(newConfig)
    setTestStatus('idle')
    setError('')
  }

  async function handleTestConnection() {
    if (!config) return
    setTestStatus('testing')
    setError('')
    try {
      const service = new GitHubService(config)
      const success = await service.testConnection()
      setTestStatus(success ? 'success' : 'error')
      if (!success) {
        setError('חיבור נכשל. בדוק את הטוקן וההרשאות.')
      }
    } catch (err) {
      setTestStatus('error')
      setError(err instanceof Error ? err.message : 'שגיאה בבדיקת חיבור')
    }
  }

  async function handlePushContent() {
    if (!config) return
    setPushStatus('pushing')
    setError('')
    try {
      const service = new GitHubService(config)
      await service.commitContent({
        content,
        message: 'Update site content from admin CMS',
        path: 'public/site-content.json',
      })
      setPushStatus('success')
    } catch (err) {
      setPushStatus('error')
      setError(err instanceof Error ? err.message : 'שגיאה בעדכון תוכן')
    }
  }

  function handleClearConfig() {
    clearGitHubConfig()
    setConfig(null)
    setTestStatus('idle')
    setPushStatus('idle')
    setError('')
  }

  return (
    <div className="grid gap-6">
      <h1 className="font-display text-3xl text-navy">הגדרות GitHub</h1>

      <Card>
        <h2 className="font-display text-xl text-navy">חיבור ל-GitHub</h2>
        <p className="mt-2 text-sm text-muted">
          הגדר Personal Access Token מ-GitHub כדי לשמור שינויים ישירות למאגר הקוד.
          הטוקן צריך הרשאות <code className="rounded bg-cream px-1">repo</code>.
        </p>
        <form className="mt-4 grid gap-3" onSubmit={handleSaveConfig}>
          <Field label="GitHub Token">
            <input
              required
              type="password"
              name="token"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              defaultValue={config?.token}
              className={inputClass}
            />
          </Field>
          <Field label="Owner (שם משתמש או ארגון)">
            <input
              required
              name="owner"
              placeholder="shneurGreenberg"
              defaultValue={config?.owner}
              className={inputClass}
            />
          </Field>
          <Field label="Repository">
            <input
              required
              name="repo"
              placeholder="chabad-kinder"
              defaultValue={config?.repo}
              className={inputClass}
            />
          </Field>
          <Field label="Branch">
            <input
              required
              name="branch"
              placeholder="main"
              defaultValue={config?.branch}
              className={inputClass}
            />
          </Field>
          <div className="flex gap-2">
            <Button type="submit">שמור הגדרות</Button>
            {config && (
              <Button type="button" variant="navy" onClick={handleClearConfig}>
                נקה הגדרות
              </Button>
            )}
          </div>
        </form>
      </Card>

      {config && (
        <>
          <Card>
            <h2 className="font-display text-xl text-navy">בדיקת חיבור</h2>
            <p className="mt-2 text-sm text-muted">
              בדוק שהטוקן תקין ויש לך הרשאות כתיבה למאגר.
            </p>
            <div className="mt-4">
              <Button onClick={handleTestConnection} disabled={testStatus === 'testing'}>
                {testStatus === 'testing' ? 'בודק...' : 'בדוק חיבור'}
              </Button>
              {testStatus === 'success' && (
                <p className="mt-2 text-sm text-green-600">✓ חיבור תקין!</p>
              )}
              {testStatus === 'error' && (
                <p className="mt-2 text-sm text-red-600">✗ חיבור נכשל</p>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="font-display text-xl text-navy">שמירת תוכן למאגר</h2>
            <p className="mt-2 text-sm text-muted">
              שמור את כל התוכן הנוכחי לקובץ <code className="rounded bg-cream px-1">public/site-content.json</code> במאגר.
              אחרי השמירה, העלה את השינויים ל-GitHub Pages באמצעות GitHub Actions.
            </p>
            <div className="mt-4">
              <Button onClick={handlePushContent} disabled={pushStatus === 'pushing' || testStatus !== 'success'}>
                {pushStatus === 'pushing' ? 'שומר...' : 'שמור תוכן ל-GitHub'}
              </Button>
              {testStatus !== 'success' && (
                <p className="mt-2 text-sm text-muted">בדוק קודם את החיבור</p>
              )}
              {pushStatus === 'success' && (
                <p className="mt-2 text-sm text-green-600">✓ תוכן נשמר בהצלחה! GitHub Actions יפרסם את השינויים תוך מספר דקות.</p>
              )}
              {pushStatus === 'error' && (
                <p className="mt-2 text-sm text-red-600">✗ שגיאה בשמירת תוכן</p>
              )}
            </div>
          </Card>
        </>
      )}

      {error && (
        <Card>
          <h3 className="font-semibold text-red-600">שגיאה</h3>
          <pre className="mt-2 overflow-auto rounded bg-red-50 p-3 text-xs text-red-800">{error}</pre>
        </Card>
      )}

      <Card>
        <h2 className="font-display text-xl text-navy">הוראות</h2>
        <ol className="mt-4 space-y-2 text-sm text-muted">
          <li>1. צור Personal Access Token ב-GitHub: Settings → Developer settings → Personal access tokens → Tokens (classic)</li>
          <li>2. בחר הרשאת <code className="rounded bg-cream px-1">repo</code> (Full control of private repositories)</li>
          <li>3. העתק את הטוקן והדבק אותו כאן</li>
          <li>4. מלא את פרטי המאגר (owner/repo/branch)</li>
          <li>5. בדוק את החיבור</li>
          <li>6. לחץ "שמור תוכן ל-GitHub" כדי לעדכן את הקובץ במאגר</li>
          <li>7. GitHub Actions יבנה וינפרס את האתר עם התוכן החדש</li>
        </ol>
        <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm">
          <p className="font-semibold text-amber-900">⚠️ אבטחה</p>
          <p className="mt-1 text-amber-800">
            הטוקן נשמר ב-localStorage של הדפדפן. אל תשתמש במחשב ציבורי.
            למערכת ייצור, השתמש ב-Environment Variables או Secrets Manager.
          </p>
        </div>
      </Card>
    </div>
  )
}
