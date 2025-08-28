# Product Requirements Document
## SaaS Booking & Business Management Platform

**Version**: 1.0 MVP  
**Date**: January 2025  
**Timeline**: 6-week Sprint  
**Budget**: $1,000 USD (6 months)  
**Markets**: Spain & Ireland  

---

## 1. Executive Summary

Building a competitive SaaS booking platform targeting beauty, wellness, and fitness businesses in Spain and Ireland. The MVP delivers core booking functionality with aggressive pricing (€5.99/staff member vs competitors' €20-50) to capture market share quickly. Solo development leveraging Claude Code for 3-4x velocity enables rapid market entry with a fully functional marketplace in 6 weeks.

---

## 2. Product Overview

### Vision Statement
Democratize professional booking and business management software for small-to-medium service businesses in Spain and Ireland by offering enterprise-grade features at fraction of competitor pricing, removing the barrier between free tools and expensive platforms.

### Differentiation Strategy
- **Price Leadership**: 70-80% cheaper than established competitors
- **No Lock-in**: Month-to-month billing, easy data export
- **Marketplace-First**: Public discovery from day one
- **Localization**: Native Spanish/English support, EUR/GBP currencies
- **Simplicity**: Focused feature set without bloat

---

## 3. User Stories & Personas

### 3.1 Business Owner - Maria (Salon Owner, Madrid)
**Goals**: Reduce no-shows, manage staff schedules, grow customer base

**User Journey**:
1. Signs up for free tier (1 staff member)
2. Configures business profile, services, and pricing
3. Sets operating hours and staff availability
4. Shares booking link on social media
5. Receives first online booking notification
6. Views analytics after first week
7. Upgrades to Professional tier to add second staff member

**Key Actions**:
- As a business owner, I want to create my business profile in under 5 minutes
- As a business owner, I want to see all appointments in a single calendar view
- As a business owner, I want to track booking conversion rates

### 3.2 Staff Member - John (Barber, Dublin)
**Goals**: Manage personal schedule, reduce scheduling conflicts

**User Journey**:
1. Receives invitation from business owner
2. Sets personal availability and break times
3. Views daily appointment schedule on mobile
4. Marks appointments as completed
5. Reviews customer feedback

**Key Actions**:
- As a staff member, I want to control my own availability
- As a staff member, I want to see my daily schedule at a glance
- As a staff member, I want to receive booking notifications

### 3.3 Customer - Sofia (Office Worker, Barcelona)
**Goals**: Book appointments quickly, discover new services

**User Journey**:
1. Searches marketplace for "nail salon near me"
2. Filters by availability this weekend
3. Views salon profiles and reviews
4. Selects service and preferred staff member
5. Books appointment without creating account
6. Receives email confirmation
7. Leaves review after appointment

**Key Actions**:
- As a customer, I want to book without creating an account
- As a customer, I want to see real-time availability
- As a customer, I want to filter by location and service type

---

## 4. Functional Requirements

### 4.1 Online Booking System (Week 1-2)

**Core Features**:
- Public booking page per business
- Service selection with duration/price display
- Staff selection (optional)
- Real-time availability grid
- Guest checkout (no account required)
- Email/SMS confirmation

**Acceptance Criteria**:
- ✓ Booking completes in <3 clicks from landing
- ✓ Availability updates instantly across all sessions
- ✓ Supports 30-min and 1-hour time slots
- ✓ Handles timezone differences correctly
- ✓ Prevents double-booking with optimistic locking

**Database Considerations**:
```sql
-- Core tables
businesses (id, name, slug, timezone, currency)
services (id, business_id, name, duration_minutes, price)
appointments (id, service_id, staff_id, customer_id, start_time, status)
availability_rules (id, staff_id, day_of_week, start_time, end_time)
```

### 4.2 Calendar/Schedule Management (Week 2)

**Core Features**:
- Day/Week/Month views
- Drag-and-drop rescheduling
- Recurring appointments
- Buffer time configuration
- Break time management
- Multi-staff view

**Acceptance Criteria**:
- ✓ Calendar loads in <500ms
- ✓ Supports 100+ appointments per day without lag
- ✓ Mobile swipe navigation between days
- ✓ Color-coding by service type
- ✓ Quick appointment creation from calendar

### 4.3 Staff Management (Week 3)

**Core Features**:
- Staff invitation system
- Role-based permissions (Owner, Manager, Staff)
- Individual calendars
- Commission tracking (display only)
- Performance metrics

**Acceptance Criteria**:
- ✓ Staff onboarding in <2 minutes
- ✓ Individual availability settings
- ✓ Staff can only see own appointments (privacy)
- ✓ Owners see aggregate analytics

### 4.4 Marketplace Discovery (Week 3-4)

**Core Features**:
- Location-based search
- Service category filtering
- Availability filtering
- Business profiles with photos
- Service menus
- Instant booking from search

**Acceptance Criteria**:
- ✓ Search returns results in <200ms
- ✓ Geolocation accurate to 1km
- ✓ Filter by multiple criteria simultaneously
- ✓ Supports 10,000+ businesses without pagination issues

### 4.5 Reviews/Ratings System (Week 4)

**Core Features**:
- 5-star rating system
- Text reviews
- Review requests via email
- Response from business
- Review moderation queue

**Acceptance Criteria**:
- ✓ Reviews linked to verified appointments only
- ✓ Cannot review before appointment completion
- ✓ Business response within review thread
- ✓ Automatic profanity filtering

### 4.6 Analytics/Reporting (Week 5)

**Core Features**:
- Booking conversion funnel
- Revenue reports (calculated)
- Popular services/times
- Staff utilization
- Customer retention metrics

**Acceptance Criteria**:
- ✓ Real-time dashboard updates
- ✓ Export to CSV
- ✓ Date range filtering
- ✓ Mobile-responsive charts

### 4.7 Customer Management - CRM Lite (Week 5)

**Core Features**:
- Customer database
- Appointment history
- Contact information
- Notes/tags
- Automated birthday emails

**Acceptance Criteria**:
- ✓ Search customers by name/phone/email
- ✓ View full appointment history
- ✓ GDPR-compliant data handling
- ✓ Bulk export functionality

### 4.8 Inventory Management (Week 6 - Simplified)

**Core Features**:
- Product catalog
- Stock levels
- Low stock alerts
- Usage tracking per service

**Acceptance Criteria**:
- ✓ Manual stock adjustment
- ✓ Link products to services
- ✓ Email alerts for low stock
- ✓ Basic reporting

---

## 5. User Interface Requirements

### 5.1 Key Pages/Screens

**Public Pages**:
- Landing page with marketplace search
- Business profile page
- Booking flow (3 steps max)
- Search results grid

**Business Dashboard**:
- Calendar view (primary)
- Analytics dashboard
- Staff management
- Settings/configuration
- Customer list

**Staff Portal**:
- Personal calendar
- Today's appointments
- Profile settings

### 5.2 Mobile-Responsive Requirements
- Minimum viewport: 320px width
- Touch targets: 44x44px minimum
- Swipe gestures for calendar navigation
- Bottom sheet modals for mobile forms
- Responsive data tables (card view on mobile)

### 5.3 Component Hierarchy (shadcn/ui)
```
App Shell
├── Navigation (Sheet on mobile)
├── Main Content Area
│   ├── Page Header (Breadcrumbs)
│   ├── Action Bar (Buttons, Filters)
│   └── Content (Cards, Tables, Forms)
└── Toasts/Notifications

Key Components:
- Calendar: Custom build on top of date-fns
- DataTable: shadcn/ui Table with TanStack
- Forms: shadcn/ui Form with react-hook-form
- Modals: Dialog/Sheet components
- Charts: Recharts with shadcn/ui Card wrapper
```

---

## 6. API Design

### 6.1 Authentication Flow
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
```

### 6.2 Core Endpoints
```
# Businesses
GET    /api/businesses (marketplace search)
GET    /api/businesses/:slug
POST   /api/businesses (create)
PUT    /api/businesses/:id
DELETE /api/businesses/:id

# Appointments
GET    /api/appointments (filtered)
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
GET    /api/appointments/availability

# Staff
GET    /api/staff
POST   /api/staff/invite
PUT    /api/staff/:id
DELETE /api/staff/:id

# Services
GET    /api/businesses/:id/services
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id
```

### 6.3 Data Models
```typescript
interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: GeoPoint;
  timezone: string;
  currency: 'EUR' | 'GBP';
  subscription: SubscriptionTier;
  settings: BusinessSettings;
}

interface Appointment {
  id: string;
  businessId: string;
  serviceId: string;
  staffId: string;
  customerId?: string;
  startTime: DateTime;
  endTime: DateTime;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

interface Service {
  id: string;
  businessId: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  category: ServiceCategory;
  active: boolean;
}
```

---

## 7. Development Phases - 6-Week Timeline

### Week 1: Foundation & Booking Core
- **Mon-Tue**: Project setup, Docker, database schema
- **Wed-Thu**: Authentication, business registration
- **Fri-Sun**: Public booking flow, availability engine

### Week 2: Calendar & Scheduling
- **Mon-Tue**: Calendar UI components
- **Wed-Thu**: Appointment CRUD, drag-drop
- **Fri-Sun**: Staff availability rules, notifications

### Week 3: Staff & Marketplace
- **Mon-Tue**: Staff invitation and management
- **Wed-Thu**: Marketplace search implementation
- **Fri-Sun**: Business profiles, service menus

### Week 4: Reviews & Polish
- **Mon-Tue**: Review system implementation
- **Wed-Thu**: Email notifications, confirmations
- **Fri-Sun**: Mobile optimization, bug fixes

### Week 5: Analytics & CRM
- **Mon-Tue**: Analytics dashboard
- **Wed-Thu**: Customer management
- **Fri-Sun**: Reports and exports

### Week 6: Inventory & Launch Prep
- **Mon-Tue**: Basic inventory management
- **Wed-Thu**: Stripe integration, billing
- **Fri-Sun**: Production deployment, testing

### Critical Path Items
1. Availability engine (Week 1) - blocks everything
2. Calendar UI (Week 2) - core user experience
3. Marketplace search (Week 3) - customer acquisition
4. Stripe billing (Week 6) - revenue generation

### Defer Post-MVP
- Advanced inventory with automatic deduction
- SMS notifications (use email only)
- Multi-language UI (English first, Spanish content)
- Advanced analytics and forecasting
- Waiting lists and cancellation management
- Package deals and memberships
- Point-of-sale integration

---

## 8. Success Metrics

### Launch KPIs
- **Technical**: 99% uptime, <500ms page load, <2% error rate
- **Adoption**: 50 businesses registered (Week 1)
- **Engagement**: 500 bookings (Month 1)
- **Revenue**: 10 paying businesses (Month 1)
- **Retention**: 80% Month-2 retention

### User Acquisition Targets
- **Week 1**: 50 businesses (friends, family, direct outreach)
- **Month 1**: 200 businesses (local Facebook groups, forums)
- **Month 3**: 1,000 businesses (paid ads, referrals)
- **Month 6**: 5,000 businesses (organic growth, SEO)

---

## 9. Risk Assessment

### Technical Risks

**Risk**: Availability calculation performance
- **Impact**: High - core functionality
- **Mitigation**: Pre-calculate availability slots, use Redis caching
- **Contingency**: Limit to 30-day advance booking initially

**Risk**: Real-time updates across sessions
- **Impact**: Medium - user experience
- **Mitigation**: Implement WebSockets for critical updates
- **Contingency**: Polling with 5-second intervals

**Risk**: Database scaling
- **Impact**: Low initially - growth concern
- **Mitigation**: Proper indexing, connection pooling
- **Contingency**: Read replicas can be added later

### Market Risks

**Risk**: Competition from established players
- **Impact**: High - market share
- **Mitigation**: Aggressive pricing, local market focus
- **Contingency**: Niche down to specific verticals

**Risk**: Low trust as new platform
- **Impact**: Medium - adoption
- **Mitigation**: Free tier, no credit card required
- **Contingency**: Partner with local business associations

### Solo Developer Constraints

**Risk**: Development velocity
- **Impact**: High - timeline
- **Mitigation**: Claude Code for 3-4x acceleration
- **Contingency**: Reduce scope, launch with 5 features

**Risk**: DevOps and maintenance
- **Impact**: Medium - availability
- **Mitigation**: Automated CI/CD, monitoring alerts
- **Contingency**: Maintenance windows, status page

**Risk**: Customer support burden
- **Impact**: Medium - growth
- **Mitigation**: Comprehensive docs, FAQ, video tutorials
- **Contingency**: Limit onboarding to 10 businesses/day

---

## 10. Post-MVP Roadmap Preview

### Month 2-3: Growth Features
- **AI Booking Assistant**: Natural language booking via WhatsApp/Instagram
- **Payment Processing**: Stripe Connect for appointment payments
- **Mobile Apps**: React Native apps for iOS/Android
- **Advanced Analytics**: Predictive analytics, demand forecasting

### Month 4-6: Market Expansion
- **Additional Markets**: UK, Portugal, France
- **Vertical Features**: Fitness class bookings, medical appointments
- **Enterprise Features**: Multi-location management, franchises
- **Integrations**: Google Calendar, Facebook, Instagram

### Revenue Add-ons (Post-MVP)
- SMS notifications: €0.05 per message
- Email marketing: €9.99/month
- Online payments: 1% transaction fee
- Custom domain: €4.99/month
- Advanced analytics: €9.99/month
- Priority support: €19.99/month

---

## Implementation Notes

### Claude Code Acceleration Strategy
1. **Component Generation**: Use Claude to generate all shadcn/ui forms
2. **API Scaffolding**: Generate Express routes and controllers
3. **Database Queries**: Complex Sequelize queries with Claude
4. **Test Generation**: Comprehensive test suites via Claude
5. **Documentation**: Auto-generate API docs and user guides

### Cost Optimization ($1000/6 months)
- **VPS**: €20/month (Hetzner 4GB RAM)
- **Domain**: €12/year
- **Email**: €5/month (Resend/Postmark)
- **Monitoring**: Free tier (Sentry, Uptime Robot)
- **CDN**: Cloudflare free tier
- **SSL**: Let's Encrypt free
- **Total**: ~€150 for 6 months, €850 buffer

### Database Schema Optimization
- Use UUID primary keys for distributed future
- Implement soft deletes for audit trail
- Add indexes on all foreign keys and search fields
- Partition appointments table by month after 10k records
- Use JSONB for flexible business settings

### Security Considerations
- Rate limiting on all endpoints (100 req/min)
- JWT with 15-minute access tokens
- Refresh tokens with rotation
- GDPR compliance: data export, right to deletion
- PCI compliance not needed (no card storage)

---

## Conclusion

This PRD provides a realistic path to launching a competitive SaaS booking platform in 6 weeks. By focusing on core features, leveraging Claude Code for development acceleration, and targeting specific markets with aggressive pricing, the platform can achieve sustainable growth while maintaining low operational costs. The phased approach ensures critical features ship first while maintaining flexibility for post-launch iterations based on user feedback.