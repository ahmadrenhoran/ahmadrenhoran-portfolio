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
        <div v-if="works.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 section-content" ref="gridRef">
          <div
            v-for="work in works"
            :key="work.id"
            class="blog-card group cursor-pointer"
            @click="openWork(work)"
          >
            <!-- Header: Tag + Year -->
            <div class="flex items-center justify-between mb-2">
              <span class="label-sm">{{ work.tech_stack && work.tech_stack[0] ? work.tech_stack[0] : 'Project' }}</span>
              <span class="text-xs opacity-50">{{ work.year || '2024' }}</span>
            </div>

            <!-- Content -->
            <div class="flex flex-col flex-1">
              <h3 class="font-serif text-lg leading-snug group-hover:text-[var(--gold)] transition-colors">
                {{ work.title }}
              </h3>
              <p class="text-xs leading-relaxed mt-2 opacity-60 flex-1">
                {{ work.description }}
              </p>
            </div>

            <!-- Footer: Skill/Tech + Action -->
            <div class="flex items-center justify-between pt-4 mt-4" style="border-top: 1px solid hsl(var(--border))">
              <div class="flex items-center gap-2">
                <span class="text-[1.2rem]">{{ work.emoji || '✦' }}</span>
                <span class="text-[10px] uppercase tracking-widest opacity-40">{{ $t('works.viewCase') }}</span>
              </div>
              <span class="text-xs font-medium group-hover:translate-x-1 transition-transform">{{ $t('works.details') }}</span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-20 opacity-30 text-xs uppercase tracking-widest">
           {{ $t('works.noWorks') || 'Fetching projects...' }}
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  works: {
    type: Array as () => any[],
    default: () => []
  }
})

const gridRef = ref<HTMLElement | null>(null)

function openWork(work: any) {
  if (work.demo_url) {
    window.open(work.demo_url, '_blank')
  }
}
</script>

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  min-height: 220px;
}
</style>