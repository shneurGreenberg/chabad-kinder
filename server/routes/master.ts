import { Router } from 'express'
import bcrypt from 'bcrypt'
import { Kindergarten } from '../models/Kindergarten.js'
import { requireMasterAdmin } from '../middleware/auth.js'

const router = Router()

router.post('/api/master/login', async (req, res) => {
  try {
    const { password } = req.body
    const MASTER_PASSWORD = process.env.MASTER_ADMIN_PASSWORD

    if (!MASTER_PASSWORD) {
      return res.status(500).json({ error: 'Master password not configured' })
    }

    if (!password) {
      return res.status(400).json({ error: 'Password required' })
    }

    const isValid = password === MASTER_PASSWORD

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    req.session.auth = {
      isMasterAdmin: true,
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Master login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/api/master/tenants', requireMasterAdmin, async (_req, res) => {
  try {
    const tenants = await Kindergarten.find({})
      .select('slug name settings.active createdAt')
      .sort({ createdAt: -1 })

    res.json({
      tenants: tenants.map(t => ({
        slug: t.slug,
        name: t.name,
        active: t.settings.active,
        adminCount: t.adminUsers?.length || 0,
        createdAt: t.createdAt,
      })),
    })
  } catch (error) {
    console.error('Error listing tenants:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/api/master/tenants', requireMasterAdmin, async (req, res) => {
  try {
    const { slug, name, adminEmail, adminPassword } = req.body

    if (!slug || !name || !adminEmail || !adminPassword) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const existing = await Kindergarten.findOne({ slug })
    if (existing) {
      return res.status(409).json({ error: 'Slug already exists' })
    }

    const passwordHash = await bcrypt.hash(adminPassword, 10)

    const kindergarten = await Kindergarten.create({
      slug,
      name,
      adminUsers: [{
        email: adminEmail,
        passwordHash,
        createdAt: new Date(),
      }],
      content: {},
      settings: {
        active: true,
      },
    })

    res.status(201).json({
      success: true,
      tenant: {
        slug: kindergarten.slug,
        name: kindergarten.name,
      },
    })
  } catch (error) {
    console.error('Error creating tenant:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
