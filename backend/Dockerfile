# Backend Dockerfile
# Multi-stage build for Express.js application

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

# Copy backend package files
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy shared module
COPY --from=deps /app/shared ../shared

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy backend source
COPY backend/ .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy shared module
COPY --from=builder /app/../shared ../shared

# Copy built application and node_modules
COPY --from=builder --chown=backend:nodejs /app/dist ./dist
COPY --from=builder --chown=backend:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=backend:nodejs /app/prisma ./prisma
COPY --from=builder --chown=backend:nodejs /app/package*.json ./

USER backend

EXPOSE 4000
ENV PORT 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["dumb-init", "node", "dist/server.js"]