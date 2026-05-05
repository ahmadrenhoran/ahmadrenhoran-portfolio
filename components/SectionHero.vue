<template>
  <section class="section" id="home" aria-label="Hero">
    <!-- Three.js canvas fills the section -->
    <ClientOnly>
      <ThreeHero />
    </ClientOnly>

    <!-- Content overlay -->
    <div class="relative z-10 flex items-center h-full pointer-events-none">
      <div class="pl-6 md:pl-12 lg:pl-20 max-w-sm section-content" ref="contentRef">
        <p class="label-sm mb-4">{{ $t('hero.roles') }}</p>
        <h1 class="display-xl mb-6 leading-tight">
          {{ $t('hero.title') }}<br />
          <em class="font-serif not-italic" style="color: var(--gold)">{{ $t('hero.titleHighlight') }}</em>
        </h1>
        <p class="text-sm font-light leading-relaxed" style="color: var(--text-secondary); max-width: 280px">
          {{ $t('hero.subtitle') }}
        </p>
        <div class="mt-10 flex gap-4 pointer-events-auto">
          <button class="btn-primary text-xs" @click="emit('scrollTo', 1)">
            {{ $t('hero.viewWork') }}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <button class="text-xs font-medium tracking-wide opacity-50 hover:opacity-100 transition-opacity"
            @click="emit('scrollTo', 4)">
            {{ $t('hero.sayHi') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-30">
      <span class="label-sm">{{ $t('hero.scroll') }}</span>
      <div class="w-px h-8 bg-current" style="animation: pulse 2s ease-in-out infinite" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits<{ scrollTo: [index: number] }>()
const contentRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (contentRef.value) {
    gsap.fromTo(
      contentRef.value.children,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.3,
      }
    )
  }
})
</script>
