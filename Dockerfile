# Stage 1: Build
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build aplikasi Nuxt
RUN npm run build

FROM node:24-alpine

WORKDIR /app

RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

COPY --chown=user:user --from=builder /app/.output ./.output
COPY --chown=user:user --from=builder /app/package*.json ./

ENV HOST=0.0.0.0
ENV PORT=7860
ENV NODE_ENV=production

EXPOSE 7860

CMD ["node", ".output/server/index.mjs"]