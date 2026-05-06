---
title: Portfolio FE
emoji: 🚀
colorFrom: blue
colorTo: indigo
sdk: docker
pinned: false
---
# 🌐 Portfolio Management - Public Showcase

This is the public-facing portfolio website template built with Nuxt 3. It serves as a reference implementation for consuming the Portfolio Management Headless API.

## 🚀 Features

- **Dynamic Data**: Fetches blogs, portfolios, and resumes directly from the Headless API.
- **Modern UI**: Built with Tailwind CSS and Three.js for a high-impact visual experience.
- **Multilingual Content**: Demonstrates how to handle multi-language project descriptions from the API.
- **SEO Ready**: SSR (Server-Side Rendering) powered by Nuxt for optimal search engine indexing.

## 🛠️ Tech Stack

- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS
- **Visuals**: Three.js / Custom Vue components.
- **API Client**: Built-in Nuxt `$fetch`.

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Configure API**:
    Ensure the backend is running, then configure your environment variables (usually in `nuxt.config.ts` or `.env`).
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## 🔌 API Consumption Example

This app consumes endpoints like:
- `GET /api/v1/public/your-username/portfolio?lang=en`
- `GET /api/v1/public/your-username/blog`
- `GET /api/v1/public/your-username/cv`

---
Part of the **Portfolio Management System**.
