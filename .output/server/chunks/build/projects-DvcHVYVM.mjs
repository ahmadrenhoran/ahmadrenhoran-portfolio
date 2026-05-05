import { _ as __nuxt_component_0 } from './nuxt-link-Vh6ZL3EF.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { useI18n } from 'vue-i18n';
import { u as useHead } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "projects",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHead({ title: t("projects.title") + " \u2014 Ahmad Renhoran" });
    const activeFilter = ref("All");
    const categories = ["All", "Branding", "UI/UX", "Illustration", "Mobile", "Web"];
    const projects = [
      {
        title: "Aether \u2014 Brand Identity",
        desc: "Full visual system for a mindfulness app with custom iconography and motion guidelines.",
        tag: "Branding",
        year: "2024",
        emoji: "\u{1F33F}",
        color: "linear-gradient(135deg, #0d3e1b 0%, #1a6e3a 100%)"
      },
      {
        title: "Lumina \u2014 Dashboard UI",
        desc: "Dashboard for creative analytics with real-time data visualization.",
        tag: "UI/UX",
        year: "2024",
        emoji: "\u2726",
        color: "linear-gradient(135deg, #1a2e1a 0%, #213e16 50%, #346012 100%)"
      },
      {
        title: "Forest Tales \u2014 Illustration",
        desc: "Series of editorial illustrations exploring the relationship between nature and technology.",
        tag: "Illustration",
        year: "2023",
        emoji: "\u{1F98B}",
        color: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)"
      },
      {
        title: "Nomad \u2014 Travel App",
        desc: "Travel companion app for slow explorers who prefer mindful journeys.",
        tag: "Mobile",
        year: "2023",
        emoji: "\u{1F3D4}",
        color: "linear-gradient(135deg, #1f3d2b 0%, #266b42 100%)"
      },
      {
        title: "Verdant \u2014 E-Commerce",
        desc: "A sustainable fashion marketplace built with modern web technologies.",
        tag: "Web",
        year: "2023",
        emoji: "\u{1F6CD}",
        color: "linear-gradient(135deg, #0a2e1a 0%, #145a33 100%)"
      },
      {
        title: "Pulse \u2014 Health Dashboard",
        desc: "Health tracking dashboard with elegant data visualization and insights.",
        tag: "UI/UX",
        year: "2023",
        emoji: "\u{1F49A}",
        color: "linear-gradient(135deg, #142e14 0%, #1e5a1e 100%)"
      },
      {
        title: "Canopy \u2014 Brand System",
        desc: "Comprehensive brand system for an environmental nonprofit organization.",
        tag: "Branding",
        year: "2022",
        emoji: "\u{1F333}",
        color: "linear-gradient(135deg, #1a3e0d 0%, #3a6e1a 100%)"
      },
      {
        title: "Bloom \u2014 Mobile App",
        desc: "Plant care app with AI-powered diagnosis and community features.",
        tag: "Mobile",
        year: "2022",
        emoji: "\u{1F331}",
        color: "linear-gradient(135deg, #0d2e0d 0%, #1a6e1a 100%)"
      }
    ];
    const filteredProjects = computed(() => {
      if (activeFilter.value === "All") return projects;
      return projects.filter((p) => p.tag === activeFilter.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen",
        style: { "background": "hsl(var(--background))", "color": "hsl(var(--foreground))" }
      }, _attrs))}><header class="py-20 mb-8 border-b border-white/5"><div class="max-w-6xl mx-auto px-8 md:px-12 w-full">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center gap-2 text-xs font-medium opacity-50 hover:opacity-100 transition-opacity mb-12"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>\u2190</span> ${ssrInterpolate(_ctx.$t("projects.back"))}`);
          } else {
            return [
              createVNode("span", null, "\u2190"),
              createTextVNode(" " + toDisplayString(_ctx.$t("projects.back")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="label-sm mb-4">${ssrInterpolate(_ctx.$t("projects.label"))}</p><h1 class="display-lg mb-6">${ssrInterpolate(_ctx.$t("projects.headline"))}<br><em class="font-serif not-italic" style="${ssrRenderStyle({ "color": "var(--gold)" })}">${ssrInterpolate(_ctx.$t("projects.headlineHighlight"))}</em></h1><p class="text-sm leading-relaxed" style="${ssrRenderStyle({ "color": "var(--text-secondary)", "max-width": "400px" })}">${ssrInterpolate(_ctx.$t("projects.desc"))}</p></div></header><main class="pb-20 px-6 md:px-12"><div class="max-w-6xl mx-auto"><div class="flex flex-wrap gap-2 mb-12"><!--[-->`);
      ssrRenderList(categories, (cat) => {
        _push(`<button class="${ssrRenderClass([activeFilter.value === cat ? "text-white" : "opacity-50 hover:opacity-100", "px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300"])}" style="${ssrRenderStyle(activeFilter.value === cat ? "background: var(--gold)" : "background: hsl(var(--muted)); border: 1px solid hsl(var(--border))")}">${ssrInterpolate(cat === "All" ? _ctx.$t("projects.filterAll") : cat)}</button>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(filteredProjects.value, (work) => {
        _push(`<div class="blog-card group cursor-pointer"><div class="flex items-center justify-between mb-2"><span class="label-sm">${ssrInterpolate(work.tag)}</span><span class="text-xs opacity-50">${ssrInterpolate(work.year)}</span></div><div class="flex flex-col flex-1"><h3 class="font-serif text-lg leading-snug group-hover:text-[var(--gold)] transition-colors">${ssrInterpolate(work.title)}</h3><p class="text-xs leading-relaxed mt-2 opacity-60 flex-1">${ssrInterpolate(work.desc)}</p></div><div class="flex items-center justify-between pt-4 mt-4" style="${ssrRenderStyle({ "border-top": "1px solid hsl(var(--border))" })}"><div class="flex items-center gap-2"><span class="text-[1.2rem]">${ssrInterpolate(work.emoji)}</span><span class="text-[10px] uppercase tracking-widest opacity-40">${ssrInterpolate(_ctx.$t("works.viewCase"))}</span></div><span class="text-xs font-medium group-hover:translate-x-1 transition-transform">${ssrInterpolate(_ctx.$t("works.details"))}</span></div></div>`);
      });
      _push(`<!--]--></div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=projects-DvcHVYVM.mjs.map
