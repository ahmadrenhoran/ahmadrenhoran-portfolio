<template>
  <section class="section" id="blog" aria-label="Blog">
    <div class="flex flex-col justify-center min-h-full py-24 px-6 md:px-12 lg:px-24 xl:px-32">
      <div class="max-w-6xl mx-auto w-full">

        <!-- Header -->
        <div class="flex items-end justify-between mb-12 section-content" ref="headerRef">
          <div>
            <p class="label-sm mb-3">{{ $t('blog.label') }}</p>
            <h2 class="display-lg">
              {{ $t('blog.title') }}<br />
              <em class="font-serif not-italic" style="color: var(--gold)">{{ $t('blog.titleHighlight') }}</em>
            </h2>
          </div>
          <NuxtLink to="/blogs" class="text-xs font-medium tracking-wide opacity-50 hover:opacity-100 transition-opacity pb-2">
            {{ $t('blog.readAll') }}
          </NuxtLink>
        </div>

        <!-- Blog cards -->
        <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 section-content" ref="cardsRef">
          <article
            v-for="post in posts"
            :key="post.id"
            class="blog-card cursor-pointer"
            :aria-label="post.title"
            @click="readPost(post)"
          >
            <!-- Tag + time -->
            <div class="flex items-center justify-between">
              <span class="label-sm">{{ post.tag || 'Writing' }}</span>
              <time class="text-xs" style="color: var(--text-secondary)">{{ formatDate(post.createdAt) }}</time>
            </div>

            <!-- Title -->
            <h3 class="font-serif text-lg leading-snug group-hover:text-[var(--gold)] transition-colors">{{ post.title }}</h3>

            <!-- Excerpt -->
            <p class="text-xs leading-relaxed flex-1" style="color: var(--text-secondary)">{{ post.excerpt }}</p>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-2" style="border-top: 1px solid hsl(var(--border))">
              <span class="text-xs" style="color: var(--text-secondary)">{{ post.readTime || '5 min read' }}</span>
              <span class="text-xs font-medium hover:opacity-70 transition-opacity cursor-pointer">{{ $t('blog.read') }}</span>
            </div>
          </article>
        </div>
        <div v-else class="text-center py-20 opacity-30 text-xs uppercase tracking-widest">
           {{ $t('blog.noPosts') || 'Fetching blog posts...' }}
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  posts: {
    type: Array as () => any[],
    default: () => []
  }
})

const headerRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)

function formatDate(dateStr: string) {
  if (!dateStr) return 'Oct 2024'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function readPost(post: any) {
  // Use router to navigate to blog detail
  const router = useRouter()
  router.push(`/blogs/${post.slug}`)
}
</script>
