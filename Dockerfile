# -----------------------
# 1. Dependencies layer (cache-friendly)
# -----------------------
FROM node:20-slim AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

# -----------------------
# 2. Builder layer
# -----------------------
FROM node:20-slim AS builder
WORKDIR /app

# Build-time args
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_REDIRECT_URI

ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}
ENV NEXT_PUBLIC_REDIRECT_URI=${NEXT_PUBLIC_REDIRECT_URI}

# Copy deps from deps layer
COPY --from=deps /app/node_modules ./node_modules

# Copy source
COPY . .

# Build Next.js
RUN npm run build

# -----------------------
# 3. Production runtime
# -----------------------
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only what is needed to run
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Security: run as non-root
RUN useradd -m nextjs
USER nextjs

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --retries=5 \
  CMD node -e "fetch('http://localhost:3000/api/health').then(r=>r.ok?process.exit(0):process.exit(1)).catch(()=>process.exit(1))"

EXPOSE 3000
CMD ["npm", "start"]
