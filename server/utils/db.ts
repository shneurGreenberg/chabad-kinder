import mongoose from 'mongoose'

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI
  
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is required')
  }

  if (mongoose.connection.readyState >= 1) {
    return
  }

  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✓ MongoDB connected:', mongoose.connection.name)
  } catch (error) {
    console.error('✗ MongoDB connection error:', error)
    throw error
  }
}

export function disconnectDB() {
  return mongoose.disconnect()
}
