<template>
  <div class="min-h-screen" style="background: hsl(var(--background)); color: hsl(var(--foreground))">
    <!-- Header -->
    <header class="py-20 mb-8 border-b border-white/5">
      <div class="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-xs font-medium opacity-50 hover:opacity-100 transition-opacity mb-12">
          <span>←</span> {{ $t('projects.back') }}
        </NuxtLink>
        <p class="label-sm mb-4">{{ $t('projects.label') }}</p>
        <h1 class="display-lg mb-6">
          {{ $t('projects.headline') }}<br />
          <em class="font-serif not-italic" style="color: var(--gold)">{{ $t('projects.headlineHighlight') }}</em>
        </h1>
        <p class="text-sm leading-relaxed" style="color: var(--text-secondary); max-width: 400px">
          {{ $t('projects.desc') }}
        </p>
      </div>
    </header>

    <main class="pb-20 px-6 md:px-12">
      <div class="max-w-6xl mx-auto">
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
            {{ cat === 'All' ? $t('projects.filterAll') : cat }}
          </button>
        </div>

        <!-- Project grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="work in filteredProjects"
            :key="work.title"
            class="blog-card group cursor-pointer"
          >
            <!-- Header: Tag + Year -->
            <div class="flex items-center justify-between mb-2">
              <span class="label-sm">{{ work.tag }}</span>
              <span class="text-xs opacity-50">{{ work.year }}</span>
            </div>

            <!-- Content -->
            <div class="flex flex-col flex-1">
              <h3 class="font-serif text-lg leading-snug group-hover:text-[var(--gold)] transition-colors">
                {{ work.title }}
              </h3>
              <p class="text-xs leading-relaxed mt-2 opacity-60 flex-1">
                {{ work.desc }}
              </p>
            </div>

            <!-- Footer: Skill/Tech + Action -->
            <div class="flex items-center justify-between pt-4 mt-4" style="border-top: 1px solid hsl(var(--border))">
              <div class="flex items-center gap-2">
                <span class="text-[1.2rem]">{{ work.emoji }}</span>
                <span class="text-[10px] uppercase tracking-widest opacity-40">{{ $t('works.viewCase') }}</span>
              </div>
              <span class="text-xs font-medium group-hover:translate-x-1 transition-transform">{{ $t('works.details') }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '#imports'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({ title: t('projects.title') + ' — Ahmad Renhoran' })

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
