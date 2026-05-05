<template>
  <section class="section" id="contact" aria-label="Contact">
    <div class="flex items-center min-h-full py-24 px-6 md:px-12 lg:px-24 xl:px-32">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full max-w-6xl mx-auto">

        <!-- Left: Big CTA -->
        <div class="flex flex-col justify-center section-content" ref="leftRef">
          <p class="label-sm mb-6">{{ $t('contact.label') }}</p>
          <h2 class="display-lg mb-6">
            {{ $t('contact.title') }}<br />
            {{ $t('contact.title2') }}
            <em class="font-serif not-italic block" style="color: var(--gold)">{{ $t('contact.titleHighlight') }}</em>
          </h2>
          <p class="text-sm leading-relaxed mb-10" style="color: var(--text-secondary); max-width: 360px">
            {{ $t('contact.desc') }}
          </p>

          <!-- Social links -->
          <div class="flex flex-col gap-4">
            <a
              v-for="link in socials"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-sm font-medium group"
              style="color: var(--text-secondary)"
            >
              <span class="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 group-hover:scale-110"
                    style="background: hsl(var(--muted)); border: 1px solid hsl(var(--border))">
                {{ link.icon }}
              </span>
              <span class="group-hover:opacity-100 opacity-70 transition-opacity">{{ link.label }}</span>
              <span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span>
            </a>
          </div>

          <!-- Email direct -->
          <div class="mt-10 pt-8" style="border-top: 1px solid hsl(var(--border))">
            <p class="text-xs mb-3" style="color: var(--text-secondary)">{{ $t('contact.emailLabel') }}</p>
            <a href="mailto:hello@example.com" class="text-xl font-medium hover:opacity-70 transition-opacity">
              {{ $t('contact.emailCta') }} ↗
            </a>
          </div>

          <!-- Status -->
          <div class="mb-10 lg:mb-0 section-content" ref="statusRef">
            <div class="flex items-center gap-3 px-4 py-3 rounded-full text-xs font-medium w-max"
                 style="background: hsl(var(--muted)); border: 1px solid hsl(var(--border))">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {{ $t('contact.footerStatus') }}
            </div>
          </div>

          <!-- Footer info -->
          <div class="flex flex-col gap-2 section-content" ref="footerRef">
            <p class="text-xs" style="color: var(--text-secondary)">
              {{ $t('contact.footerDesign') }} ☕️ {{ $t('contact.footerBy') }}
            </p>
            <p class="text-[10px] uppercase tracking-widest opacity-40">
              © {{ new Date().getFullYear() }} — All rights reserved.
            </p>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="flex flex-col justify-center section-content" ref="rightRef">
          <form @submit.prevent="handleSubmit" novalidate class="flex flex-col gap-8">
            <div>
              <label class="label-sm block mb-3" for="name">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Your name"
                class="contact-input"
                required
                autocomplete="name"
              />
            </div>
            <div>
              <label class="label-sm block mb-3" for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                class="contact-input"
                required
                autocomplete="email"
              />
            </div>
            <div>
              <label class="label-sm block mb-3" for="message">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                placeholder="Tell me about your project..."
                rows="4"
                class="contact-input resize-none"
                required
              />
            </div>
            <div class="flex items-center gap-6">
              <button type="submit" class="btn-primary" :disabled="sending">
                <span>{{ sending ? 'Sending…' : 'Send message' }}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="transition-transform group-hover:translate-x-1">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <span v-if="sent" class="text-xs font-medium opacity-70">Message sent ✓</span>
            </div>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)

const form = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const sent = ref(false)

const socials = [
  { label: 'Medium — @hoangnguyen', href: '#', icon: 'M' },
  { label: 'Twitter — @hoangnguyen', href: '#', icon: 'T' },
  { label: 'Behance — hoangnguyen', href: '#', icon: 'B' },
  { label: 'Dribbble — hoangnguyen', href: '#', icon: 'D' },
]

async function handleSubmit() {
  sending.value = true
  await new Promise(r => setTimeout(r, 1400))
  sending.value = false
  sent.value = true
  Object.assign(form, { name: '', email: '', message: '' })
  setTimeout(() => sent.value = false, 4000)
}
</script>
