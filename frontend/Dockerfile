# Frontend Dockerfile
# Multi-stage build for Next.js application

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy shared package first
COPY shared/package*.json ../shared/
COPY shared/ ../shared/

# Install shared dependencies
WORKDIR /app/shared
RUN npm ci --only=production

# Copy frontend package files
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy shared module
COPY --from=deps /app/shared ../shared

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy frontend source
COPY frontend/ .

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy shared module
COPY --from=builder /app/../shared ../shared

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]