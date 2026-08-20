import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { tariffs } from '../data/mock'
import { formatMoney } from '../lib/format'
import { useLang, useLoc } from '../lib/hooks'
import { loadJson, saveJson } from '../lib/storage'
import { Button, Card, Field, Section, inputClass } from '../components/ui'

type Age = '1' | '3' | '5' | '7'
type Gender = 'boy' | 'girl'
type Track = 'gan' | 'school' | 'unsure'
type Stay = 'full' | 'half' | 'hourly' | 'emergency'
type Step = 'age' | 'gender' | 'track' | 'stay' | 'interest' | 'recommend' | 'form' | 'done'

type Answers = {
  age?: Age
  gender?: Gender
  track?: Track
  stay?: Stay
  interests: string[]
}

type Application = Answers & {
  parentName: string
  childName: string
  phone: string
  email: string
  notes: string
  at: string
}

function Bubble({ from, children }: { from: 'bot' | 'user'; children: string }) {
  const mine = from === 'user'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <p
        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed ${
          mine ? 'bg-navy text-cream' : 'bg-white text-navy shadow-sm'
        }`}
      >
        {children}
      </p>
    </div>
  )
}

function Chip({ label, onClick, active = false }: { label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold ${
        active ? 'bg-navy text-cream' : 'bg-white text-navy hover:bg-gold-soft'
      }`}
    >
      {label}
    </button>
  )
}

export function EnrollmentWizard() {
  const { t } = useTranslation()
  const loc = useLoc()
  const lang = useLang()
  const [step, setStep] = useState<Step>('age')
  const [answers, setAnswers] = useState<Answers>({ interests: [] })

  const resolvedTrack: Track = useMemo(() => {
    if (answers.track && answers.track !== 'unsure') return answers.track
    return answers.age === '7' ? 'school' : 'gan'
  }, [answers.age, answers.track])

  const recommendation = useMemo(() => {
    if (resolvedTrack === 'school') return { id: 'school' as const, tariff: tariffs.school }
    const stay = answers.stay ?? 'full'
    return { id: stay, tariff: tariffs[stay] }
  }, [answers.stay, resolvedTrack])

  function unitLabel() {
    if (recommendation.tariff.unit === 'hour') return t('wizard.hour')
    if (recommendation.tariff.unit === 'day') return t('wizard.day')
    return t('wizard.month')
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const application: Application = {
      ...answers,
      parentName: String(data.get('parentName') || ''),
      childName: String(data.get('childName') || ''),
      phone: String(data.get('phone') || ''),
      email: String(data.get('email') || ''),
      notes: String(data.get('notes') || ''),
      at: new Date().toISOString(),
    }
    saveJson('applications', [...loadJson<Application[]>('applications', []), application])
    setStep('done')
  }

  const interests = [
    { id: 'art', label: { he: 'אמנות', en: 'Art', ru: 'Искусство' } },
    { id: 'music', label: { he: 'מוזיקה', en: 'Music', ru: 'Музыка' } },
    { id: 'move', label: { he: 'תנועה', en: 'Movement', ru: 'Движение' } },
    { id: 'parsha', label: { he: 'פרשה', en: 'Parsha', ru: 'Глава недели' } },
  ]

  const stepIndex =
    step === 'age' ? 1
    : step === 'gender' ? 2
    : step === 'track' ? 3
    : step === 'stay' ? 4
    : step === 'interest' ? 5
    : step === 'recommend' ? 6
    : 7
  const totalSteps = 7

  return (
    <Section kicker={t('wizard.kicker')} title={t('wizard.title')}>
      <div className="mx-auto max-w-xl">
        <Card className="bg-cream/40">
          <div className="mb-5">
            <p className="text-xs font-semibold tracking-wide text-gold">
              {t('wizard.botName')} · {t('wizard.stepOf', { current: Math.min(stepIndex, totalSteps), total: totalSteps })}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy/10">
              <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${(stepIndex / totalSteps) * 100}%` }} />
            </div>
          </div>
          <div className="grid gap-3">
            <Bubble from="bot">{t('wizard.start')}</Bubble>
            <Bubble from="bot">{t('wizard.askAge')}</Bubble>
            {answers.age && <Bubble from="user">{t(`wizard.ages.${answers.age}`)}</Bubble>}
            {step === 'age' && (
              <div className="flex flex-wrap gap-2">
                {(['1', '3', '5', '7'] as const).map((age) => (
                  <Chip
                    key={age}
                    label={t(`wizard.ages.${age}`)}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, age }))
                      setStep('gender')
                    }}
                  />
                ))}
              </div>
            )}

            {answers.age && (
              <>
                <Bubble from="bot">{t('wizard.askGender')}</Bubble>
                {answers.gender && <Bubble from="user">{t(`wizard.${answers.gender}`)}</Bubble>}
              </>
            )}
            {step === 'gender' && (
              <div className="flex flex-wrap gap-2">
                {(['boy', 'girl'] as const).map((gender) => (
                  <Chip
                    key={gender}
                    label={t(`wizard.${gender}`)}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, gender }))
                      setStep('track')
                    }}
                  />
                ))}
              </div>
            )}

            {answers.gender && (
              <>
                <Bubble from="bot">{t('wizard.askTrack')}</Bubble>
                {answers.track && <Bubble from="user">{t(`wizard.${answers.track}`)}</Bubble>}
              </>
            )}
            {step === 'track' && (
              <div className="flex flex-wrap gap-2">
                {(['gan', 'school', 'unsure'] as const).map((track) => (
                  <Chip
                    key={track}
                    label={t(`wizard.${track}`)}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, track }))
                      const nextTrack = track === 'unsure' ? (answers.age === '7' ? 'school' : 'gan') : track
                      setStep(nextTrack === 'school' ? 'interest' : 'stay')
                    }}
                  />
                ))}
              </div>
            )}

            {answers.track && resolvedTrack === 'gan' && (
              <>
                <Bubble from="bot">{t('wizard.askStay')}</Bubble>
                {answers.stay && <Bubble from="user">{t(`gan.${answers.stay}`)}</Bubble>}
              </>
            )}
            {step === 'stay' && (
              <div className="flex flex-wrap gap-2">
                {(['full', 'half', 'hourly', 'emergency'] as const).map((stay) => (
                  <Chip
                    key={stay}
                    label={t(`gan.${stay}`)}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, stay }))
                      setStep('interest')
                    }}
                  />
                ))}
              </div>
            )}

            {(step === 'interest' || answers.interests.length > 0 || step === 'recommend' || step === 'form' || step === 'done') &&
              step !== 'age' &&
              step !== 'gender' &&
              step !== 'track' &&
              step !== 'stay' && (
                <>
                  <Bubble from="bot">{t('wizard.askInterest')}</Bubble>
                  {answers.interests.length > 0 && (
                    <Bubble
                      from="user"
                      children={answers.interests
                        .map((id) => interests.find((item) => item.id === id)?.label[lang] || id)
                        .join(' · ')}
                    />
                  )}
                </>
              )}
            {step === 'interest' && (
              <div className="flex flex-wrap gap-2">
                {interests.map((item) => (
                  <Chip
                    key={item.id}
                    active={answers.interests.includes(item.id)}
                    label={item.label[lang]}
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        interests: prev.interests.includes(item.id)
                          ? prev.interests.filter((id) => id !== item.id)
                          : [...prev.interests, item.id],
                      }))
                    }
                  />
                ))}
                <Chip label={t('wizard.continue')} onClick={() => setStep('recommend')} />
              </div>
            )}

            {(step === 'recommend' || step === 'form' || step === 'done') && (
              <div className="rounded-3xl bg-navy p-5 text-cream">
                <p className="text-xs tracking-wide text-gold uppercase">{t('wizard.recommend')}</p>
                <p className="mt-2 font-display text-2xl">
                  {resolvedTrack === 'school' ? t('wizard.school') : t(`gan.${recommendation.id}`)}
                </p>
                <p className="mt-2 text-gold">
                  {t('wizard.priceFrom')}
                  {formatMoney(recommendation.tariff.amount, lang)} {unitLabel()}
                </p>
                <p className="mt-3 text-sm text-cream/80">{t('wizard.aboutShort')}</p>
              </div>
            )}
          </div>

          {step === 'recommend' && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => setStep('form')}>{t('wizard.applyCta')}</Button>
              <Button to={loc('/faq')} variant="ghost">
                {t('wizard.faqCta')}
              </Button>
            </div>
          )}

          {step === 'form' && (
            <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
              <h3 className="font-display text-2xl text-navy">{t('wizard.formTitle')}</h3>
              <Field label={t('wizard.parentName')}>
                <input required name="parentName" className={inputClass} />
              </Field>
              <Field label={t('wizard.childName')}>
                <input required name="childName" className={inputClass} />
              </Field>
              <Field label={t('contact.phone')}>
                <input required name="phone" className={inputClass} />
              </Field>
              <Field label={t('contact.email')}>
                <input required type="email" name="email" className={inputClass} />
              </Field>
              <Field label={t('wizard.notes')}>
                <textarea name="notes" rows={3} className={inputClass} />
              </Field>
              <Button type="submit">{t('wizard.submit')}</Button>
            </form>
          )}

          {step === 'done' && (
            <div className="mt-6">
              <p className="text-lg text-navy">{t('wizard.thanks')}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    setAnswers({ interests: [] })
                    setStep('age')
                  }}
                >
                  {t('wizard.another')}
                </Button>
                <Link to={loc()} className="self-center text-sm text-navy">
                  {t('nav.home')}
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Section>
  )
}
