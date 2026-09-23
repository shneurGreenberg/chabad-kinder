import bcrypt from 'bcrypt'
import { connectDB, disconnectDB } from './utils/db.js'
import { Kindergarten } from './models/Kindergarten.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DEFAULT_ADMIN_EMAIL = 'admin@novosibirsk.local'
const DEFAULT_ADMIN_PASSWORD = 'demo123'

async function seed() {
  try {
    console.log('🌱 Seeding database...')
    
    await connectDB()

    const existingSlug = await Kindergarten.findOne({ slug: 'novosibirsk' })
    if (existingSlug) {
      console.log('⚠️  Novosibirsk tenant already exists. Skipping...')
      await disconnectDB()
      return
    }

    const contentPath = path.join(__dirname, '../public/site-content.json')
    let siteContent = {}
    
    if (fs.existsSync(contentPath)) {
      const contentRaw = fs.readFileSync(contentPath, 'utf-8')
      siteContent = JSON.parse(contentRaw)
      console.log('✓ Loaded existing site-content.json')
    } else {
      console.log('⚠️  site-content.json not found, using empty content')
    }

    const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10)

    await Kindergarten.create({
      slug: 'novosibirsk',
      name: {
        he: 'חב״ד קינדר נובוסיבירסק',
        en: 'Chabad Kinder Novosibirsk',
        ru: 'Хабад Киндер Новосибирск',
      },
      adminUsers: [
        {
          email: DEFAULT_ADMIN_EMAIL,
          passwordHash,
          name: 'Admin Demo',
          createdAt: new Date(),
        },
      ],
      content: siteContent,
      settings: {
        active: true,
        timezone: 'Asia/Novosibirsk',
      },
    })

    console.log('✓ Created tenant: novosibirsk')
    console.log('')
    console.log('📋 Default credentials (CHANGE IN PRODUCTION):')
    console.log(`   City slug: novosibirsk`)
    console.log(`   Email: ${DEFAULT_ADMIN_EMAIL}`)
    console.log(`   Password: ${DEFAULT_ADMIN_PASSWORD}`)
    console.log('')
    console.log('🎉 Seeding complete!')

    await disconnectDB()
  } catch (error) {
    console.error('✗ Seeding failed:', error)
    process.exit(1)
  }
}

seed()
