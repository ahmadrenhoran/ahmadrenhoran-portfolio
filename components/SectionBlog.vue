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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 section-content" ref="cardsRef">
          <article
            v-for="post in posts"
            :key="post.title"
            class="blog-card"
            :aria-label="post.title"
          >
            <!-- Tag + time -->
            <div class="flex items-center justify-between">
              <span class="label-sm">{{ post.tag }}</span>
              <time class="text-xs" style="color: var(--text-secondary)">{{ post.date }}</time>
            </div>

            <!-- Title -->
            <h3 class="font-serif text-lg leading-snug">{{ post.title }}</h3>

            <!-- Excerpt -->
            <p class="text-xs leading-relaxed flex-1" style="color: var(--text-secondary)">{{ post.excerpt }}</p>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-2" style="border-top: 1px solid hsl(var(--border))">
              <span class="text-xs" style="color: var(--text-secondary)">{{ post.readTime }}</span>
              <span class="text-xs font-medium hover:opacity-70 transition-opacity cursor-pointer">{{ $t('blog.read') }}</span>
            </div>
          </article>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const headerRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)

const posts = [
  {
    title: 'Why Every Designer Should Keep a Sketchbook',
    tag: 'Design',
    date: 'Oct 2024',
    excerpt: 'In a world of infinite digital canvases, the humble sketchbook remains the most powerful design tool I own...',
    readTime: '5 min read',
  },
  {
    title: 'On the Art of Noticing Small Things',
    tag: 'Writing',
    date: 'Sep 2024',
    excerpt: 'The most profound creative breakthroughs come not from grand gestures but from learning to pay deep attention to the ordinary...',
    readTime: '7 min read',
  },
  {
    title: 'Building a Design System from Zero',
    tag: 'Tutorial',
    date: 'Aug 2024',
    excerpt: 'A practical walkthrough of how I approach design systems — from token architecture to component philosophy...',
    readTime: '12 min read',
  },
  {
    title: 'Living With Animals: What They Teach Us About Design',
    tag: 'Life',
    date: 'Jul 2024',
    excerpt: 'My cats have taught me more about user behavior than any UX textbook ever could...',
    readTime: '4 min read',
  },
  {
    title: 'Motion Design Principles I Return To',
    tag: 'Motion',
    date: 'Jun 2024',
    excerpt: 'Six foundational principles for animation that make interfaces feel alive — not just fast...',
    readTime: '8 min read',
  },
  {
    title: 'The Typography Rules I Always Break',
    tag: 'Design',
    date: 'May 2024',
    excerpt: 'Rules exist to be understood deeply before you break them intentionally. Here are the ones I break most often...',
    readTime: '6 min read',
  },
]
</script>
