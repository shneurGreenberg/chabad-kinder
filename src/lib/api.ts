const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:3000'

export class ApiClient {
  private static instance: ApiClient
  
  private constructor() {}
  
  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }
    return ApiClient.instance
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE}${endpoint}`
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  async getPublicContent(slug: string) {
    return this.request(`/api/public/content/${slug}`)
  }

  async login(slug: string, email: string, password: string) {
    return this.request('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ slug, email, password }),
    })
  }

  async logout() {
    return this.request('/api/admin/logout', { method: 'POST' })
  }

  async getSession() {
    return this.request('/api/admin/session')
  }

  async getAdminContent() {
    return this.request('/api/admin/content')
  }

  async updateAdminContent(content: unknown) {
    return this.request('/api/admin/content', {
      method: 'PUT',
      body: JSON.stringify({ content }),
    })
  }

  async masterLogin(password: string) {
    return this.request('/api/master/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    })
  }

  async getTenants() {
    return this.request('/api/master/tenants')
  }

  async createTenant(data: { slug: string; name: unknown; adminEmail: string; adminPassword: string }) {
    return this.request('/api/master/tenants', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const api = ApiClient.getInstance()
