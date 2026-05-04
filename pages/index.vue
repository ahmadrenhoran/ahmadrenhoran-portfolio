<template>
  <div class="page-home">
    <!-- Grain overlay -->
    <div class="grain" aria-hidden="true" />

    <!-- Logo -->
    <div class="logo" aria-label="Ahmad Renhoran">
      <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 2v18M2 11h10M12 2v18M18 2l8 18M18 2h8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- Top right: theme toggle + say hi -->
    <div class="top-right">
      <button
        class="theme-toggle"
        @click="toggleColorMode"
        :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
        :title="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      >
        <svg v-if="isDark" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
      <button
        class="text-xs font-medium tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
        @click="scrollTo(4)"
      >
        say hi.
      </button>
    </div>

    <!-- Right: vertical side nav -->
    <nav class="side-nav" aria-label="Section navigation">
      <a
        v-for="(section, i) in sections"
        :key="section.id"
        :class="{ active: currentSection === i }"
        @click.prevent="scrollTo(i)"
        role="button"
        :aria-current="currentSection === i ? 'page' : undefined"
      >
        {{ section.label }}
      </a>
    </nav>

    <!-- Bottom corners -->
    <div class="bottom-left">writing.</div>
    <div class="bottom-right">developing.</div>

    <!-- Scroll container -->
    <div class="scroll-container" ref="containerRef">
      <div class="sections-wrapper" ref="wrapperRef">
        <SectionHero @scroll-to="scrollTo" />
        <SectionAbout />
        <SectionWorks />
        <SectionBlog />
        <SectionContact />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '#imports'
import { gsap } from 'gsap'

/* ── Color mode ──────────────────────────────────────────────── */
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

/* ── Sections ────────────────────────────────────────────────── */
const sections = [
  { id: 'home',    label: 'Home' },
  { id: 'about',   label: 'About' },
  { id: 'works',   label: 'Works' },
  { id: 'blog',    label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

/* ── Scroll state ────────────────────────────────────────────── */
const containerRef  = ref<HTMLElement | null>(null)
const wrapperRef    = ref<HTMLElement | null>(null)
const currentSection = ref(0)

let isAnimating = false

/* ── Section width helper ───────────────────────────────────── */
function vw() {
  return window.innerWidth
}

/* ── Scroll to section ───────────────────────────────────────── */
function scrollTo(index: number) {
  if (index < 0 || index >= sections.length || isAnimating) return

  isAnimating = true
  const prev = currentSection.value
  currentSection.value = index

  // Animate wrapper
  gsap.to(wrapperRef.value, {
    x: -index * vw(),
    duration: 0.95,
    ease: 'power4.inOut',
    onComplete: () => {
      isAnimating = false
      animateSectionContent(index, prev)
    },
  })
}

/* ── Animate section content on arrive ──────────────────────── */
function animateSectionContent(index: number, _prev: number) {
  const sectionEl = wrapperRef.value?.children[index] as HTMLElement
  if (!sectionEl) return
  const contents = sectionEl.querySelectorAll('.section-content')
  if (!contents.length) return

  gsap.fromTo(
    contents,
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
    }
  )
}

/* ── Resize: update position without animation ───────────────── */
function onResize() {
  gsap.set(wrapperRef.value, { x: -currentSection.value * vw() })
}

/* ── Mount / Unmount ─────────────────────────────────────────── */
onMounted(() => {
  gsap.set(wrapperRef.value, { x: 0 })
  setTimeout(() => animateSectionContent(0, -1), 400)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>
