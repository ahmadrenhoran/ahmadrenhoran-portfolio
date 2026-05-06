import { _ as _export_sfc, a as useRuntimeConfig, b as useState, c as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, mergeProps, useSSRContext, computed, withCtx, createTextVNode, toDisplayString, reactive, unref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as __nuxt_component_0 } from "./nuxt-link-BkxPBZ6Z.js";
import { gsap } from "gsap";
import { defineStore } from "pinia";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/unctx/dist/index.mjs";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/h3/dist/index.mjs";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/ufo/dist/index.mjs";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/klona/dist/index.mjs";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "SectionHero",
  __ssrInlineRender: true,
  emits: ["scrollTo"],
  setup(__props, { emit: __emit }) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section",
        id: "home",
        "aria-label": "Hero"
      }, _attrs))}><div class="relative z-10 flex items-center h-full pointer-events-none"><div class="pl-6 md:pl-12 lg:pl-20 max-w-sm section-content"><p class="label-sm mb-4">${ssrInterpolate(_ctx.$t("hero.roles"))}</p><h1 class="display-xl mb-6 leading-tight">${ssrInterpolate(_ctx.$t("hero.title"))}<br><em class="font-serif not-italic" style="${ssrRenderStyle({ "color": "var(--gold)" })}">${ssrInterpolate(_ctx.$t("hero.titleHighlight"))}</em></h1><p class="text-sm font-light leading-relaxed" style="${ssrRenderStyle({ "color": "var(--text-secondary)", "max-width": "280px" })}">${ssrInterpolate(_ctx.$t("hero.subtitle"))}</p><div class="mt-10 flex gap-4 pointer-events-auto"><button class="btn-primary text-xs">${ssrInterpolate(_ctx.$t("hero.viewWork"))} <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button><button class="text-xs font-medium tracking-wide opacity-50 hover:opacity-100 transition-opacity">${ssrInterpolate(_ctx.$t("hero.sayHi"))}</button></div></div></div><div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-30"><span class="label-sm">${ssrInterpolate(_ctx.$t("hero.scroll"))}</span><div class="w-px h-8 bg-current" style="${ssrRenderStyle({ "animation": "pulse 2s ease-in-out infinite" })}"></div></div></section>`);
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
      }, _attrs))} data-v-f6c9a1fc><div class="flex items-center min-h-full py-24 px-6 md:px-12 lg:px-24 xl:px-32" data-v-f6c9a1fc><div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 w-full max-w-6xl mx-auto" data-v-f6c9a1fc><div class="flex flex-col justify-center section-content" data-v-f6c9a1fc><p class="label-sm mb-6" data-v-f6c9a1fc>${ssrInterpolate(_ctx.$t("nav.about"))}</p><h2 class="display-lg mb-6" data-v-f6c9a1fc>${ssrInterpolate(_ctx.$t("about.title"))}<br data-v-f6c9a1fc><em class="font-serif not-italic" style="${ssrRenderStyle({ "color": "var(--gold)" })}" data-v-f6c9a1fc>${ssrInterpolate(_ctx.$t("about.titleHighlight"))}</em></h2><p class="text-sm leading-relaxed mb-4" style="${ssrRenderStyle({ "color": "var(--text-secondary)", "max-width": "420px" })}" data-v-f6c9a1fc>${ssrInterpolate(_ctx.$t("about.desc1"))}</p><p class="text-sm leading-relaxed mb-10" style="${ssrRenderStyle({ "color": "var(--text-secondary)", "max-width": "420px" })}" data-v-f6c9a1fc>${ssrInterpolate(_ctx.$t("about.desc2"))}</p><div class="flex flex-wrap gap-2 mb-10" data-v-f6c9a1fc><span class="text-xs font-medium px-3 py-1 rounded-full opacity-50" data-v-f6c9a1fc>${ssrInterpolate(_ctx.$t("about.skillsTitle"))}:</span><!--[-->`);
      ssrRenderList(skills, (skill) => {
        _push(`<span class="skill-pill" data-v-f6c9a1fc>${ssrInterpolate(skill)}</span>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-3 gap-6 border-t pt-8" style="${ssrRenderStyle({ "border-color": "hsl(var(--border))" })}" data-v-f6c9a1fc><!--[-->`);
      ssrRenderList(stats.value, (stat) => {
        _push(`<div data-v-f6c9a1fc><div class="font-serif text-2xl font-bold mb-1" style="${ssrRenderStyle({ "color": "var(--gold)" })}" data-v-f6c9a1fc>${ssrInterpolate(stat.value)}</div><div class="label-sm" data-v-f6c9a1fc>${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div></div><div class="hidden lg:flex items-center justify-center section-content" data-v-f6c9a1fc><div class="about-visual relative w-full max-w-md aspect-[4/5]" data-v-f6c9a1fc><div class="about-shape overflow-hidden relative w-full h-full rounded-3xl" style="${ssrRenderStyle({ "background": "var(--background-secondary)", "border": "1px solid hsl(var(--border))" })}" data-v-f6c9a1fc><img${ssrRenderAttr("src", images[currentImageIndex.value])} alt="Profile" class="absolute inset-0 w-full h-full object-cover" data-v-f6c9a1fc></div><!--[-->`);
      ssrRenderList(badges, (badge) => {
        _push(`<div class="absolute flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium z-10" style="${ssrRenderStyle(`${badge.style}; background: hsl(var(--background)); border: 1px solid hsl(var(--border)); box-shadow: 0 8px 24px hsl(var(--foreground)/0.08)`)}" data-v-f6c9a1fc><span data-v-f6c9a1fc>${ssrInterpolate(badge.icon)}</span><span data-v-f6c9a1fc>${ssrInterpolate(badge.text)}</span></div>`);
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
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-f6c9a1fc"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SectionWorks",
  __ssrInlineRender: true,
  props: {
    works: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section",
        id: "works",
        "aria-label": "Selected Works"
      }, _attrs))} data-v-7fc8ac13><div class="flex flex-col justify-center min-h-full py-24 px-6 md:px-12 lg:px-24 xl:px-32" data-v-7fc8ac13><div class="w-full max-w-6xl mx-auto flex flex-col h-full section-content" data-v-7fc8ac13><div class="flex items-end justify-between mb-12" data-v-7fc8ac13><div data-v-7fc8ac13><p class="label-sm mb-4" data-v-7fc8ac13>${ssrInterpolate(_ctx.$t("works.label"))}</p><h2 class="display-lg leading-tight" data-v-7fc8ac13>${ssrInterpolate(_ctx.$t("works.title"))}<br data-v-7fc8ac13><em class="font-serif not-italic" style="${ssrRenderStyle({ "color": "var(--gold)" })}" data-v-7fc8ac13>${ssrInterpolate(_ctx.$t("works.titleHighlight"))}</em></h2></div>`);
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
      _push(`</div>`);
      if (__props.works.length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 section-content" data-v-7fc8ac13><!--[-->`);
        ssrRenderList(__props.works, (work) => {
          _push(`<div class="blog-card group cursor-pointer" data-v-7fc8ac13><div class="flex items-center justify-between mb-2" data-v-7fc8ac13><span class="label-sm" data-v-7fc8ac13>${ssrInterpolate(work.tech_stack && work.tech_stack[0] ? work.tech_stack[0] : "Project")}</span><span class="text-xs opacity-50" data-v-7fc8ac13>${ssrInterpolate(work.year || "2024")}</span></div><div class="flex flex-col flex-1" data-v-7fc8ac13><h3 class="font-serif text-lg leading-snug group-hover:text-[var(--gold)] transition-colors" data-v-7fc8ac13>${ssrInterpolate(work.title)}</h3><p class="text-xs leading-relaxed mt-2 opacity-60 flex-1" data-v-7fc8ac13>${ssrInterpolate(work.description)}</p></div><div class="flex items-center justify-between pt-4 mt-4" style="${ssrRenderStyle({ "border-top": "1px solid hsl(var(--border))" })}" data-v-7fc8ac13><div class="flex items-center gap-2" data-v-7fc8ac13><span class="text-[1.2rem]" data-v-7fc8ac13>${ssrInterpolate(work.emoji || "✦")}</span><span class="text-[10px] uppercase tracking-widest opacity-40" data-v-7fc8ac13>${ssrInterpolate(_ctx.$t("works.viewCase"))}</span></div><span class="text-xs font-medium group-hover:translate-x-1 transition-transform" data-v-7fc8ac13>${ssrInterpolate(_ctx.$t("works.details"))}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-20 opacity-30 text-xs uppercase tracking-widest" data-v-7fc8ac13>${ssrInterpolate(_ctx.$t("works.noWorks") || "Fetching projects...")}</div>`);
      }
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SectionWorks.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7fc8ac13"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SectionBlog",
  __ssrInlineRender: true,
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    ref(null);
    ref(null);
    function formatDate(dateStr) {
      if (!dateStr) return "Oct 2024";
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section",
        id: "blog",
        "aria-label": "Blog"
      }, _attrs))}><div class="flex flex-col justify-center min-h-full py-24 px-6 md:px-12 lg:px-24 xl:px-32"><div class="max-w-6xl mx-auto w-full"><div class="flex items-end justify-between mb-12 section-content"><div><p class="label-sm mb-3">${ssrInterpolate(_ctx.$t("blog.label"))}</p><h2 class="display-lg">${ssrInterpolate(_ctx.$t("blog.title"))}<br><em class="font-serif not-italic" style="${ssrRenderStyle({ "color": "var(--gold)" })}">${ssrInterpolate(_ctx.$t("blog.titleHighlight"))}</em></h2></div>`);
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
      _push(`</div>`);
      if (__props.posts.length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 section-content"><!--[-->`);
        ssrRenderList(__props.posts, (post) => {
          _push(`<article class="blog-card cursor-pointer"${ssrRenderAttr("aria-label", post.title)}><div class="flex items-center justify-between"><span class="label-sm">${ssrInterpolate(post.tag || "Writing")}</span><time class="text-xs" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(formatDate(post.createdAt))}</time></div><h3 class="font-serif text-lg leading-snug group-hover:text-[var(--gold)] transition-colors">${ssrInterpolate(post.title)}</h3><p class="text-xs leading-relaxed flex-1" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(post.excerpt)}</p><div class="flex items-center justify-between pt-2" style="${ssrRenderStyle({ "border-top": "1px solid hsl(var(--border))" })}"><span class="text-xs" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(post.readTime || "5 min read")}</span><span class="text-xs font-medium hover:opacity-70 transition-opacity cursor-pointer">${ssrInterpolate(_ctx.$t("blog.read"))}</span></div></article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-20 opacity-30 text-xs uppercase tracking-widest">${ssrInterpolate(_ctx.$t("blog.noPosts") || "Fetching blog posts...")}</div>`);
      }
      _push(`</div></div></section>`);
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
      }, _attrs))}><div class="flex items-center min-h-full py-24 px-6 md:px-12 lg:px-24 xl:px-32"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full max-w-6xl mx-auto"><div class="flex flex-col justify-center section-content"><p class="label-sm mb-6">${ssrInterpolate(_ctx.$t("contact.label"))}</p><h2 class="display-lg mb-6">${ssrInterpolate(_ctx.$t("contact.title"))}<br> ${ssrInterpolate(_ctx.$t("contact.title2"))} <em class="font-serif not-italic block" style="${ssrRenderStyle({ "color": "var(--gold)" })}">${ssrInterpolate(_ctx.$t("contact.titleHighlight"))}</em></h2><p class="text-sm leading-relaxed mb-10" style="${ssrRenderStyle({ "color": "var(--text-secondary)", "max-width": "360px" })}">${ssrInterpolate(_ctx.$t("contact.desc"))}</p><div class="flex flex-col gap-4"><!--[-->`);
      ssrRenderList(socials, (link) => {
        _push(`<a${ssrRenderAttr("href", link.href)} target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 text-sm font-medium group" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}"><span class="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 group-hover:scale-110" style="${ssrRenderStyle({ "background": "hsl(var(--muted))", "border": "1px solid hsl(var(--border))" })}">${ssrInterpolate(link.icon)}</span><span class="group-hover:opacity-100 opacity-70 transition-opacity">${ssrInterpolate(link.label)}</span><span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span></a>`);
      });
      _push(`<!--]--></div><div class="mt-10 pt-8" style="${ssrRenderStyle({ "border-top": "1px solid hsl(var(--border))" })}"><p class="text-xs mb-3" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(_ctx.$t("contact.emailLabel"))}</p><a href="mailto:hello@example.com" class="text-xl font-medium hover:opacity-70 transition-opacity">${ssrInterpolate(_ctx.$t("contact.emailCta"))} ↗ </a></div><div class="flex flex-col gap-2 section-content"><p class="text-xs" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(_ctx.$t("contact.footerDesign"))} ☕️ ${ssrInterpolate(_ctx.$t("contact.footerBy"))}</p><p class="text-[10px] uppercase tracking-widest opacity-40"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} — All rights reserved. </p></div></div><div class="flex flex-col justify-center section-content"><form novalidate class="flex flex-col gap-8"><div><label class="label-sm block mb-3" for="name">Name</label><input id="name"${ssrRenderAttr("value", form.name)} type="text" placeholder="Your name" class="contact-input" required autocomplete="name"></div><div><label class="label-sm block mb-3" for="email">Email</label><input id="email"${ssrRenderAttr("value", form.email)} type="email" placeholder="your@email.com" class="contact-input" required autocomplete="email"></div><div><label class="label-sm block mb-3" for="message">Message</label><textarea id="message" placeholder="Tell me about your project..." rows="4" class="contact-input resize-none" required>${ssrInterpolate(form.message)}</textarea></div><div class="flex items-center gap-6"><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(sending.value) ? " disabled" : ""}><span>${ssrInterpolate(sending.value ? "Sending…" : "Send message")}</span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="transition-transform group-hover:translate-x-1"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
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
const usePortfolioStore = defineStore("portfolio", {
  state: () => ({
    projects: [],
    blogs: [],
    loading: false,
    error: null,
    fetched: false
  }),
  actions: {
    async fetchPublicData(username = "ahmadrenhoran") {
      if (this.fetched) return;
      this.loading = true;
      const config = useRuntimeConfig();
      config.public.apiBase = "https://acaca28-backend.hf.space/api";
      const apiBase = config.public.apiBase.replace(/\/$/, "");
      try {
        const [projectsRes, blogsRes] = await Promise.all([
          $fetch(`${apiBase}/v1/public/${username}/portfolio`),
          $fetch(`${apiBase}/v1/public/${username}/blog`)
        ]);
        if (projectsRes.success) this.projects = projectsRes.data;
        if (blogsRes.success) this.blogs = blogsRes.data;
        this.fetched = true;
      } catch (err) {
        this.error = err.message || "Failed to fetch portfolio data";
        console.error("Portfolio Store Error:", err);
      } finally {
        this.loading = false;
      }
    }
  }
});
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
    const portfolioStore = usePortfolioStore();
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
      const _component_ClientOnly = __nuxt_component_0$1;
      const _component_SectionHero = _sfc_main$5;
      const _component_SectionAbout = __nuxt_component_2;
      const _component_SectionWorks = __nuxt_component_3;
      const _component_SectionBlog = _sfc_main$2;
      const _component_SectionContact = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-home" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="grain" aria-hidden="true"></div><div class="logo" aria-label="Ahmad Renhoran"><img${ssrRenderAttr("src", _imports_0)} class="${ssrRenderClass(isDark.value ? "invert" : "")}" width="24" height="24" alt="Logo"></div><div class="top-right flex flex-wrap justify-end items-center gap-3 md:gap-6 max-w-[60vw]"><button class="theme-toggle"${ssrRenderAttr("aria-label", `Switch to ${isDark.value ? "light" : "dark"} mode`)}${ssrRenderAttr("title", `Switch to ${isDark.value ? "light" : "dark"} mode`)}>`);
      if (isDark.value) {
        _push(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`);
      } else {
        _push(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`);
      }
      _push(`</button><button class="text-xs font-bold uppercase opacity-50 hover:opacity-100 transition-opacity">${ssrInterpolate(unref(locale) === "en" ? "ID" : "EN")}</button><a href="/assets/docs/resume.pdf" download class="hidden sm:inline-block text-xs font-medium tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">${ssrInterpolate(_ctx.$t("nav.resume"))}</a><button class="text-xs font-medium tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">${ssrInterpolate(_ctx.$t("nav.sayHi"))}</button></div><nav class="fixed bottom-6 left-0 right-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-8 md:left-auto flex flex-row md:flex-col justify-center items-center md:items-end gap-6 md:gap-5 z-50 pointer-events-auto" aria-label="Section navigation"><!--[-->`);
      ssrRenderList(sections.value, (section, i) => {
        _push(`<a class="${ssrRenderClass(["nav-link group relative cursor-pointer", { "opacity-100": currentSection.value === i, "opacity-30": currentSection.value !== i }])}" role="button"${ssrRenderAttr("aria-current", currentSection.value === i ? "page" : void 0)}><span class="hidden md:block text-xs font-semibold tracking-widest uppercase transition-all duration-300 pr-4 group-hover:opacity-100">${ssrInterpolate(section.label)}</span><span class="${ssrRenderClass(["absolute right-0 md:-right-2 top-1/2 -translate-y-1/2 md:translate-y-[-50%] transition-all duration-500 rounded-full bg-current", currentSection.value === i ? "w-2 h-2 md:w-1 md:h-5 bg-[var(--gold)]" : "w-1.5 h-1.5 md:w-1 md:h-1 opacity-50 group-hover:scale-150"])}"></span></a>`);
      });
      _push(`<!--]--></nav><div class="bottom-left hidden md:block">${ssrInterpolate(_ctx.$t("nav.writing"))}</div><div class="bottom-right hidden md:block">${ssrInterpolate(_ctx.$t("nav.developing"))}</div><div class="scroll-container"><div class="sections-wrapper">`);
      _push(ssrRenderComponent(_component_SectionHero, { onScrollTo: scrollTo }, null, _parent));
      _push(ssrRenderComponent(_component_SectionAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionWorks, {
        works: unref(portfolioStore).projects
      }, null, _parent));
      _push(ssrRenderComponent(_component_SectionBlog, {
        posts: unref(portfolioStore).blogs
      }, null, _parent));
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
//# sourceMappingURL=index-29FPK8ta.js.map
