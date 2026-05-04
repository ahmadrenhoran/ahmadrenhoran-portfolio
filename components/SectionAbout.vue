<template>
  <section class="section" id="about" aria-label="About Me">
    <div class="flex items-center min-h-full py-24 px-12 md:px-20 lg:px-32">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full max-w-6xl mx-auto">

        <!-- Left: Text -->
        <div class="flex flex-col justify-center section-content" ref="leftRef">
          <p class="label-sm mb-6">About me</p>
          <h2 class="display-lg mb-8">
            Crafting stories<br />
            <em class="font-serif not-italic" style="color: var(--gold)">through pixels.</em>
          </h2>
          <p class="text-sm leading-relaxed mb-4" style="color: var(--text-secondary); max-width: 420px">
            I'm a multi-disciplinary designer based in Vietnam with a passion for creating 
            experiences that feel alive — where every pixel has a purpose and every word 
            carries weight.
          </p>
          <p class="text-sm leading-relaxed mb-10" style="color: var(--text-secondary); max-width: 420px">
            When I'm not designing or writing, you'll find me wandering through forests with 
            my camera, or curled up with a good book and my two cats.
          </p>

          <div class="flex flex-wrap gap-2 mb-10">
            <span v-for="skill in skills" :key="skill" class="skill-pill">{{ skill }}</span>
          </div>

          <!-- Stats row -->
          <div class="grid grid-cols-3 gap-6 border-t pt-8" style="border-color: hsl(var(--border))">
            <div v-for="stat in stats" :key="stat.label">
              <div class="font-serif text-2xl font-bold mb-1" style="color: var(--gold)">{{ stat.value }}</div>
              <div class="label-sm">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Right: Visual -->
        <div class="hidden lg:flex items-center justify-center section-content" ref="rightRef">
          <div class="about-visual">
            <div class="about-shape" />
            <!-- Decorative floating badges -->
            <div
              v-for="badge in badges"
              :key="badge.text"
              class="absolute flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium"
              :style="`${badge.style}; background: hsl(var(--background)); border: 1px solid hsl(var(--border)); box-shadow: 0 8px 24px hsl(var(--foreground)/0.08)`"
            >
              <span>{{ badge.icon }}</span>
              <span>{{ badge.text }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)

const skills = ['UI Design', 'Motion', 'Branding', 'Illustration', '3D', 'Writing', 'Photography', 'UX Research']

const stats = [
  { value: '6+', label: 'Years exp.' },
  { value: '80+', label: 'Projects' },
  { value: '24+', label: 'Clients' },
]

const badges = [
  { text: 'Available for work', icon: '🟢', style: 'top: 8%; right: -5%' },
  { text: 'Based in Indonesia', icon: '📍', style: 'bottom: 25%; left: -8%' },
  { text: 'Developing', icon: '✦', style: 'top: 55%; right: -10%' },
]
</script>
