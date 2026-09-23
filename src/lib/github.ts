/**
 * GitHub API integration for committing content changes
 * Requires GitHub personal access token with repo write access
 */

export type GitHubConfig = {
  token: string
  owner: string
  repo: string
  branch: string
}

export type CommitContentParams = {
  content: object
  message: string
  path: string
}

export class GitHubService {
  private config: GitHubConfig

  constructor(config: GitHubConfig) {
    this.config = config
  }

  /**
   * Get the SHA of the current file (needed for updates)
   */
  private async getFileSha(path: string): Promise<string | null> {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${path}?ref=${this.config.branch}`,
        {
          headers: {
            Authorization: `Bearer ${this.config.token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      )

      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`Failed to get file: ${response.statusText}`)
      }

      const data = await response.json()
      return data.sha
    } catch (error) {
      console.error('Error getting file SHA:', error)
      return null
    }
  }

  /**
   * Commit content to the repository
   */
  async commitContent({ content, message, path }: CommitContentParams): Promise<boolean> {
    try {
      const sha = await this.getFileSha(path)
      const contentBase64 = btoa(JSON.stringify(content, null, 2))

      const body: Record<string, string> = {
        message,
        content: contentBase64,
        branch: this.config.branch,
      }

      if (sha) {
        body.sha = sha
      }

      const response = await fetch(
        `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${path}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${this.config.token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Failed to commit: ${response.statusText} - ${error}`)
      }

      return true
    } catch (error) {
      console.error('Error committing content:', error)
      throw error
    }
  }

  /**
   * Test if the token and config are valid
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.config.owner}/${this.config.repo}`,
        {
          headers: {
            Authorization: `Bearer ${this.config.token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      )

      return response.ok
    } catch {
      return false
    }
  }
}

/**
 * Load GitHub config from environment or localStorage
 */
export function loadGitHubConfig(): GitHubConfig | null {
  const token = import.meta.env.VITE_GITHUB_TOKEN || localStorage.getItem('github-token')
  const owner = import.meta.env.VITE_GITHUB_OWNER || localStorage.getItem('github-owner') || 'shneurGreenberg'
  const repo = import.meta.env.VITE_GITHUB_REPO || localStorage.getItem('github-repo') || 'chabad-kinder'
  const branch = import.meta.env.VITE_GITHUB_BRANCH || localStorage.getItem('github-branch') || 'main'

  if (!token) {
    return null
  }

  return { token, owner, repo, branch }
}

/**
 * Save GitHub config to localStorage
 */
export function saveGitHubConfig(config: Partial<GitHubConfig>): void {
  if (config.token) localStorage.setItem('github-token', config.token)
  if (config.owner) localStorage.setItem('github-owner', config.owner)
  if (config.repo) localStorage.setItem('github-repo', config.repo)
  if (config.branch) localStorage.setItem('github-branch', config.branch)
}

/**
 * Clear GitHub config from localStorage
 */
export function clearGitHubConfig(): void {
  localStorage.removeItem('github-token')
  localStorage.removeItem('github-owner')
  localStorage.removeItem('github-repo')
  localStorage.removeItem('github-branch')
}
