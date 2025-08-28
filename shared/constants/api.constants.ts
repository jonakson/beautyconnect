/**
 * API Endpoints and Status Codes
 * Centralized API constants to prevent typos and maintain consistency
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    CHANGE_PASSWORD: '/api/auth/change-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESEND_VERIFICATION: '/api/auth/resend-verification',
    ME: '/api/auth/me',
  },
  BUSINESSES: {
    LIST: '/api/businesses',
    CREATE: '/api/businesses',
    GET: (id: string) => `/api/businesses/${id}`,
    UPDATE: (id: string) => `/api/businesses/${id}`,
    DELETE: (id: string) => `/api/businesses/${id}`,
    SEARCH: '/api/businesses/search',
    BY_SLUG: (slug: string) => `/api/businesses/slug/${slug}`,
    HOURS: (id: string) => `/api/businesses/${id}/hours`,
    SETTINGS: (id: string) => `/api/businesses/${id}/settings`,
    UPLOAD_LOGO: (id: string) => `/api/businesses/${id}/logo`,
    UPLOAD_IMAGES: (id: string) => `/api/businesses/${id}/images`,
  },
  STAFF: {
    LIST: (businessId: string) => `/api/businesses/${businessId}/staff`,
    CREATE: (businessId: string) => `/api/businesses/${businessId}/staff`,
    GET: (businessId: string, staffId: string) => `/api/businesses/${businessId}/staff/${staffId}`,
    UPDATE: (businessId: string, staffId: string) => `/api/businesses/${businessId}/staff/${staffId}`,
    DELETE: (businessId: string, staffId: string) => `/api/businesses/${businessId}/staff/${staffId}`,
    INVITE: (businessId: string) => `/api/businesses/${businessId}/staff/invite`,
    AVAILABILITY: (businessId: string, staffId: string) => `/api/businesses/${businessId}/staff/${staffId}/availability`,
    SCHEDULE: (businessId: string, staffId: string) => `/api/businesses/${businessId}/staff/${staffId}/schedule`,
  },
  SERVICES: {
    LIST: (businessId: string) => `/api/businesses/${businessId}/services`,
    CREATE: (businessId: string) => `/api/businesses/${businessId}/services`,
    GET: (businessId: string, serviceId: string) => `/api/businesses/${businessId}/services/${serviceId}`,
    UPDATE: (businessId: string, serviceId: string) => `/api/businesses/${businessId}/services/${serviceId}`,
    DELETE: (businessId: string, serviceId: string) => `/api/businesses/${businessId}/services/${serviceId}`,
    BULK_UPDATE: (businessId: string) => `/api/businesses/${businessId}/services/bulk`,
    REORDER: (businessId: string) => `/api/businesses/${businessId}/services/reorder`,
  },
  APPOINTMENTS: {
    LIST: '/api/appointments',
    CREATE: '/api/appointments',
    GET: (id: string) => `/api/appointments/${id}`,
    UPDATE: (id: string) => `/api/appointments/${id}`,
    DELETE: (id: string) => `/api/appointments/${id}`,
    CANCEL: (id: string) => `/api/appointments/${id}/cancel`,
    RESCHEDULE: (id: string) => `/api/appointments/${id}/reschedule`,
    CONFIRM: (id: string) => `/api/appointments/${id}/confirm`,
    COMPLETE: (id: string) => `/api/appointments/${id}/complete`,
    NO_SHOW: (id: string) => `/api/appointments/${id}/no-show`,
    AVAILABILITY: '/api/appointments/availability',
    CALENDAR: '/api/appointments/calendar',
    BY_BUSINESS: (businessId: string) => `/api/businesses/${businessId}/appointments`,
    BY_CUSTOMER: (customerId: string) => `/api/customers/${customerId}/appointments`,
    BY_STAFF: (staffId: string) => `/api/staff/${staffId}/appointments`,
  },
  CUSTOMERS: {
    LIST: '/api/customers',
    CREATE: '/api/customers',
    GET: (id: string) => `/api/customers/${id}`,
    UPDATE: (id: string) => `/api/customers/${id}`,
    DELETE: (id: string) => `/api/customers/${id}`,
    SEARCH: '/api/customers/search',
    EXPORT: '/api/customers/export',
    IMPORT: '/api/customers/import',
    MERGE: '/api/customers/merge',
    BY_EMAIL: (email: string) => `/api/customers/email/${encodeURIComponent(email)}`,
  },
  REVIEWS: {
    LIST: '/api/reviews',
    CREATE: '/api/reviews',
    GET: (id: string) => `/api/reviews/${id}`,
    UPDATE: (id: string) => `/api/reviews/${id}`,
    DELETE: (id: string) => `/api/reviews/${id}`,
    RESPOND: (id: string) => `/api/reviews/${id}/respond`,
    REPORT: (id: string) => `/api/reviews/${id}/report`,
    BY_BUSINESS: (businessId: string) => `/api/businesses/${businessId}/reviews`,
    BY_CUSTOMER: (customerId: string) => `/api/customers/${customerId}/reviews`,
  },
  ANALYTICS: {
    DASHBOARD: '/api/analytics/dashboard',
    REVENUE: '/api/analytics/revenue',
    BOOKINGS: '/api/analytics/bookings',
    CUSTOMERS: '/api/analytics/customers',
    STAFF_PERFORMANCE: '/api/analytics/staff-performance',
    SERVICES_PERFORMANCE: '/api/analytics/services-performance',
    EXPORT: '/api/analytics/export',
  },
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    MARK_READ: (id: string) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: '/api/notifications/mark-all-read',
    DELETE: (id: string) => `/api/notifications/${id}`,
    SETTINGS: '/api/notifications/settings',
  },
  WAITING_LIST: {
    LIST: '/api/waiting-list',
    CREATE: '/api/waiting-list',
    GET: (id: string) => `/api/waiting-list/${id}`,
    UPDATE: (id: string) => `/api/waiting-list/${id}`,
    DELETE: (id: string) => `/api/waiting-list/${id}`,
    NOTIFY: (id: string) => `/api/waiting-list/${id}/notify`,
  },
  WEBHOOKS: {
    STRIPE: '/api/webhooks/stripe',
    CALENDAR: '/api/webhooks/calendar',
  },
  HEALTH: '/api/health',
  VERSION: '/api/version',
} as const;

export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  
  // Redirection
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,
  
  // Client Error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  GONE: 410,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  
  // Server Error
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export const API_VERSIONS = {
  V1: 'v1',
  CURRENT: 'v1',
} as const;

export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
  TEXT: 'text/plain',
  HTML: 'text/html',
  PDF: 'application/pdf',
  CSV: 'text/csv',
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
} as const;

export const API_ERRORS = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  BUSINESS_SUSPENDED: 'BUSINESS_SUSPENDED',
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  APPOINTMENT_CONFLICT: 'APPOINTMENT_CONFLICT',
  BOOKING_WINDOW_EXCEEDED: 'BOOKING_WINDOW_EXCEEDED',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  STAFF_UNAVAILABLE: 'STAFF_UNAVAILABLE',
  DUPLICATE_BOOKING: 'DUPLICATE_BOOKING',
  CANCELLATION_WINDOW_EXPIRED: 'CANCELLATION_WINDOW_EXPIRED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  PHONE_ALREADY_EXISTS: 'PHONE_ALREADY_EXISTS',
  SLUG_ALREADY_EXISTS: 'SLUG_ALREADY_EXISTS',
} as const;

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;