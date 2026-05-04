<template>
  <div class="min-h-screen" style="background: hsl(var(--background)); color: hsl(var(--foreground))">
    <!-- Back navigation -->
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style="background: hsl(var(--background) / 0.8); border-bottom: 1px solid hsl(var(--border))">
      <div class="max-w-6xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-x-1">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span class="text-xs font-semibold tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">Back</span>
        </NuxtLink>
        <h1 class="font-serif text-lg">All Projects</h1>
        <div class="w-16"></div>
      </div>
    </header>

    <!-- Page content -->
    <main class="pt-28 pb-20 px-6 md:px-12">
      <div class="max-w-6xl mx-auto">
        <!-- Page title -->
        <div class="mb-16">
          <p class="label-sm mb-4">Portfolio</p>
          <h2 class="display-lg mb-4">
            All the things<br />
            <em class="font-serif not-italic" style="color: var(--gold)">I've made.</em>
          </h2>
          <p class="text-sm leading-relaxed" style="color: var(--text-secondary); max-width: 480px">
            A collection of design, branding, illustration, and development projects I've worked on over the years.
          </p>
        </div>

        <!-- Filter tabs -->
        <div class="flex flex-wrap gap-2 mb-12">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="activeFilter = cat"
            class="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300"
            :class="activeFilter === cat 
              ? 'text-white' 
              : 'opacity-50 hover:opacity-100'"
            :style="activeFilter === cat 
              ? 'background: var(--gold)' 
              : 'background: hsl(var(--muted)); border: 1px solid hsl(var(--border))'"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Project grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(project, i) in filteredProjects"
            :key="project.title"
            class="work-card"
            :class="{ 'lg:col-span-2 lg:row-span-2': i === 0 }"
          >
            <div class="absolute inset-0" :style="`background: ${project.color}`" />
            <div class="absolute top-6 right-6 text-4xl select-none">{{ project.emoji }}</div>
            <div class="absolute top-6 left-6">
              <span class="text-xs font-medium px-3 py-1 rounded-full" style="background: hsl(0 0% 100% / 0.15); color: white; backdrop-filter: blur(8px)">
                {{ project.tag }}
              </span>
            </div>
            <div class="work-card-overlay">
              <div>
                <div class="text-white/60 text-xs font-medium mb-1">{{ project.year }}</div>
                <div class="text-white text-lg font-semibold">{{ project.title }}</div>
                <div class="text-white/70 text-xs mt-2 leading-relaxed">{{ project.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

useHead({ title: 'All Projects — Ahmad Renhoran' })

const activeFilter = ref('All')
const categories = ['All', 'Branding', 'UI/UX', 'Illustration', 'Mobile', 'Web']

const projects = [
  {
    title: 'Aether — Brand Identity',
    desc: 'Full visual system for a mindfulness app with custom iconography and motion guidelines.',
    tag: 'Branding',
    year: '2024',
    emoji: '🌿',
    color: 'linear-gradient(135deg, #0d3e1b 0%, #1a6e3a 100%)',
  },
  {
    title: 'Lumina — Dashboard UI',
    desc: 'Dashboard for creative analytics with real-time data visualization.',
    tag: 'UI/UX',
    year: '2024',
    emoji: '✦',
    color: 'linear-gradient(135deg, #1a2e1a 0%, #213e16 50%, #346012 100%)',
  },
  {
    title: 'Forest Tales — Illustration',
    desc: 'Series of editorial illustrations exploring the relationship between nature and technology.',
    tag: 'Illustration',
    year: '2023',
    emoji: '🦋',
    color: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
  },
  {
    title: 'Nomad — Travel App',
    desc: 'Travel companion app for slow explorers who prefer mindful journeys.',
    tag: 'Mobile',
    year: '2023',
    emoji: '🏔',
    color: 'linear-gradient(135deg, #1f3d2b 0%, #266b42 100%)',
  },
  {
    title: 'Verdant — E-Commerce',
    desc: 'A sustainable fashion marketplace built with modern web technologies.',
    tag: 'Web',
    year: '2023',
    emoji: '🛍',
    color: 'linear-gradient(135deg, #0a2e1a 0%, #145a33 100%)',
  },
  {
    title: 'Pulse — Health Dashboard',
    desc: 'Health tracking dashboard with elegant data visualization and insights.',
    tag: 'UI/UX',
    year: '2023',
    emoji: '💚',
    color: 'linear-gradient(135deg, #142e14 0%, #1e5a1e 100%)',
  },
  {
    title: 'Canopy — Brand System',
    desc: 'Comprehensive brand system for an environmental nonprofit organization.',
    tag: 'Branding',
    year: '2022',
    emoji: '🌳',
    color: 'linear-gradient(135deg, #1a3e0d 0%, #3a6e1a 100%)',
  },
  {
    title: 'Bloom — Mobile App',
    desc: 'Plant care app with AI-powered diagnosis and community features.',
    tag: 'Mobile',
    year: '2022',
    emoji: '🌱',
    color: 'linear-gradient(135deg, #0d2e0d 0%, #1a6e1a 100%)',
  },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects
  return projects.filter(p => p.tag === activeFilter.value)
})
</script>
