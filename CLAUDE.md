# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BeautyConnect is a SaaS booking & business management platform for beauty, wellness, and fitness businesses in Spain and Ireland. Built as a competitive alternative to expensive booking platforms with aggressive pricing (€5.99/staff vs competitors' €20-50).

## Tech Stack

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (access tokens: 15min, refresh with rotation)
- **Real-time**: WebSocket for live availability updates
- **Caching**: Redis for availability slots and session management

### Frontend
- **Framework**: Next.js 14+ with App Router
- **UI Components**: shadcn/ui with Tailwind CSS
- **State Management**: Zustand or React Context
- **Forms**: react-hook-form with zod validation
- **Data Fetching**: TanStack Query
- **Calendar**: Custom implementation with date-fns
- **Charts**: Recharts
- **Tables**: TanStack Table

### Infrastructure
- **Hosting**: VPS (Hetzner)
- **Containerization**: Docker with Docker Compose
  - `frontend`: Next.js application container
  - `backend`: Express.js API server container
  - `postgres`: PostgreSQL database container
  - `redis`: Redis cache container
- **Email**: Resend or Postmark
- **CDN**: Cloudflare
- **Monitoring**: Sentry, Uptime Robot
- **Container Registry**: Docker Hub or GitHub Container Registry
- **Shared Modules**: `@beautyconnect/shared` package for type safety
- **Workspace Management**: npm workspaces for monorepo structure

## Development Commands

### Docker Commands

```bash
# Start all services (development)
docker compose up

# Start all services in background
docker compose up -d

# Build and start all services
docker compose up --build

# Stop all services
docker compose down

# Stop all services and remove volumes
docker compose down -v

# View logs for all services
docker compose logs -f

# View logs for specific service
docker compose logs -f backend
docker compose logs -f frontend

# Access container shell
docker compose exec backend sh
docker compose exec frontend sh

# Run database migrations
docker compose exec backend npm run db:migrate

# Seed database
docker compose exec backend npm run db:seed

# Run tests in container
docker compose exec backend npm test
docker compose exec frontend npm test

# Rebuild specific service
docker compose build backend
docker compose build frontend

# Check container health
docker compose ps

# Production deployment
docker compose -f compose.yml -f compose.prod.yml up -d
```

### Workspace Commands

```bash
# Root workspace commands (run from project root)
npm install                    # Install all workspaces
npm run install:all           # Alternative install command
npm run type-check            # Type check all workspaces
npm run type-check --workspace=shared  # Type check specific workspace

# Frontend commands (run in frontend/ directory)
cd frontend
npm install
npm run dev                    # Start Next.js dev server
npm run build                  # Build for production
npm run start                  # Start production server
npm run lint                   # Run linting
npm run type-check            # TypeScript checking

# Backend commands (run in backend/ directory)
cd backend
npm install
npm run dev                    # Start Express dev server
npm run build                  # Compile TypeScript
npm run start                  # Start production server
npm run db:migrate            # Run Prisma migrations
npm run db:seed               # Seed database
npm run db:generate           # Generate Prisma client
npm run test                  # Run tests
npm run test:watch            # Run tests in watch mode

# Shared commands (run in shared/ directory)
cd shared
npm run type-check            # Validate shared types
```

## Project Structure

```
├── shared/                      # Shared types, constants, and utilities
│   ├── package.json            # Shared package configuration
│   ├── tsconfig.json           # TypeScript config for shared code
│   ├── index.ts                # Main export file
│   ├── types/
│   │   ├── index.ts            # Type exports
│   │   ├── api.types.ts        # API request/response types
│   │   ├── models.types.ts     # Database model types
│   │   ├── auth.types.ts       # Authentication related types
│   │   └── booking.types.ts    # Booking domain types
│   ├── constants/
│   │   ├── index.ts            # Constants exports
│   │   ├── api.constants.ts    # API endpoints, status codes
│   │   ├── business.constants.ts # Business rules (pricing, limits)
│   │   └── time.constants.ts   # Time slots, durations, timezones
│   └── utils/
│       ├── index.ts            # Utility exports
│       ├── date.utils.ts       # Date/time helpers
│       ├── validation.utils.ts # Shared validation functions
│       └── format.utils.ts     # Currency, phone formatting
│
├── frontend/                    # Frontend Next.js application
│   ├── package.json            # References @beautyconnect/shared
│   ├── tsconfig.json           # Includes shared path mapping
│   ├── Dockerfile              # Frontend container (includes shared)
│   ├── .dockerignore           # Files to exclude from Docker build
│   ├── src/
│   │   ├── app/                # Next.js app router
│   │   │   ├── (public)/       # Public pages (marketplace, booking)
│   │   │   ├── (dashboard)/    # Business dashboard
│   │   │   └── (auth)/         # Authentication pages
│   │   ├── components/
│   │   │   ├── ui/             # shadcn/ui components
│   │   │   ├── calendar/       # Calendar components
│   │   │   ├── booking/        # Booking flow components
│   │   │   └── dashboard/      # Dashboard components
│   │   ├── lib/
│   │   │   ├── api/            # API client utilities
│   │   │   └── utils/          # Frontend-specific helpers
│   │   ├── hooks/              # Custom React hooks
│   │   └── types/              # Frontend-specific type definitions
│   └── public/                 # Static assets
│
├── backend/                     # Backend Express.js API
│   ├── package.json            # References @beautyconnect/shared
│   ├── tsconfig.json           # Includes shared path mapping
│   ├── Dockerfile              # Backend container (includes shared)
│   ├── .dockerignore           # Files to exclude from Docker build
│   ├── src/
│   │   ├── routes/             # Express API routes
│   │   ├── controllers/        # Route controllers
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Express middleware
│   │   ├── lib/
│   │   │   ├── db/             # Database connection and models
│   │   │   ├── redis/          # Redis client configuration
│   │   │   ├── auth/           # Authentication utilities
│   │   │   └── availability/   # Availability engine
│   │   └── utils/              # Backend-specific utilities
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── migrations/         # Database migrations
│   └── tests/                  # Backend test files
│
├── package.json                 # Root workspace configuration
├── compose.yml                  # Docker Compose configuration
├── compose.override.yml         # Local development overrides
├── compose.prod.yml            # Production configuration
└── .env.example                # Environment variables template
```

## Docker Architecture

### Container Configuration

#### 1. Frontend Container (`frontend`)
- **Base Image**: node:20-alpine
- **Port**: 3000
- **Build**: Multi-stage build for production optimization
- **Features**:
  - Next.js standalone build
  - Static asset optimization
  - Environment variable injection at runtime

#### 2. Backend Container (`backend`)
- **Base Image**: node:20-alpine
- **Port**: 4000
- **Features**:
  - Express.js with TypeScript
  - WebSocket support for real-time updates
  - Health check endpoint at `/health`
  - Graceful shutdown handling

#### 3. PostgreSQL Container (`postgres`)
- **Base Image**: postgres:16-alpine
- **Port**: 5432
- **Volumes**: 
  - `postgres_data:/var/lib/postgresql/data` - Data persistence
  - `./backend/prisma/migrations:/docker-entrypoint-initdb.d` - Auto migrations
- **Environment**:
  - `POSTGRES_DB`: beautyconnect
  - `POSTGRES_USER`: beautyconnect_user
  - `POSTGRES_PASSWORD`: (from .env)

#### 4. Redis Container (`redis`)
- **Base Image**: redis:7-alpine
- **Port**: 6379
- **Volumes**: 
  - `redis_data:/data` - Data persistence
- **Configuration**:
  - Persistence with AOF (Append Only File)
  - Maxmemory policy: allkeys-lru

### Container Networking
- **Network**: `beautyconnect_network` (bridge driver)
- **Internal DNS**: Containers communicate via service names
  - Frontend → Backend: `http://backend:4000`
  - Backend → PostgreSQL: `postgres:5432`
  - Backend → Redis: `redis:6379`

### Environment Variables Management
```yaml
# compose.yml structure
services:
  frontend:
    env_file: ./frontend/.env.local
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:4000
  
  backend:
    env_file: ./backend/.env
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/beautyconnect
      - REDIS_URL=redis://redis:6379
```

### Docker Development Best Practices

#### 1. Hot Reloading Setup
- Frontend: Next.js dev server with volume mount for `/frontend/src`
- Backend: Nodemon with volume mount for `/backend/src`
- Use `compose.override.yml` for development-specific volumes

#### 2. Volume Management
```yaml
# Development volumes for hot reload
volumes:
  - ./frontend/src:/app/src
  - ./backend/src:/app/src
  
# Named volumes for data persistence
volumes:
  postgres_data:
  redis_data:
```

#### 3. Build Optimization
- Multi-stage builds to reduce image size
- Layer caching with proper `.dockerignore`
- Separate dependency installation from code copy
- Use Alpine-based images for smaller footprint

#### 4. Security Considerations
- Never commit `.env` files
- Use secrets management in production
- Run containers as non-root user
- Keep base images updated
- Scan images for vulnerabilities

#### 5. Resource Limits
```yaml
# Set resource limits in production
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

## Shared Type Safety Architecture

### Overview
The `shared/` directory contains TypeScript types, constants, and utilities shared between frontend and backend to ensure type safety across the full stack and prevent code duplication.

### Package Configuration

#### Root Workspace (`package.json`)
```json
{
  "name": "beautyconnect",
  "private": true,
  "workspaces": [
    "frontend",
    "backend", 
    "shared"
  ],
  "scripts": {
    "install:all": "npm install --workspaces",
    "type-check": "npm run type-check --workspaces",
    "build:shared": "npm run build --workspace=shared"
  }
}
```

#### Shared Package (`shared/package.json`)
```json
{
  "name": "@beautyconnect/shared",
  "version": "1.0.0",
  "main": "index.ts",
  "types": "index.ts",
  "scripts": {
    "type-check": "tsc --noEmit",
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

#### Shared TypeScript Config (`shared/tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Frontend Integration

#### Frontend Package Updates (`frontend/package.json`)
```json
{
  "dependencies": {
    "@beautyconnect/shared": "file:../shared",
    "next": "14.0.0"
  }
}
```

#### Frontend TypeScript Config (`frontend/tsconfig.json`)
```json
{
  "compilerOptions": {
    "paths": {
      "@beautyconnect/shared/*": ["../shared/*"],
      "@/*": ["./src/*"]
    }
  }
}
```

#### Frontend Dockerfile Updates
```dockerfile
# Copy shared directory first
COPY shared/package*.json ../shared/
COPY shared/ ../shared/

# Install shared dependencies
WORKDIR /app/shared
RUN npm ci --only=production

# Then proceed with frontend build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production

COPY frontend/ .
```

### Backend Integration

#### Backend Package Updates (`backend/package.json`)
```json
{
  "dependencies": {
    "@beautyconnect/shared": "file:../shared",
    "express": "^4.18.0"
  }
}
```

#### Backend TypeScript Config (`backend/tsconfig.json`)
```json
{
  "compilerOptions": {
    "paths": {
      "@beautyconnect/shared/*": ["../shared/*"],
      "@/*": ["./src/*"]
    }
  }
}
```

#### Backend Dockerfile Updates
```dockerfile
# Copy shared directory first
COPY shared/package*.json ../shared/
COPY shared/ ../shared/

# Install shared dependencies
WORKDIR /app/shared
RUN npm ci --only=production

# Then proceed with backend build
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/ .
```

### Shared Module Structure

#### Types (`shared/types/`)

**`api.types.ts`** - API Request/Response Types
```typescript
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
```

**`models.types.ts`** - Database Model Types
```typescript
export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  timezone: string;
  currency: 'EUR' | 'GBP';
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  category: ServiceCategory;
  active: boolean;
}

export interface Appointment {
  id: string;
  businessId: string;
  serviceId: string;
  staffId: string;
  customerId?: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}
```

**`booking.types.ts`** - Booking Domain Types
```typescript
export interface TimeSlot {
  startTime: Date;
  endTime: Date;
  available: boolean;
  staffId?: string;
}

export interface BookingRequest {
  serviceId: string;
  staffId?: string;
  startTime: Date;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  notes?: string;
}

export interface AvailabilitySlot {
  date: string;
  slots: TimeSlot[];
}
```

#### Constants (`shared/constants/`)

**`api.constants.ts`** - API Endpoints and Status Codes
```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
  },
  BUSINESSES: {
    LIST: '/api/businesses',
    CREATE: '/api/businesses',
    GET: (id: string) => `/api/businesses/${id}`,
    UPDATE: (id: string) => `/api/businesses/${id}`,
  },
  APPOINTMENTS: {
    LIST: '/api/appointments',
    CREATE: '/api/appointments',
    GET: (id: string) => `/api/appointments/${id}`,
    AVAILABILITY: '/api/appointments/availability',
  }
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
```

**`business.constants.ts`** - Business Rules and Pricing
```typescript
export const PRICING_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    maxStaff: 1,
    maxServices: 5,
    maxBookingsPerMonth: 50,
  },
  PROFESSIONAL: {
    name: 'Professional',
    price: 5.99, // EUR per staff member
    maxStaff: 10,
    maxServices: 50,
    maxBookingsPerMonth: 1000,
  }
} as const;

export const BOOKING_RULES = {
  MIN_ADVANCE_BOOKING_HOURS: 2,
  MAX_ADVANCE_BOOKING_DAYS: 90,
  DEFAULT_SLOT_DURATION: 30, // minutes
  BUFFER_TIME_MINUTES: 15,
} as const;

export const BUSINESS_HOURS = {
  DEFAULT_START: '09:00',
  DEFAULT_END: '17:00',
  DEFAULT_TIMEZONE: 'Europe/Madrid',
} as const;
```

### Usage Examples

#### Backend Controller
```typescript
import { ApiResponse, BookingRequest, Appointment } from '@beautyconnect/shared/types';
import { API_ENDPOINTS, HTTP_STATUS } from '@beautyconnect/shared/constants';

export const createBooking = async (req: Request, res: Response) => {
  const bookingData: BookingRequest = req.body;
  
  try {
    const appointment = await bookingService.create(bookingData);
    
    const response: ApiResponse<Appointment> = {
      success: true,
      data: appointment,
      message: 'Booking created successfully'
    };
    
    res.status(HTTP_STATUS.CREATED).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to create booking'
    };
    
    res.status(HTTP_STATUS.BAD_REQUEST).json(response);
  }
};
```

#### Frontend API Client
```typescript
import { ApiResponse, BookingRequest, Appointment } from '@beautyconnect/shared/types';
import { API_ENDPOINTS } from '@beautyconnect/shared/constants';

export const createBooking = async (
  bookingData: BookingRequest
): Promise<Appointment> => {
  const response = await fetch(API_ENDPOINTS.APPOINTMENTS.CREATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });

  const result: ApiResponse<Appointment> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error);
  }
  
  return result.data!;
};
```

### Docker Integration

#### Updated Volume Mounts (`compose.override.yml`)
```yaml
services:
  frontend:
    volumes:
      - ./frontend/src:/app/src
      - ./shared:/app/shared  # Shared hot reload
  
  backend:
    volumes:
      - ./backend/src:/app/src
      - ./shared:/app/shared  # Shared hot reload
```

### Benefits
- **Type Safety**: Compile-time verification of API contracts
- **No Type Drift**: Frontend and backend always use identical types
- **Single Source of Truth**: Constants and utilities defined once
- **Better DX**: IntelliSense and auto-completion across full stack
- **Reduced Bugs**: Catch type mismatches at build time
- **Easier Refactoring**: Change types in one place

## Core Architecture Patterns

### 1. Availability Engine
The availability calculation is performance-critical. It uses pre-calculated slots stored in Redis with optimistic locking to prevent double-booking.

```typescript
// Example availability check pattern
const slots = await availabilityService.getSlots({
  businessId,
  serviceId,
  staffId,
  date,
  timezone
});
```

### 2. Multi-tenant Data Isolation
All queries include business context for data isolation:
```typescript
// Always filter by businessId in queries
const appointments = await Appointment.findAll({
  where: { businessId: req.user.businessId }
});
```

### 3. Real-time Updates
Critical updates (availability changes, new bookings) broadcast via WebSocket:
```typescript
// Emit updates to relevant clients
io.to(`business:${businessId}`).emit('availability:update', data);
```

### 4. API Response Pattern
Consistent API responses with TypeScript types:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## Database Schema

### Core Tables
- `businesses` - Business profiles and settings
- `users` - User accounts (owners, staff, customers)
- `services` - Service catalog per business
- `appointments` - Booking records
- `availability_rules` - Staff availability patterns
- `reviews` - Customer reviews and ratings
- `staff_members` - Staff-business relationships

### Key Relationships
- Business → has many → Services, Staff, Appointments
- Staff → has many → Appointments, Availability Rules
- Customer → has many → Appointments, Reviews
- Appointment → belongs to → Business, Service, Staff, Customer

## API Endpoints Structure

```
/api/auth/*           - Authentication (register, login, refresh)
/api/businesses/*     - Business management and marketplace
/api/appointments/*   - Booking and calendar management
/api/staff/*          - Staff management and invitations
/api/services/*       - Service catalog management
/api/customers/*      - Customer CRM features
/api/reviews/*        - Review system
/api/analytics/*      - Business analytics and reports
```

## Security Considerations

- Rate limiting: 100 requests/minute per IP
- JWT tokens with short expiry (15 minutes)
- Input validation with zod on all endpoints
- SQL injection prevention via parameterized queries
- XSS protection via React's built-in escaping
- CSRF protection via SameSite cookies
- GDPR compliance: data export and deletion endpoints

## Testing Strategy

### Unit Tests
- Service layer business logic
- Availability engine calculations
- Authentication flows

### Integration Tests
- API endpoint testing with supertest
- Database transaction testing
- WebSocket event testing

### E2E Tests (Post-MVP)
- Critical user journeys (booking flow, registration)
- Cross-browser testing

## Performance Targets

- Page load: <500ms
- API response: <200ms for reads, <500ms for writes
- Availability calculation: <100ms
- Search results: <200ms
- Real-time updates: <50ms latency

## Localization

- Default language: English
- Supported currencies: EUR (Spain), GBP (Ireland)
- Timezone handling: Store in UTC, display in business timezone
- Date format: ISO 8601 in API, localized in UI

## Deployment Workflow

### Local Development Setup
1. Clone repository
2. Copy `.env.example` to `.env` and configure
3. Run `docker compose up --build`
4. Wait for health checks to pass
5. Access frontend at `http://localhost:3000`
6. Access backend at `http://localhost:4000`

### Production Deployment (VPS)

#### Initial Setup
```bash
# On VPS server
git clone <repository>
cd beautyconnect

# Configure environment
cp .env.example .env
nano .env  # Edit production values

# Build and start services
docker compose -f compose.yml -f compose.prod.yml build
docker compose -f compose.yml -f compose.prod.yml up -d

# Initialize database
docker compose exec backend npm run db:migrate
docker compose exec backend npm run db:seed  # Optional: initial data
```

#### Continuous Deployment
1. **Pre-deployment checks**
   ```bash
   # Run tests locally
   docker compose exec backend npm test
   docker compose exec frontend npm test
   ```

2. **Build new images**
   ```bash
   docker compose -f compose.yml -f compose.prod.yml build
   ```

3. **Database backup**
   ```bash
   docker compose exec postgres pg_dump -U beautyconnect_user beautyconnect > backup_$(date +%Y%m%d).sql
   ```

4. **Rolling update**
   ```bash
   # Update backend first
   docker compose -f compose.yml -f compose.prod.yml up -d --no-deps backend
   
   # Wait for health check
   docker compose exec backend curl -f http://localhost:4000/health
   
   # Update frontend
   docker compose -f compose.yml -f compose.prod.yml up -d --no-deps frontend
   ```

5. **Post-deployment**
   ```bash
   # Run migrations if needed
   docker compose exec backend npm run db:migrate
   
   # Check service health
   docker compose ps
   
   # Monitor logs
   docker compose logs -f --tail=100
   ```

### Container Health Checks
- **Frontend**: HTTP GET `/` returns 200
- **Backend**: HTTP GET `/health` returns 200
- **PostgreSQL**: `pg_isready` command
- **Redis**: `redis-cli ping` returns PONG

### Backup Strategy
```bash
# Database backup (daily cron)
0 2 * * * docker compose exec postgres pg_dump -U beautyconnect_user beautyconnect > /backups/db_$(date +\%Y\%m\%d).sql

# Redis backup (if critical data)
0 3 * * * docker compose exec redis redis-cli BGSAVE
```

### Monitoring
- Container health: `docker compose ps`
- Resource usage: `docker stats`
- Application logs: Sentry integration
- Uptime monitoring: Uptime Robot
- Database slow queries: PostgreSQL logs

## Feature Flags

Use environment variables for feature toggles:
- `ENABLE_SMS_NOTIFICATIONS`
- `ENABLE_PAYMENT_PROCESSING`
- `ENABLE_ADVANCED_ANALYTICS`
- `ENABLE_INVENTORY_MANAGEMENT`

## Development Phases (6-Week MVP)

1. **Week 1**: Foundation & Booking Core
2. **Week 2**: Calendar & Scheduling
3. **Week 3**: Staff & Marketplace
4. **Week 4**: Reviews & Polish
5. **Week 5**: Analytics & CRM
6. **Week 6**: Inventory & Launch Prep

## Critical Dependencies

- **Availability Engine**: Blocks all booking features
- **Calendar UI**: Core user experience
- **Marketplace Search**: Customer acquisition
- **Stripe Integration**: Revenue generation

## Common Development Tasks

### Docker-Specific Tasks

#### Adding a New Environment Variable
1. Add to `.env.example` with description
2. Update relevant Dockerfile if build-time variable
3. Update `compose.yml` environment section
4. Document in this file if critical

#### Debugging Container Issues
```bash
# Check container logs
docker compose logs -f [service_name]

# Access container for debugging
docker compose exec [service_name] sh

# Check network connectivity
docker compose exec backend ping postgres
docker compose exec backend nc -zv redis 6379

# Inspect container configuration
docker inspect beautyconnect_backend_1
```

#### Database Operations
```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U beautyconnect_user -d beautyconnect

# Create database backup
docker compose exec postgres pg_dump -U beautyconnect_user beautyconnect > backup.sql

# Restore database backup
docker compose exec -T postgres psql -U beautyconnect_user beautyconnect < backup.sql

# Reset database
docker compose down -v  # Warning: deletes all data
docker compose up -d
docker compose exec backend npm run db:migrate
docker compose exec backend npm run db:seed
```

### Adding a New API Endpoint
1. Define types in `/shared/types/api.types.ts` if new interfaces needed
2. Add endpoint to `/shared/constants/api.constants.ts`
3. Define route in `/backend/src/routes/`
4. Create controller in `/backend/src/controllers/` using shared types
5. Add service logic in `/backend/src/services/`
6. Add validation schema using shared types
7. Write tests
8. Update frontend API client to use shared types and constants
9. Rebuild containers if needed: `docker compose build backend frontend`

### Creating a New Component
1. Check existing components for patterns in `/frontend/src/components/`
2. Use shadcn/ui primitives when possible
3. Import shared types: `import { SomeType } from '@beautyconnect/shared/types'`
4. Ensure mobile responsiveness
5. Add TypeScript props interface
6. Include accessibility attributes
7. Hot reload should pick up changes automatically

### Database Schema Changes
1. Update Prisma schema in `/backend/prisma/schema.prisma`
2. Update corresponding types in `/shared/types/models.types.ts`
3. Generate migration: 
   ```bash
   docker compose exec backend npx prisma migrate dev --name [migration_name]
   ```
4. Update seed data if needed in `/backend/prisma/seed.ts`
5. Test rollback scenario
6. Update TypeScript types: 
   ```bash
   docker compose exec backend npm run db:generate
   ```
7. Run shared type check: `npm run type-check --workspace=shared`

### Adding Shared Types
1. Determine correct file in `/shared/types/`:
   - API contracts → `api.types.ts`
   - Database models → `models.types.ts`
   - Authentication → `auth.types.ts`
   - Booking domain → `booking.types.ts`
2. Add the interface/type definition
3. Export from `/shared/types/index.ts`
4. Run type check: `cd shared && npm run type-check`
5. Update imports in frontend and backend
6. Test in both environments

### Adding Shared Constants
1. Determine correct file in `/shared/constants/`:
   - API endpoints → `api.constants.ts`
   - Business rules → `business.constants.ts`
   - Time/scheduling → `time.constants.ts`
2. Add the constant with proper typing (use `as const`)
3. Export from `/shared/constants/index.ts`
4. Replace hardcoded values in frontend and backend
5. Test that constants work in both environments

### Migrating Existing Types to Shared
1. Identify duplicated types between frontend and backend
2. Move type definition to appropriate shared file
3. Update imports in both frontend and backend:
   ```typescript
   // Replace this:
   import { SomeType } from '../types/local-types';
   
   // With this:
   import { SomeType } from '@beautyconnect/shared/types';
   ```
4. Remove old type definitions
5. Run type check on all workspaces: `npm run type-check`
6. Test both applications work correctly

### Shared Module Debugging
```bash
# Check shared types are valid
cd shared && npm run type-check

# Verify frontend can import shared
docker compose exec frontend node -e "console.log(require('@beautyconnect/shared/types'))"

# Verify backend can import shared  
docker compose exec backend node -e "console.log(require('@beautyconnect/shared/types'))"

# Rebuild with shared changes
docker compose build --no-cache frontend backend

# Check workspace dependencies
npm list --workspaces
```

## Monitoring & Debugging

- Check Sentry for error tracking
- Use Redis CLI for cache inspection
- PostgreSQL slow query log for performance
- Chrome DevTools for frontend profiling
- WebSocket debugging via browser console