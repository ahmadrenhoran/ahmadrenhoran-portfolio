import { defineComponent, createElementBlock, shallowRef, getCurrentInstance, provide, cloneVNode, h, ref, mergeProps, useSSRContext, computed, withCtx, createTextVNode, toDisplayString, reactive, unref } from "vue";
import "/Users/asani/Downloads/portfolio-nuxt (1)/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "/Users/asani/Downloads/portfolio-nuxt (1)/node_modules/defu/dist/defu.mjs";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { _ as _export_sfc, a as useState } from "../server.mjs";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-Vh6ZL3EF.js";
import { gsap } from "gsap";
import "/Users/asani/Downloads/portfolio-nuxt (1)/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/asani/Downloads/portfolio-nuxt (1)/node_modules/unctx/dist/index.mjs";
import "/Users/asani/Downloads/portfolio-nuxt (1)/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/asani/Downloads/portfolio-nuxt (1)/node_modules/ufo/dist/index.mjs";
import "/Users/asani/Downloads/portfolio-nuxt (1)/node_modules/@unhead/vue/dist/index.mjs";
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "SectionHero",
  __ssrInlineRender: true,
  emits: ["scrollTo"],
  setup(__props, { emit: __emit }) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section",
        id: "home",
        "aria-label": "Hero"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="relative z-10 flex items-center h-full pointer-events-none"><div class="pl-12 md:pl-16 max-w-sm section-content"><p class="label-sm mb-4">${ssrInterpolate(_ctx.$t("hero.roles"))}</p><h1 class="display-xl mb-6 leading-tight">${ssrInterpolate(_ctx.$t("hero.title"))}<br><em class="font-serif not-italic" style="${ssrRenderStyle({ "color": "var(--gold)" })}">${ssrInterpolate(_ctx.$t("hero.titleHighlight"))}</em></h1><p class="text-sm font-light leading-relaxed" style="${ssrRenderStyle({ "color": "var(--text-secondary)", "max-width": "280px" })}">${ssrInterpolate(_ctx.$t("hero.subtitle"))}</p><div class="mt-10 flex gap-4 pointer-events-auto"><button class="btn-primary text-xs">${ssrInterpolate(_ctx.$t("hero.viewWork"))} <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button><button class="text-xs font-medium tracking-wide opacity-50 hover:opacity-100 transition-opacity">${ssrInterpolate(_ctx.$t("hero.sayHi"))}</button></div></div></div><div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-30"><span class="label-sm">${ssrInterpolate(_ctx.$t("hero.scroll"))}</span><div class="w-px h-8 bg-current" style="${ssrRenderStyle({ "animation": "pulse 2s ease-in-out infinite" })}"></div></div></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SectionHero.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SectionAbout",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    const images = [
      "/images/profile-1.jpg",
      // Ganti dengan path gambar asli Anda
      "/images/profile-2.jpg",
      "/images/profile-3.jpg"
    ];
    const currentImageIndex = ref(0);
    const skills = [
      "Web Development",
      "App Development",
      "DevOps",
      "UI Design",
      "UX Research",
      "System Architecture",
      "Writing"
    ];
    const { t } = useI18n();
    const stats = computed(() => [
      { value: "2+", label: t("about.yearsExp") },
      { value: "8+", label: t("about.projects") }
    ]);
    const badges = [
      { text: "Available for work", icon: "🟢", style: "top: 8%; right: -5%" },
      { text: "Based in Indonesia", icon: "📍", style: "bottom: 25%; left: -8%" },
      { text: "Software Engineer", icon: "✦", style: "top: 55%; right: -10%" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section",
        id: "about",
        "aria-label": "About Me"
      }, _attrs))} data-v-6948c791><div class="flex items-center min-h-full py-24 px-12 md:px-20 lg:px-32" data-v-6948c791><div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full max-w-6xl mx-auto" data-v-6948c791><div class="flex flex-col justify-center section-content" data-v-6948c791><p class="label-sm mb-6" data-v-6948c791>${ssrInterpolate(_ctx.$t("nav.about"))}</p><h2 class="display-lg mb-6" data-v-6948c791>${ssrInterpolate(_ctx.$t("about.title"))}<br data-v-6948c791><em class="font-serif not-italic" style="${ssrRenderStyle({ "color": "var(--gold)" })}" data-v-6948c791>${ssrInterpolate(_ctx.$t("about.titleHighlight"))}</em></h2><p class="text-sm leading-relaxed mb-4" style="${ssrRenderStyle({ "color": "var(--text-secondary)", "max-width": "420px" })}" data-v-6948c791>${ssrInterpolate(_ctx.$t("about.desc1"))}</p><p class="text-sm leading-relaxed mb-10" style="${ssrRenderStyle({ "color": "var(--text-secondary)", "max-width": "420px" })}" data-v-6948c791>${ssrInterpolate(_ctx.$t("about.desc2"))}</p><div class="flex flex-wrap gap-2 mb-10" data-v-6948c791><span class="text-xs font-medium px-3 py-1 rounded-full opacity-50" data-v-6948c791>${ssrInterpolate(_ctx.$t("about.skillsTitle"))}:</span><!--[-->`);
      ssrRenderList(skills, (skill) => {
        _push(`<span class="skill-pill" data-v-6948c791>${ssrInterpolate(skill)}</span>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-3 gap-6 border-t pt-8" style="${ssrRenderStyle({ "border-color": "hsl(var(--border))" })}" data-v-6948c791><!--[-->`);
      ssrRenderList(stats.value, (stat) => {
        _push(`<div data-v-6948c791><div class="font-serif text-2xl font-bold mb-1" style="${ssrRenderStyle({ "color": "var(--gold)" })}" data-v-6948c791>${ssrInterpolate(stat.value)}</div><div class="label-sm" data-v-6948c791>${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div></div><div class="hidden lg:flex items-center justify-center section-content" data-v-6948c791><div class="about-visual relative w-full max-w-md aspect-[4/5]" data-v-6948c791><div class="about-shape overflow-hidden relative w-full h-full rounded-3xl" style="${ssrRenderStyle({ "background": "var(--background-secondary)", "border": "1px solid hsl(var(--border))" })}" data-v-6948c791><img${ssrRenderAttr("src", images[currentImageIndex.value])} alt="Profile" class="absolute inset-0 w-full h-full object-cover" data-v-6948c791></div><!--[-->`);
      ssrRenderList(badges, (badge) => {
        _push(`<div class="absolute flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium z-10" style="${ssrRenderStyle(`${badge.style}; background: hsl(var(--background)); border: 1px solid hsl(var(--border)); box-shadow: 0 8px 24px hsl(var(--foreground)/0.08)`)}" data-v-6948c791><span data-v-6948c791>${ssrInterpolate(badge.icon)}</span><span data-v-6948c791>${ssrInterpolate(badge.text)}</span></div>`);
      });
      _push(`<!--]--></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SectionAbout.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6948c791"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SectionWorks",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    const works = [
      {
        title: "Seleris Care — Health AI",
        desc: "Advanced facial scanning and diagnostic dashboard for health-tech solutions.",
        tag: "SaaS",
        year: "2024",
        emoji: "✦"
      },
      {
        title: "ERP Sentris — Enterprise System",
        desc: "Robust management system built with Nuxt 4 and Tailwind CSS.",
        tag: "Development",
        year: "2024",
        emoji: "✦"
      },
      {
        title: "Lumina — Creative Analytics",
        desc: "Deep analytics platform for creative professionals and digital agencies.",
        tag: "UI/UX",
        year: "2024",
        emoji: "✦"
      },
      {
        title: "Aether — Brand Identity",
        desc: "Full visual system and brand guidelines for a mindfulness application.",
        tag: "Branding",
        year: "2024",
        emoji: "✦"
      },
      {
        title: "Nomad — Travel Companion",
        desc: "Mobile application designed for slow-travel and digital nomads.",
        tag: "Mobile",
        year: "2023",
        emoji: "✦"
      },
      {
        title: "Forest Tales — Illustration",
        desc: "A series of editorial illustrations focusing on narrative storytelling.",
        tag: "Visuals",
        year: "2023",
        emoji: "✦"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section",
        id: "works",
        "aria-label": "Selected Works"
      }, _attrs))} data-v-ca5f51ee><div class="flex flex-col justify-center min-h-full py-24 px-12 md:px-20 lg:px-32" data-v-ca5f51ee><div class="w-full max-w-6xl mx-auto flex flex-col h-full section-content" data-v-ca5f51ee><div class="flex items-end justify-between mb-12" data-v-ca5f51ee><div data-v-ca5f51ee><p class="label-sm mb-4" data-v-ca5f51ee>${ssrInterpolate(_ctx.$t("works.label"))}</p><h2 class="display-lg leading-tight" data-v-ca5f51ee>${ssrInterpolate(_ctx.$t("works.title"))}<br data-v-ca5f51ee><em class="font-serif not-italic" style="${ssrRenderStyle({ "color": "var(--gold)" })}" data-v-ca5f51ee>${ssrInterpolate(_ctx.$t("works.titleHighlight"))}</em></h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/projects",
        class: "text-xs font-medium opacity-50 hover:opacity-100 transition-opacity"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("works.allProjects"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("works.allProjects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 section-content" data-v-ca5f51ee><!--[-->`);
      ssrRenderList(works, (work) => {
        _push(`<div class="blog-card group cursor-pointer" data-v-ca5f51ee><div class="flex items-center justify-between mb-2" data-v-ca5f51ee><span class="label-sm" data-v-ca5f51ee>${ssrInterpolate(work.tag)}</span><span class="text-xs opacity-50" data-v-ca5f51ee>${ssrInterpolate(work.year)}</span></div><div class="flex flex-col flex-1" data-v-ca5f51ee><h3 class="font-serif text-lg leading-snug group-hover:text-[var(--gold)] transition-colors" data-v-ca5f51ee>${ssrInterpolate(work.title)}</h3><p class="text-xs leading-relaxed mt-2 opacity-60 flex-1" data-v-ca5f51ee>${ssrInterpolate(work.desc)}</p></div><div class="flex items-center justify-between pt-4 mt-4" style="${ssrRenderStyle({ "border-top": "1px solid hsl(var(--border))" })}" data-v-ca5f51ee><div class="flex items-center gap-2" data-v-ca5f51ee><span class="text-[1.2rem]" data-v-ca5f51ee>${ssrInterpolate(work.emoji)}</span><span class="text-[10px] uppercase tracking-widest opacity-40" data-v-ca5f51ee>${ssrInterpolate(_ctx.$t("works.viewCase"))}</span></div><span class="text-xs font-medium group-hover:translate-x-1 transition-transform" data-v-ca5f51ee>${ssrInterpolate(_ctx.$t("works.details"))}</span></div></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SectionWorks.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-ca5f51ee"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SectionBlog",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    const posts = [
      {
        title: "Why Every Designer Should Keep a Sketchbook",
        tag: "Design",
        date: "Oct 2024",
        excerpt: "In a world of infinite digital canvases, the humble sketchbook remains the most powerful design tool I own...",
        readTime: "5 min read"
      },
      {
        title: "On the Art of Noticing Small Things",
        tag: "Writing",
        date: "Sep 2024",
        excerpt: "The most profound creative breakthroughs come not from grand gestures but from learning to pay deep attention to the ordinary...",
        readTime: "7 min read"
      },
      {
        title: "Building a Design System from Zero",
        tag: "Tutorial",
        date: "Aug 2024",
        excerpt: "A practical walkthrough of how I approach design systems — from token architecture to component philosophy...",
        readTime: "12 min read"
      },
      {
        title: "Living With Animals: What They Teach Us About Design",
        tag: "Life",
        date: "Jul 2024",
        excerpt: "My cats have taught me more about user behavior than any UX textbook ever could...",
        readTime: "4 min read"
      },
      {
        title: "Motion Design Principles I Return To",
        tag: "Motion",
        date: "Jun 2024",
        excerpt: "Six foundational principles for animation that make interfaces feel alive — not just fast...",
        readTime: "8 min read"
      },
      {
        title: "The Typography Rules I Always Break",
        tag: "Design",
        date: "May 2024",
        excerpt: "Rules exist to be understood deeply before you break them intentionally. Here are the ones I break most often...",
        readTime: "6 min read"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section",
        id: "blog",
        "aria-label": "Blog"
      }, _attrs))}><div class="flex flex-col justify-center min-h-full py-24 px-12 md:px-20 lg:px-32"><div class="max-w-6xl mx-auto w-full"><div class="flex items-end justify-between mb-12 section-content"><div><p class="label-sm mb-3">${ssrInterpolate(_ctx.$t("blog.label"))}</p><h2 class="display-lg">${ssrInterpolate(_ctx.$t("blog.title"))}<br><em class="font-serif not-italic" style="${ssrRenderStyle({ "color": "var(--gold)" })}">${ssrInterpolate(_ctx.$t("blog.titleHighlight"))}</em></h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blogs",
        class: "text-xs font-medium tracking-wide opacity-50 hover:opacity-100 transition-opacity pb-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("blog.readAll"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("blog.readAll")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 section-content"><!--[-->`);
      ssrRenderList(posts, (post) => {
        _push(`<article class="blog-card"${ssrRenderAttr("aria-label", post.title)}><div class="flex items-center justify-between"><span class="label-sm">${ssrInterpolate(post.tag)}</span><time class="text-xs" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(post.date)}</time></div><h3 class="font-serif text-lg leading-snug">${ssrInterpolate(post.title)}</h3><p class="text-xs leading-relaxed flex-1" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(post.excerpt)}</p><div class="flex items-center justify-between pt-2" style="${ssrRenderStyle({ "border-top": "1px solid hsl(var(--border))" })}"><span class="text-xs" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(post.readTime)}</span><span class="text-xs font-medium hover:opacity-70 transition-opacity cursor-pointer">${ssrInterpolate(_ctx.$t("blog.read"))}</span></div></article>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SectionBlog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SectionContact",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    const form = reactive({ name: "", email: "", message: "" });
    const sending = ref(false);
    const sent = ref(false);
    const socials = [
      { label: "Medium — @hoangnguyen", href: "#", icon: "M" },
      { label: "Twitter — @hoangnguyen", href: "#", icon: "T" },
      { label: "Behance — hoangnguyen", href: "#", icon: "B" },
      { label: "Dribbble — hoangnguyen", href: "#", icon: "D" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section",
        id: "contact",
        "aria-label": "Contact"
      }, _attrs))}><div class="flex items-center min-h-full py-24 px-12 md:px-20 lg:px-32"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full max-w-6xl mx-auto"><div class="flex flex-col justify-center section-content"><p class="label-sm mb-6">${ssrInterpolate(_ctx.$t("contact.label"))}</p><h2 class="display-lg mb-6">${ssrInterpolate(_ctx.$t("contact.title"))}<br> ${ssrInterpolate(_ctx.$t("contact.title2"))} <em class="font-serif not-italic block" style="${ssrRenderStyle({ "color": "var(--gold)" })}">${ssrInterpolate(_ctx.$t("contact.titleHighlight"))}</em></h2><p class="text-sm leading-relaxed mb-10" style="${ssrRenderStyle({ "color": "var(--text-secondary)", "max-width": "360px" })}">${ssrInterpolate(_ctx.$t("contact.desc"))}</p><div class="flex flex-col gap-4"><!--[-->`);
      ssrRenderList(socials, (link) => {
        _push(`<a${ssrRenderAttr("href", link.href)} target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 text-sm font-medium group" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}"><span class="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 group-hover:scale-110" style="${ssrRenderStyle({ "background": "hsl(var(--muted))", "border": "1px solid hsl(var(--border))" })}">${ssrInterpolate(link.icon)}</span><span class="group-hover:opacity-100 opacity-70 transition-opacity">${ssrInterpolate(link.label)}</span><span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span></a>`);
      });
      _push(`<!--]--></div><div class="mt-10 pt-8" style="${ssrRenderStyle({ "border-top": "1px solid hsl(var(--border))" })}"><p class="text-xs mb-3" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(_ctx.$t("contact.emailLabel"))}</p><a href="mailto:hello@example.com" class="text-xl font-medium hover:opacity-70 transition-opacity">${ssrInterpolate(_ctx.$t("contact.emailCta"))} ↗ </a></div><div class="mb-10 lg:mb-0 section-content"><div class="flex items-center gap-3 px-4 py-3 rounded-full text-xs font-medium w-max" style="${ssrRenderStyle({ "background": "hsl(var(--muted))", "border": "1px solid hsl(var(--border))" })}"><span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> ${ssrInterpolate(_ctx.$t("contact.footerStatus"))}</div></div><div class="flex flex-col gap-2 section-content"><p class="text-xs" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(_ctx.$t("contact.footerDesign"))} ☕️ ${ssrInterpolate(_ctx.$t("contact.footerBy"))}</p><p class="text-[10px] uppercase tracking-widest opacity-40"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} — All rights reserved. </p></div></div><div class="flex flex-col justify-center section-content"><form novalidate class="flex flex-col gap-8"><div><label class="label-sm block mb-3" for="name">Name</label><input id="name"${ssrRenderAttr("value", form.name)} type="text" placeholder="Your name" class="contact-input" required autocomplete="name"></div><div><label class="label-sm block mb-3" for="email">Email</label><input id="email"${ssrRenderAttr("value", form.email)} type="email" placeholder="your@email.com" class="contact-input" required autocomplete="email"></div><div><label class="label-sm block mb-3" for="message">Message</label><textarea id="message" placeholder="Tell me about your project..." rows="4" class="contact-input resize-none" required>${ssrInterpolate(form.message)}</textarea></div><div class="flex items-center gap-6"><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(sending.value) ? " disabled" : ""}><span>${ssrInterpolate(sending.value ? "Sending…" : "Send message")}</span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="transition-transform group-hover:translate-x-1"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
      if (sent.value) {
        _push(`<span class="text-xs font-medium opacity-70">Message sent ✓</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></div></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SectionContact.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _imports_0 = "" + __buildAssetsURL("logo.BbgdFGzS.jpg");
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    const isDark = computed(() => colorMode.value === "dark");
    const { t, locale } = useI18n();
    const sections = computed(() => [
      { id: "home", label: t("nav.home") },
      { id: "about", label: t("nav.about") },
      { id: "works", label: t("nav.works") },
      { id: "blog", label: t("nav.blog") },
      { id: "contact", label: t("nav.contact") }
    ]);
    ref(null);
    const wrapperRef = ref(null);
    const currentSection = ref(0);
    let isAnimating = false;
    function vw() {
      return (void 0).innerWidth;
    }
    function scrollTo(index) {
      if (index < 0 || index >= sections.length || isAnimating) return;
      isAnimating = true;
      const prev = currentSection.value;
      currentSection.value = index;
      const dir = index > prev ? 1 : -1;
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
          animateSectionContent(index);
          setTimeout(() => {
          }, 700);
        }
      });
      tl.to(wrapperRef.value, {
        z: -400,
        rotationY: dir * -8,
        // Miring berlawanan arah gerak
        scale: 0.9,
        duration: 0.3,
        ease: "power2.out"
      }).to(wrapperRef.value, {
        x: -index * vw(),
        duration: 0.85,
        ease: "power4.inOut"
      }, "-=0.15").to(wrapperRef.value, {
        z: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.3
      }, "-=0.25");
    }
    function animateSectionContent(index, _prev) {
      const sectionEl = wrapperRef.value?.children[index];
      if (!sectionEl) return;
      const contents = sectionEl.querySelectorAll(".section-content");
      if (!contents.length) return;
      gsap.fromTo(
        contents,
        {
          opacity: 0,
          y: 60,
          rotationX: -20,
          filter: "blur(0px)"
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: "blur(0px)",
          stagger: 0,
          duration: 0.2
        }
      );
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionHero = _sfc_main$5;
      const _component_SectionAbout = __nuxt_component_1;
      const _component_SectionWorks = __nuxt_component_2;
      const _component_SectionBlog = _sfc_main$2;
      const _component_SectionContact = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-home" }, _attrs))}><div class="grain" aria-hidden="true"></div><div class="logo" aria-label="Ahmad Renhoran"><img${ssrRenderAttr("src", _imports_0)} class="${ssrRenderClass(isDark.value ? "invert" : "")}" width="24" height="24" alt="Logo"></div><div class="top-right flex items-center gap-6"><button class="theme-toggle"${ssrRenderAttr("aria-label", `Switch to ${isDark.value ? "light" : "dark"} mode`)}${ssrRenderAttr("title", `Switch to ${isDark.value ? "light" : "dark"} mode`)}>`);
      if (isDark.value) {
        _push(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`);
      } else {
        _push(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`);
      }
      _push(`</button><button class="text-xs font-bold uppercase opacity-50 hover:opacity-100 transition-opacity">${ssrInterpolate(unref(locale) === "en" ? "ID" : "EN")}</button><a href="/assets/docs/resume.pdf" download class="text-xs font-medium tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">${ssrInterpolate(_ctx.$t("nav.resume"))}</a><button class="text-xs font-medium tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">${ssrInterpolate(_ctx.$t("nav.sayHi"))}</button></div><nav class="side-nav" aria-label="Section navigation"><!--[-->`);
      ssrRenderList(sections.value, (section, i) => {
        _push(`<a class="${ssrRenderClass({ active: currentSection.value === i })}" role="button"${ssrRenderAttr("aria-current", currentSection.value === i ? "page" : void 0)}>${ssrInterpolate(section.label)}</a>`);
      });
      _push(`<!--]--></nav><div class="bottom-left">${ssrInterpolate(_ctx.$t("nav.writing"))}</div><div class="bottom-right">${ssrInterpolate(_ctx.$t("nav.developing"))}</div><div class="scroll-container"><div class="sections-wrapper">`);
      _push(ssrRenderComponent(_component_SectionHero, { onScrollTo: scrollTo }, null, _parent));
      _push(ssrRenderComponent(_component_SectionAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionWorks, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionBlog, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionContact, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CP-lxTwD.js.map
