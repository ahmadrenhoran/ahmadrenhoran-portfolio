<template>
  <section class="section" id="works" aria-label="Selected Works">
    <div class="flex flex-col justify-center min-h-full py-24 px-6 md:px-12 lg:px-24 xl:px-32">
      <div class="w-full max-w-6xl mx-auto flex flex-col h-full section-content">

        <!-- Header -->
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="label-sm mb-4">{{ $t('works.label') }}</p>
            <h2 class="display-lg leading-tight">
              {{ $t('works.title') }}<br />
              <em class="font-serif not-italic" style="color: var(--gold)">{{ $t('works.titleHighlight') }}</em>
            </h2>
          </div>
          <NuxtLink to="/projects" class="text-xs font-medium opacity-50 hover:opacity-100 transition-opacity">
            {{ $t('works.allProjects') }}
          </NuxtLink>
        </div>

        <!-- Compact Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 section-content" ref="gridRef">
          <div
            v-for="work in works"
            :key="work.title"
            class="blog-card group cursor-pointer"
            @click="openWork(work)"
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const headerRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

const works = [
  {
    title: 'Seleris Care — Health AI',
    desc: 'Advanced facial scanning and diagnostic dashboard for health-tech solutions.',
    tag: 'SaaS',
    year: '2024',
    emoji: '✦',
  },
  {
    title: 'ERP Sentris — Enterprise System',
    desc: 'Robust management system built with Nuxt 4 and Tailwind CSS.',
    tag: 'Development',
    year: '2024',
    emoji: '✦',
  },
  {
    title: 'Lumina — Creative Analytics',
    desc: 'Deep analytics platform for creative professionals and digital agencies.',
    tag: 'UI/UX',
    year: '2024',
    emoji: '✦',
  },
  {
    title: 'Aether — Brand Identity',
    desc: 'Full visual system and brand guidelines for a mindfulness application.',
    tag: 'Branding',
    year: '2024',
    emoji: '✦',
  },
  {
    title: 'Nomad — Travel Companion',
    desc: 'Mobile application designed for slow-travel and digital nomads.',
    tag: 'Mobile',
    year: '2023',
    emoji: '✦',
  },
  {
    title: 'Forest Tales — Illustration',
    desc: 'A series of editorial illustrations focusing on narrative storytelling.',
    tag: 'Visuals',
    year: '2023',
    emoji: '✦',
  }
]

function openWork(work: any) {
  console.log('Open work:', work.title)
}
</script>

<style scoped>
/* Pastikan class blog-card Anda memiliki min-height atau flex-col agar footer tetap di bawah */
.blog-card {
  display: flex;
  flex-direction: column;
  min-height: 220px;
}
</style>