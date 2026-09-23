import { Router } from 'express'
import { Kindergarten } from '../models/Kindergarten.js'

const router = Router()

router.get('/api/public/content/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const kindergarten = await Kindergarten.findOne({ slug, 'settings.active': true })
    
    if (!kindergarten) {
      return res.status(404).json({ error: 'Kindergarten not found' })
    }

    res.json({
      slug: kindergarten.slug,
      name: kindergarten.name,
      content: kindergarten.content,
    })
  } catch (error) {
    console.error('Error fetching content:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
