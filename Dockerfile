FROM node:24-alpine

WORKDIR /app

# Menggunakan npm ci (clean install) lebih stabil untuk production
COPY package*.json ./
RUN npm ci

COPY . .

# Build Nuxt
RUN npm run build

# Environment wajib untuk Hugging Face
ENV NODE_ENV=production
ENV PORT=7860
ENV HOST=0.0.0.0

EXPOSE 7860

# Perbedaan utama ada di sini (jalur output Nuxt 3)
CMD ["node", ".output/server/index.mjs"]