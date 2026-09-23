import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './utils/db.js'
import publicRoutes from './routes/public.js'
import adminRoutes from './routes/admin.js'
import masterRoutes from './routes/master.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'
const SESSION_SECRET = process.env.SESSION_SECRET
const MONGODB_URI = process.env.MONGODB_URI

if (!SESSION_SECRET) {
  console.error('✗ SESSION_SECRET environment variable is required')
  process.exit(1)
}

if (!MONGODB_URI) {
  console.error('✗ MONGODB_URI environment variable is required')
  process.exit(1)
}

if (NODE_ENV === 'production') {
  const MASTER_PASSWORD = process.env.MASTER_ADMIN_PASSWORD
  if (!MASTER_PASSWORD || MASTER_PASSWORD === 'CHANGE_ME_IN_PRODUCTION') {
    console.error('✗ MASTER_ADMIN_PASSWORD must be set to a secure value in production')
    process.exit(1)
  }
}

async function startServer() {
  try {
    await connectDB()

    const app = express()

    if (process.env.TRUST_PROXY) {
      app.set('trust proxy', 1)
    }

    app.use(cors({
      origin: NODE_ENV === 'development' ? 'http://localhost:5173' : true,
      credentials: true,
    }))

    app.use(express.json({ limit: '10mb' }))
    app.use(express.urlencoded({ extended: true }))

    app.use(
      session({
        secret: SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: MONGODB_URI,
          collectionName: 'sessions',
          ttl: 7 * 24 * 60 * 60,
        }),
        cookie: {
          secure: NODE_ENV === 'production',
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: NODE_ENV === 'production' ? 'strict' : 'lax',
        },
      })
    )

    app.use(publicRoutes)
    app.use(adminRoutes)
    app.use(masterRoutes)

    if (NODE_ENV === 'production') {
      const distPath = path.join(__dirname, '../dist')
      app.use(express.static(distPath))
      
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'))
      })
    }

    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT} (${NODE_ENV})`)
      console.log(`  Local: http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('✗ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
