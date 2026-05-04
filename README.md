# Ahmad Renhoran — Portfolio

Premium portfolio website built with **Nuxt 3** + **Tailwind CSS** + **shadcn-nuxt** + **GSAP** + **Three.js**.

## ✨ Features

- **Full-page scroll snap** — each section occupies 100vh; GSAP `power4.inOut` handles transitions
- **Three.js hero** — animated 3D sphere with orbital nodes, connection lines, and particle ring
- **Dark mode** — `@nuxtjs/color-mode` with CSS custom properties for instant switching
- **Vertical side navigation** — section names rotated 90°, right-aligned, active state tracked
- **Scroll progress dots** — left-side pill indicators per section
- **Keyboard navigation** — Arrow Up/Down + PageUp/PageDown
- **Touch/swipe** — mobile swipe support
- **SEO-optimized** — complete meta tags, OG/Twitter cards, robots.txt, sitemap.xml
- **Custom fonts** — DM Sans (body) + DM Serif Display (headings), matching original design

## 🚀 Setup

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate
```

## 📁 Structure

```
portfolio/
├── app.vue                   # Root: layout, GSAP scroll, nav, dark mode
├── assets/css/main.css       # Design tokens, CSS variables, utilities
├── components/
│   ├── ThreeHero.vue         # Three.js 3D sphere scene
│   ├── SectionHero.vue       # Landing section
│   ├── SectionAbout.vue      # About me
│   ├── SectionWorks.vue      # Work grid
│   ├── SectionBlog.vue       # Blog cards
│   └── SectionContact.vue    # Contact form + socials
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── nuxt.config.ts
└── tailwind.config.ts
```

## 🎨 Design System

| Token | Light | Dark |
|-------|-------|------|
| `--background` | `hsl(0 0% 98%)` | `hsl(222 28% 6%)` |
| `--foreground` | `hsl(220 25% 8%)` | `hsl(220 20% 92%)` |
| `--accent` | `hsl(220 60% 18%)` | `hsl(210 40% 65%)` |
| `--gold` | `#c9a84c` | `#d4a853` |
| `--navy` | `#0d1b3e` | `#0f1729` |

Fonts: **DM Serif Display** (display/serif) + **DM Sans** (body/UI)

## 📸 Optional: Add Your Photo to the 3D Sphere

In `components/ThreeHero.vue`, uncomment and configure:

```javascript
// Option: Replace sphere with your photo texture
const PHOTO_TEXTURE_URL = '/your-photo.jpg'

// In createSphere(), change the material to:
const matSphere = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load(PHOTO_TEXTURE_URL),
  shininess: 40,
})
```

Place your photo in the `public/` folder.

## 🔧 Customization

1. **Content** — Edit section components in `components/`
2. **Colors** — Update CSS variables in `assets/css/main.css`
3. **SEO** — Update meta in `nuxt.config.ts`
4. **Social links** — Edit the `socials` array in `SectionContact.vue`
5. **Work projects** — Edit the `works` array in `SectionWorks.vue`
6. **Blog posts** — Edit the `posts` array in `SectionBlog.vue`

## 📱 Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 🌐 Deploy

Works on Vercel, Netlify, Cloudflare Pages:

```bash
# Vercel
vercel --prod

# Netlify (static)
npm run generate && netlify deploy --dir=.output/public --prod
```
