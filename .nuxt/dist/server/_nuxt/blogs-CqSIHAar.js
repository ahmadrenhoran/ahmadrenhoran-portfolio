import { _ as __nuxt_component_0 } from "./nuxt-link-BkxPBZ6Z.js";
import { defineComponent, ref, computed, mergeProps, withCtx, openBlock, createBlock, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { u as useHead } from "../server.mjs";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/ufo/dist/index.mjs";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/defu/dist/defu.mjs";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/unctx/dist/index.mjs";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/h3/dist/index.mjs";
import "pinia";
import "vue-router";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/klona/dist/index.mjs";
import "/Users/asani/Development/sideproject/portfolio-management/portfolio/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "blogs",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHead({ title: t("blogs.title") + " — Ahmad Renhoran" });
    const activeFilter = ref("All");
    const categories = ["All", "Design", "Writing", "Tutorial", "Life", "Motion"];
    const posts = [
      {
        title: "Why Every Designer Should Keep a Sketchbook",
        tag: "Design",
        date: "Oct 2024",
        excerpt: "In a world of infinite digital canvases, the humble sketchbook remains the most powerful design tool I own. Here is why analog thinking still matters.",
        readTime: "5 min read"
      },
      {
        title: "On the Art of Noticing Small Things",
        tag: "Writing",
        date: "Sep 2024",
        excerpt: "The most profound creative breakthroughs come not from grand gestures but from learning to pay deep attention to the ordinary moments around us.",
        readTime: "7 min read"
      },
      {
        title: "Building a Design System from Zero",
        tag: "Tutorial",
        date: "Aug 2024",
        excerpt: "A practical walkthrough of how I approach design systems — from token architecture to component philosophy and everything in between.",
        readTime: "12 min read"
      },
      {
        title: "Living With Animals: What They Teach Us About Design",
        tag: "Life",
        date: "Jul 2024",
        excerpt: "My cats have taught me more about user behavior than any UX textbook ever could. Observations from a designer who lives with two curious felines.",
        readTime: "4 min read"
      },
      {
        title: "Motion Design Principles I Return To",
        tag: "Motion",
        date: "Jun 2024",
        excerpt: "Six foundational principles for animation that make interfaces feel alive — not just fast. Lessons learned from years of crafting micro-interactions.",
        readTime: "8 min read"
      },
      {
        title: "The Typography Rules I Always Break",
        tag: "Design",
        date: "May 2024",
        excerpt: "Rules exist to be understood deeply before you break them intentionally. Here are the ones I break most often, and the reasoning behind each choice.",
        readTime: "6 min read"
      },
      {
        title: "Finding Inspiration in Constraints",
        tag: "Design",
        date: "Apr 2024",
        excerpt: "Why limitations are not the enemy of creativity — they are the catalyst. A case study on how tight briefs produced my best work.",
        readTime: "5 min read"
      },
      {
        title: "The Quiet Power of White Space",
        tag: "Writing",
        date: "Mar 2024",
        excerpt: "In design and writing alike, what you leave out is just as important as what you put in. An exploration of negative space across disciplines.",
        readTime: "6 min read"
      },
      {
        title: "How I Structure My Creative Mornings",
        tag: "Life",
        date: "Feb 2024",
        excerpt: "A peek into the morning routines that keep me creatively energized. Spoiler: it involves plants, cats, and zero screens for the first hour.",
        readTime: "4 min read"
      },
      {
        title: "CSS Architecture for Large Projects",
        tag: "Tutorial",
        date: "Jan 2024",
        excerpt: "Strategies for maintaining scalable, maintainable stylesheets in complex applications. From naming conventions to file organization.",
        readTime: "10 min read"
      }
    ];
    const filteredPosts = computed(() => {
      if (activeFilter.value === "All") return posts;
      return posts.filter((p) => p.tag === activeFilter.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen",
        style: { "background": "hsl(var(--background))", "color": "hsl(var(--foreground))" }
      }, _attrs))}><header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style="${ssrRenderStyle({ "background": "hsl(var(--background) / 0.8)", "border-bottom": "1px solid hsl(var(--border))" })}"><div class="max-w-6xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-3 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-x-1"${_scopeId}><path d="M19 12H5M12 19l-7-7 7-7"${_scopeId}></path></svg><span class="text-xs font-semibold tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity"${_scopeId}>${ssrInterpolate(_ctx.$t("blogs.back"))}</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                class: "transition-transform group-hover:-translate-x-1"
              }, [
                createVNode("path", { d: "M19 12H5M12 19l-7-7 7-7" })
              ])),
              createVNode("span", { class: "text-xs font-semibold tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity" }, toDisplayString(_ctx.$t("blogs.back")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="font-serif text-lg">${ssrInterpolate(_ctx.$t("blogs.title"))}</h1><div class="w-16"></div></div></header><main class="pt-28 pb-20 px-6 md:px-12"><div class="max-w-6xl mx-auto"><div class="mb-16"><p class="label-sm mb-4">${ssrInterpolate(_ctx.$t("blogs.label"))}</p><h2 class="display-lg mb-4">${ssrInterpolate(_ctx.$t("blogs.headline"))}<br><em class="font-serif not-italic" style="${ssrRenderStyle({ "color": "var(--gold)" })}">${ssrInterpolate(_ctx.$t("blogs.headlineHighlight"))}</em></h2><p class="text-sm leading-relaxed" style="${ssrRenderStyle({ "color": "var(--text-secondary)", "max-width": "480px" })}">${ssrInterpolate(_ctx.$t("blogs.desc"))}</p></div><div class="flex flex-wrap gap-2 mb-12"><!--[-->`);
      ssrRenderList(categories, (cat) => {
        _push(`<button class="${ssrRenderClass([activeFilter.value === cat ? "text-white" : "opacity-50 hover:opacity-100", "px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300"])}" style="${ssrRenderStyle(activeFilter.value === cat ? "background: var(--gold)" : "background: hsl(var(--muted)); border: 1px solid hsl(var(--border))")}">${ssrInterpolate(cat === "All" ? _ctx.$t("blogs.filterAll") : cat)}</button>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
      ssrRenderList(filteredPosts.value, (post) => {
        _push(`<article class="blog-card"><div class="flex items-center justify-between"><span class="label-sm">${ssrInterpolate(post.tag)}</span><time class="text-xs" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(post.date)}</time></div><h3 class="font-serif text-xl leading-snug">${ssrInterpolate(post.title)}</h3><p class="text-sm leading-relaxed flex-1" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(post.excerpt)}</p><div class="flex items-center justify-between pt-3" style="${ssrRenderStyle({ "border-top": "1px solid hsl(var(--border))" })}"><span class="text-xs" style="${ssrRenderStyle({ "color": "var(--text-secondary)" })}">${ssrInterpolate(post.readTime)}</span><span class="text-xs font-semibold hover:opacity-70 transition-opacity cursor-pointer" style="${ssrRenderStyle({ "color": "var(--gold)" })}">${ssrInterpolate(_ctx.$t("blog.readArticle"))}</span></div></article>`);
      });
      _push(`<!--]--></div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blogs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=blogs-CqSIHAar.js.map
