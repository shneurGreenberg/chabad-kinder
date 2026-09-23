import mongoose, { Schema, Document } from 'mongoose'

export interface Text {
  he: string
  en: string
  ru: string
}

export interface AdminUser {
  email: string
  passwordHash: string
  name?: string
  createdAt: Date
}

export interface SiteContent {
  homepage: {
    hero: {
      kicker: Text
      title: Text
      lead: Text
    }
    stats: Array<{
      id: string
      number: Text
      description: Text
    }>
    values: Array<{
      id: string
      title: Text
      description: Text
    }>
    quotes: Array<{
      id: string
      text: Text
      by: Text
    }>
  }
  programs: {
    gan: Array<{
      id: string
      name: Text
      description: Text
      amount: number
      unit: 'month' | 'hour' | 'day'
      active: boolean
    }>
    school: Array<{
      id: string
      name: Text
      description: Text
      grades: Text
      active: boolean
    }>
  }
  staff: Array<{
    id: string
    role: Text
    name: Text
    bio: Text
    active: boolean
  }>
  gallery: Array<{
    id: string
    src: string
    caption: Text
    order: number
  }>
  news: Array<{
    id: string
    date: string
    title: Text
    body: Text
  }>
  menu: Array<{
    id: string
    day: Text
    dish: Text
  }>
  contact: {
    hours: Text
    address: Text
    phone: Text
    email: Text
  }
  about: {
    mission: Text
    history: Text
    values: Text
  }
}

export interface IKindergarten extends Document {
  slug: string
  name: Text
  adminUsers: AdminUser[]
  content: SiteContent
  settings: {
    active: boolean
    timezone?: string
  }
  createdAt: Date
  updatedAt: Date
}

const TextSchema = new Schema<Text>({
  he: { type: String, default: '' },
  en: { type: String, default: '' },
  ru: { type: String, default: '' },
}, { _id: false })

const AdminUserSchema = new Schema<AdminUser>({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
}, { _id: false })

const KindergartenSchema = new Schema<IKindergarten>({
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true,
    match: /^[a-z0-9-]+$/
  },
  name: { 
    type: TextSchema, 
    required: true 
  },
  adminUsers: [AdminUserSchema],
  content: {
    type: Schema.Types.Mixed,
    required: true,
  },
  settings: {
    active: { type: Boolean, default: true },
    timezone: String,
  },
}, {
  timestamps: true,
})

KindergartenSchema.index({ slug: 1 })
KindergartenSchema.index({ 'adminUsers.email': 1 })

export const Kindergarten = mongoose.model<IKindergarten>('Kindergarten', KindergartenSchema)
