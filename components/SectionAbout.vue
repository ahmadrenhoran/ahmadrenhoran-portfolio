<template>
  <section class="section" id="about" aria-label="About Me">
    <div class="flex items-center min-h-full py-24 px-6 md:px-12 lg:px-24 xl:px-32">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 w-full max-w-6xl mx-auto">

        <!-- Left: Text -->
        <div class="flex flex-col justify-center section-content" ref="leftRef">
          <p class="label-sm mb-6">{{ $t('nav.about') }}</p>
          <h2 class="display-lg mb-6">
            {{ $t('about.title') }}<br />
            <em class="font-serif not-italic" style="color: var(--gold)">{{ $t('about.titleHighlight') }}</em>
          </h2>
          <p class="text-sm leading-relaxed mb-4" style="color: var(--text-secondary); max-width: 420px">
            {{ $t('about.desc1') }}
          </p>
          <p class="text-sm leading-relaxed mb-10" style="color: var(--text-secondary); max-width: 420px">
            {{ $t('about.desc2') }}
          </p>

          <div class="flex flex-wrap gap-2 mb-10">
            <span class="text-xs font-medium px-3 py-1 rounded-full opacity-50">{{ $t('about.skillsTitle') }}:</span>
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
          <div class="about-visual relative w-full max-w-md aspect-[4/5]">
            
            <!-- Image Slider Container -->
            <div class="about-shape overflow-hidden relative w-full h-full rounded-3xl" style="background: var(--background-secondary); border: 1px solid hsl(var(--border))">
              <transition name="fade">
                <img 
                  :key="currentImageIndex"
                  :src="images[currentImageIndex]" 
                  alt="Profile"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </transition>
            </div>

            <!-- Decorative floating badges -->
            <div v-for="badge in badges" :key="badge.text"
              class="absolute flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium z-10"
              :style="`${badge.style}; background: hsl(var(--background)); border: 1px solid hsl(var(--border)); box-shadow: 0 8px 24px hsl(var(--foreground)/0.08)`">
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)

// Daftar gambar yang akan ditampilkan
const images = [
  '/images/profile-1.jpg', // Ganti dengan path gambar asli Anda
  '/images/profile-2.jpg',
  '/images/profile-3.jpg',
]

const currentImageIndex = ref(0)
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  // Ganti gambar setiap 3 detik (3000 ms)
  timer = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length
  }, 3000)
})

onUnmounted(() => {
  // Hapus interval agar tidak terjadi memory leak saat komponen berpindah
  if (timer) clearInterval(timer)
})

const skills = [
  'Web Development',
  'App Development',
  'DevOps',
  'UI Design', 
  'UX Research', 
  'System Architecture',
  'Writing'
]

const { t } = useI18n()

const stats = computed(() => [
  { value: '2+', label: t('about.yearsExp') },
  { value: '8+', label: t('about.projects') },
])

const badges = [
  { text: 'Available for work', icon: '🟢', style: 'top: 8%; right: -5%' },
  { text: 'Based in Indonesia', icon: '📍', style: 'bottom: 25%; left: -8%' },
  { text: 'Software Engineer', icon: '✦', style: 'top: 55%; right: -10%' },
]
</script>

<style scoped>
/* Transisi untuk efek fade pada gambar */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Memastikan elemen yang sedang keluar tidak menggeser elemen yang masuk */
.fade-leave-active {
  position: absolute;
}
</style>