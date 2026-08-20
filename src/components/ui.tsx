import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function Logo({ to, compact = false }: { to: string; compact?: boolean }) {
  return (
    <Link to={to} className="flex items-center gap-3 text-inherit no-underline">
      <span
        aria-hidden
        className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-gold"
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 6v16" strokeLinecap="round" />
          <path d="M8 24h16" strokeLinecap="round" />
          <path d="M10 14c0-5 2.8-8 6-8" strokeLinecap="round" />
          <path d="M22 14c0-5-2.8-8-6-8" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block font-display text-lg font-semibold">חב״ד קינדר</span>
          <span className="block text-xs tracking-wide text-gold">Chabad Kinder</span>
        </span>
      )}
    </Link>
  )
}

export function Button({
  children,
  to,
  onClick,
  type = 'button',
  variant = 'gold',
  className = '',
}: {
  children: ReactNode
  to?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'gold' | 'navy' | 'ghost' | 'cream'
  className?: string
}) {
  const styles = {
    gold: 'bg-gold text-navy-deep hover:bg-gold-soft',
    navy: 'bg-navy text-cream hover:bg-navy-deep',
    ghost: 'bg-transparent text-current border border-current/20 hover:border-current/50',
    cream: 'bg-cream text-navy hover:bg-white',
  }[variant]
  const cls = `inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${styles} ${className}`
  if (to) return <Link className={cls} to={to}>{children}</Link>
  return (
    <button className={cls} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export function Section({
  kicker,
  title,
  lead,
  children,
  className = '',
}: {
  kicker?: string
  title?: string
  lead?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-5 py-14 ${className}`}>
      {kicker && (
        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-gold uppercase">{kicker}</p>
      )}
      {title && <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">{title}</h2>}
      {lead && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>}
      <div className={title || lead ? 'mt-8' : ''}>{children}</div>
    </section>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl bg-white p-6 shadow-[0_20px_50px_-32px_rgba(18,28,51,0.45)] ${className}`}>
      {children}
    </div>
  )
}

export function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      {children}
    </label>
  )
}

export const inputClass =
  'w-full rounded-2xl border border-navy/10 bg-cream px-4 py-3 text-base text-ink outline-none transition focus:border-gold focus:bg-white'
