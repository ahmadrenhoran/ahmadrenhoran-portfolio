<template>
  <div class="page-home">
    <!-- 3D Background Sphere -->
    <ClientOnly>
      <ThreeHero :current-section="currentSection" class="fixed inset-0 w-full h-full z-40 pointer-events-none" />
    </ClientOnly>

    <!-- Grain overlay -->
    <div class="grain" aria-hidden="true" />

    <!-- Logo -->
    <div class="logo" aria-label="Ahmad Renhoran">
      <img src="/assets/images/logo.jpg" :class="isDark ? 'invert' : ''" width="24" height="24" alt="Logo" />
    </div>
    <!-- Top right: theme toggle + cv + say hi -->
    <div class="top-right flex flex-wrap justify-end items-center gap-3 md:gap-6 max-w-[60vw]">
      <button class="theme-toggle" @click="toggleColorMode" :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
        :title="`Switch to ${isDark ? 'light' : 'dark'} mode`">
        <svg v-if="isDark" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      <!-- Language Toggle -->
      <button class="text-xs font-bold uppercase opacity-50 hover:opacity-100 transition-opacity"
        @click="toggleLocale">
        {{ locale === 'en' ? 'ID' : 'EN' }}
      </button>

      <!-- CV Download Link -->
      <!-- Jangan lupa ubah href sesuai path file CV-mu -->
      <a href="/assets/docs/resume.pdf" download
        class="hidden sm:inline-block text-xs font-medium tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
        {{ $t('nav.resume') }}
      </a>

      <button class="text-xs font-medium tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
        @click="scrollTo(4)">
        {{ $t('nav.sayHi') }}
      </button>
    </div>

    <!-- Right/Bottom: Navigation -->
    <nav class="fixed bottom-6 left-0 right-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-8 md:left-auto flex flex-row md:flex-col justify-center items-center md:items-end gap-6 md:gap-5 z-50 pointer-events-auto" aria-label="Section navigation">
      <a v-for="(section, i) in sections" :key="section.id" :class="['nav-link group relative cursor-pointer', { 'opacity-100': currentSection === i, 'opacity-30': currentSection !== i }]"
        @click.prevent="scrollTo(i)" role="button" :aria-current="currentSection === i ? 'page' : undefined">
        <!-- Desktop Label -->
        <span class="hidden md:block text-xs font-semibold tracking-widest uppercase transition-all duration-300 pr-4 group-hover:opacity-100">
          {{ section.label }}
        </span>
        <!-- Mobile/Desktop Active Indicator -->
        <span :class="['absolute right-0 md:-right-2 top-1/2 -translate-y-1/2 md:translate-y-[-50%] transition-all duration-500 rounded-full bg-current', currentSection === i ? 'w-2 h-2 md:w-1 md:h-5 bg-[var(--gold)]' : 'w-1.5 h-1.5 md:w-1 md:h-1 opacity-50 group-hover:scale-150']"></span>
      </a>
    </nav>

    <!-- Bottom corners -->
    <div class="bottom-left hidden md:block">{{ $t('nav.writing') }}</div>
    <div class="bottom-right hidden md:block">{{ $t('nav.developing') }}</div>

    <!-- Scroll container -->
    <div class="scroll-container" ref="containerRef">
      <div class="sections-wrapper" ref="wrapperRef">
        <SectionHero @scroll-to="scrollTo" />
        <SectionAbout />
        <SectionWorks :works="portfolioStore.projects" />
        <SectionBlog :posts="portfolioStore.blogs" />
        <SectionContact />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '#imports'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
import { usePortfolioStore } from '~/stores/portfolio'

/* ── Color mode & i18n ───────────────────────────────────────── */
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const { t, locale } = useI18n()
const portfolioStore = usePortfolioStore()

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

function toggleLocale() {
  locale.value = locale.value === 'en' ? 'id' : 'en'
}

/* ── Sections ────────────────────────────────────────────────── */
const sections = computed(() => [
  { id: 'home', label: t('nav.home') },
  { id: 'about', label: t('nav.about') },
  { id: 'works', label: t('nav.works') },
  { id: 'blog', label: t('nav.blog') },
  { id: 'contact', label: t('nav.contact') },
])

/* ── Scroll state ────────────────────────────────────────────── */
const containerRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const currentSection = ref(0)

let isAnimating = false
let scrollLock = false

/* ── Section width helper ───────────────────────────────────── */
function vw() {
  return window.innerWidth
}

/* ── Scroll to section ───────────────────────────────────────── */
function scrollTo(index: number) {
  if (index < 0 || index >= sections.length || isAnimating) return

  isAnimating = true
  scrollLock = true
  const prev = currentSection.value
  currentSection.value = index

  // Menentukan arah scroll untuk efek tilt (miring)
  const dir = index > prev ? 1 : -1

  // Gunakan GSAP Timeline untuk sekuens yang lebih kompleks
  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false
      animateSectionContent(index, prev)

      // Delay sedikit lebih panjang untuk menyerap momentum trackpad
      setTimeout(() => {
        scrollLock = false
      }, 700)
    },
  })

  // 1. PUSH BACK: Mundur ke belakang (Z-axis), mengecil, dan sedikit miring
  tl.to(wrapperRef.value, {
    z: -400,
    rotationY: dir * -8, // Miring berlawanan arah gerak
    scale: 0.9,
    duration: 0.3,
    ease: 'power2.out',
  })
    // 2. SLIDE: Meluncur dengan sangat cepat dan mulus
    .to(wrapperRef.value, {
      x: -index * vw(),
      duration: 0.85,
      ease: 'power4.inOut',
    }, "-=0.15")
    .to(wrapperRef.value, {
      z: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.3,
    }, "-=0.25")
}

/* ── Wheel Event (Mouse & Trackpad) ──────────────────────────── */
function handleWheel(e: WheelEvent) {
  if (scrollLock) return

  const delta = e.deltaY || e.deltaX
  if (Math.abs(delta) < 30) return // Tingkatkan threshold agar lebih tahan micro-scroll

  if (delta > 0 && currentSection.value < sections.value.length - 1) {
    scrollTo(currentSection.value + 1)
  } else if (delta < 0 && currentSection.value > 0) {
    scrollTo(currentSection.value - 1)
  }
}

/* ── Touch Event (Mobile Swipe) ──────────────────────────────── */
let touchStartX = 0
let touchStartY = 0

function handleTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function handleTouchEnd(e: TouchEvent) {
  if (scrollLock) return

  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY

  const deltaX = touchStartX - touchEndX
  const deltaY = touchStartY - touchEndY

  // Hanya proses swipe horizontal untuk navigasi antar section
  // sehingga swipe vertikal tetap bisa dipakai untuk scroll isi section di mobile
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 50 && currentSection.value < sections.value.length - 1) scrollTo(currentSection.value + 1)
    if (deltaX < -50 && currentSection.value > 0) scrollTo(currentSection.value - 1)
  }
}

function animateSectionContent(index: number, _prev: number) {
  const sectionEl = wrapperRef.value?.children[index] as HTMLElement
  if (!sectionEl) return
  const contents = sectionEl.querySelectorAll('.section-content')
  if (!contents.length) return

  gsap.fromTo(
    contents,
    {
      opacity: 0,
      y: 60,
      rotationX: -20,
      filter: 'blur(0px)'
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      filter: 'blur(0px)',
      stagger: 0,
      duration: .2,
    }
  )
}

/* ── Resize: update position without animation ───────────────── */
function onResize() {
  gsap.set(wrapperRef.value, { x: -currentSection.value * vw() })
}

/* ── Mount / Unmount ─────────────────────────────────────────── */
onMounted(async () => {
  // Fetch portfolio data once
  portfolioStore.fetchPublicData('ahmadrenhoran')

  // SETTING 3D: Wajib ditambahkan agar efek rotasi Z dan Y terlihat
  gsap.set(containerRef.value, { perspective: 1500 })
  gsap.set(wrapperRef.value, { transformStyle: 'preserve-3d' })

  gsap.set(wrapperRef.value, { x: 0 })
  setTimeout(() => animateSectionContent(0, -1), 400)

  window.addEventListener('resize', onResize)
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>
