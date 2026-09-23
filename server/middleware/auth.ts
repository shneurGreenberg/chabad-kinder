import type { Request, Response, NextFunction } from 'express'

export interface AuthSession {
  userId?: string
  kindergartenSlug?: string
  isMasterAdmin?: boolean
}

declare module 'express-session' {
  interface SessionData {
    auth?: AuthSession
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.auth?.kindergartenSlug && !req.session?.auth?.isMasterAdmin) {
    return res.status(401).json({ error: 'Authentication required' })
  }
  next()
}

export function requireMasterAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.auth?.isMasterAdmin) {
    return res.status(403).json({ error: 'Master admin access required' })
  }
  next()
}

export function requireTenantAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.auth?.kindergartenSlug) {
    return res.status(403).json({ error: 'Tenant admin access required' })
  }
  next()
}
