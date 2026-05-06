import { defineStore } from 'pinia'

export interface Project {
  id: number
  title: string
  description: string
  image_url: string
  tech_stack: string[]
  demo_url: string
  repo_url: string
  is_featured: boolean
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  coverImage: string
  createdAt: string
}

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    projects: [] as Project[],
    blogs: [] as BlogPost[],
    loading: false,
    error: null as string | null,
    fetched: false
  }),

  actions: {
    async fetchPublicData(username: string = 'ahmadrenhoran') {
      // Prevent multiple fetches if already loaded
      if (this.fetched) return

      this.loading = true
      const config = useRuntimeConfig()
      config.public.apiBase = 'https://acaca28-backend.hf.space/api'
      const apiBase = config.public.apiBase.replace(/\/$/, '')

      try {
        const [projectsRes, blogsRes] = await Promise.all([
          $fetch<any>(`${apiBase}/v1/public/${username}/portfolio`),
          $fetch<any>(`${apiBase}/v1/public/${username}/blog`)
        ])

        if (projectsRes.success) this.projects = projectsRes.data
        if (blogsRes.success) this.blogs = blogsRes.data

        this.fetched = true
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch portfolio data'
        console.error('Portfolio Store Error:', err)
      } finally {
        this.loading = false
      }
    }
  }
})
