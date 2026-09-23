import { Router } from 'express'
import bcrypt from 'bcrypt'
import { Kindergarten } from '../models/Kindergarten.js'
import { requireTenantAdmin } from '../middleware/auth.js'

const router = Router()

router.post('/api/admin/login', async (req, res) => {
  try {
    const { slug, email, password } = req.body

    if (!slug || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const kindergarten = await Kindergarten.findOne({ slug })
    if (!kindergarten) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const adminUser = kindergarten.adminUsers.find(u => u.email === email)
    if (!adminUser) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValid = await bcrypt.compare(password, adminUser.passwordHash)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    req.session.auth = {
      userId: adminUser.email,
      kindergartenSlug: slug,
    }

    res.json({
      success: true,
      user: {
        email: adminUser.email,
        name: adminUser.name,
        slug,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/api/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' })
    }
    res.json({ success: true })
  })
})

router.get('/api/admin/session', (req, res) => {
  if (req.session?.auth?.kindergartenSlug) {
    res.json({
      authenticated: true,
      slug: req.session.auth.kindergartenSlug,
      userId: req.session.auth.userId,
    })
  } else {
    res.json({ authenticated: false })
  }
})

router.get('/api/admin/content', requireTenantAdmin, async (req, res) => {
  try {
    const slug = req.session.auth!.kindergartenSlug
    const kindergarten = await Kindergarten.findOne({ slug })
    
    if (!kindergarten) {
      return res.status(404).json({ error: 'Kindergarten not found' })
    }

    res.json({
      content: kindergarten.content,
      name: kindergarten.name,
    })
  } catch (error) {
    console.error('Error fetching admin content:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.put('/api/admin/content', requireTenantAdmin, async (req, res) => {
  try {
    const slug = req.session.auth!.kindergartenSlug
    const { content } = req.body

    if (!content) {
      return res.status(400).json({ error: 'Content is required' })
    }

    const kindergarten = await Kindergarten.findOneAndUpdate(
      { slug },
      { content },
      { new: true }
    )

    if (!kindergarten) {
      return res.status(404).json({ error: 'Kindergarten not found' })
    }

    res.json({
      success: true,
      content: kindergarten.content,
    })
  } catch (error) {
    console.error('Error updating content:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
