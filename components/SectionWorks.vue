<template>
  <section class="section" id="works" aria-label="Selected Works">
    <div class="flex flex-col justify-center min-h-full py-24 px-12 md:px-20 lg:px-32">
      <div class="max-w-6xl mx-auto w-full">

        <!-- Header -->
        <div class="flex items-end justify-between mb-12 section-content" ref="headerRef">
          <div>
            <p class="label-sm mb-3">Selected works</p>
            <h2 class="display-lg">
              Things I've<br />
              <em class="font-serif not-italic" style="color: var(--gold)">made.</em>
            </h2>
          </div>
          <NuxtLink to="/projects" class="text-xs font-medium tracking-wide opacity-50 hover:opacity-100 transition-opacity pb-2">
            All projects →
          </NuxtLink>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 section-content" ref="gridRef">
          <div
            v-for="(work, i) in works"
            :key="work.title"
            class="work-card"
            :class="{ 'lg:col-span-2': i === 0 }"
            @click="openWork(work)"
          >
            <!-- Color backdrop -->
            <div class="absolute inset-0" :style="`background: ${work.color}`" />

            <!-- Pattern overlay -->
            <div class="absolute inset-0 opacity-10" :style="work.pattern" />

            <!-- Floating emoji/icon -->
            <div class="absolute top-6 right-6 text-4xl select-none">{{ work.emoji }}</div>

            <!-- Tag -->
            <div class="absolute top-6 left-6">
              <span class="text-xs font-medium px-3 py-1 rounded-full" style="background: hsl(0 0% 100% / 0.15); color: white; backdrop-filter: blur(8px)">
                {{ work.tag }}
              </span>
            </div>

            <!-- Hover overlay -->
            <div class="work-card-overlay">
              <div>
                <div class="text-white/60 text-xs font-medium mb-1">{{ work.year }}</div>
                <div class="text-white text-base font-semibold">{{ work.title }}</div>
                <div class="text-white/70 text-xs mt-1">{{ work.desc }}</div>
              </div>
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
    title: 'Aether — Brand Identity',
    desc: 'Full visual system for a mindfulness app',
    tag: 'Branding',
    year: '2024',
    emoji: '🌿',
    color: 'linear-gradient(135deg, #0d3e1b 0%, #1a6e3a 100%)',
    pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
  },
  {
    title: 'Lumina — UI Design',
    desc: 'Dashboard for creative analytics',
    tag: 'UI/UX',
    year: '2024',
    emoji: '✦',
    color: 'linear-gradient(135deg, #1a2e1a 0%, #213e16 50%, #346012 100%)',
    pattern: '',
  },
  {
    title: 'Forest Tales — Illustration',
    desc: 'Series of editorial illustrations',
    tag: 'Illustration',
    year: '2023',
    emoji: '🦋',
    color: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
    pattern: '',
  },
  {
    title: 'Nomad — App Design',
    desc: 'Travel companion for slow explorers',
    tag: 'Mobile',
    year: '2023',
    emoji: '🏔',
    color: 'linear-gradient(135deg, #1f3d2b 0%, #266b42 100%)',
    pattern: '',
  },
]

function openWork(work: any) {
  console.log('Open work:', work.title)
}
</script>
