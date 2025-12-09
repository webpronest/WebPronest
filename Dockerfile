# -----------------------
# 1. Builder image
# -----------------------
FROM node:20-slim AS builder
WORKDIR /app

# Receive arguments for build
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_REDIRECT_URI

# Set environment variables for build with the received arguments
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}
ENV NEXT_PUBLIC_REDIRECT_URI=${NEXT_PUBLIC_REDIRECT_URI}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy full project
COPY . .

# Build Next.js → output goes to /app/dist
RUN npm run build

# -----------------------
# 2. Production image
# -----------------------
FROM node:20-slim
WORKDIR /app

# Copy only what is needed for running Next.js
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./


# 🔥 Add health check here
HEALTHCHECK --interval=30s --timeout=5s --retries=5 \
  CMD node -e "fetch('http://localhost:3000/api/health').then(r=>r.ok?process.exit(0):process.exit(1)).catch(()=>process.exit(1))"

# You must use next start
CMD ["npm", "start"]
