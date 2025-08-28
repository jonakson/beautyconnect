/**
 * Business Rules and Pricing Constants
 * Core business logic values used across the application
 */

export const PRICING_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    maxStaff: 1,
    maxServices: 5,
    maxBookingsPerMonth: 50,
    features: [
      'Basic booking page',
      'Email notifications',
      'Basic calendar',
      'Customer management',
    ],
    limitations: [
      'BeautyConnect branding',
      'Email support only',
      'Basic analytics',
    ],
  },
  PROFESSIONAL: {
    name: 'Professional',
    price: 5.99, // EUR per staff member per month
    maxStaff: 10,
    maxServices: 50,
    maxBookingsPerMonth: 1000,
    features: [
      'Custom booking page',
      'Email & SMS notifications',
      'Advanced calendar',
      'Staff management',
      'Customer database',
      'Reviews & ratings',
      'Basic analytics',
      'Custom branding',
    ],
    limitations: [
      'Email support',
      'Basic integrations',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 19.99, // EUR per staff member per month
    maxStaff: 100,
    maxServices: 200,
    maxBookingsPerMonth: 10000,
    features: [
      'Everything in Professional',
      'Advanced analytics',
      'Multi-location support',
      'API access',
      'Priority support',
      'Custom integrations',
      'Advanced automation',
      'White-label solution',
    ],
    limitations: [],
  },
} as const;

export const BOOKING_RULES = {
  MIN_ADVANCE_BOOKING_HOURS: 2,
  MAX_ADVANCE_BOOKING_DAYS: 90,
  DEFAULT_SLOT_DURATION: 30, // minutes
  BUFFER_TIME_MINUTES: 15,
  MAX_APPOINTMENTS_PER_DAY: 20,
  MAX_CONSECUTIVE_APPOINTMENTS: 8,
  MIN_BREAK_BETWEEN_APPOINTMENTS: 0, // minutes
  CANCELLATION_WINDOW_HOURS: 24,
  RESCHEDULE_WINDOW_HOURS: 2,
  MAX_NO_SHOWS_BEFORE_BLOCK: 3,
  BLOCK_DURATION_DAYS: 30,
} as const;

export const SERVICE_RULES = {
  MIN_DURATION_MINUTES: 15,
  MAX_DURATION_MINUTES: 480, // 8 hours
  MIN_PRICE: 0.01,
  MAX_PRICE: 9999.99,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  SUPPORTED_CURRENCIES: ['EUR', 'GBP'] as const,
} as const;

export const BUSINESS_HOURS = {
  DEFAULT_START: '09:00',
  DEFAULT_END: '17:00',
  DEFAULT_TIMEZONE: 'Europe/Madrid',
  MAX_HOURS_PER_DAY: 16,
  MIN_HOURS_PER_DAY: 1,
  BREAK_MIN_DURATION: 15, // minutes
  BREAK_MAX_DURATION: 120, // minutes
} as const;

export const STAFF_RULES = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MAX_BIO_LENGTH: 500,
  MAX_SPECIALTIES: 10,
  SPECIALTY_MAX_LENGTH: 50,
  MIN_WORKING_HOURS_PER_WEEK: 4,
  MAX_WORKING_HOURS_PER_WEEK: 60,
  COMMISSION_MIN_PERCENTAGE: 0,
  COMMISSION_MAX_PERCENTAGE: 100,
  COMMISSION_MIN_FIXED: 0,
  COMMISSION_MAX_FIXED: 1000,
} as const;

export const CUSTOMER_RULES = {
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 50,
  MAX_NOTES_LENGTH: 1000,
  MAX_TAGS: 10,
  TAG_MAX_LENGTH: 30,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/, // E.164 format
} as const;

export const REVIEW_RULES = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  MAX_COMMENT_LENGTH: 500,
  MAX_RESPONSE_LENGTH: 500,
  REVIEW_WINDOW_DAYS: 30, // can review up to 30 days after appointment
  EDIT_WINDOW_HOURS: 24, // can edit review for 24 hours
} as const;

export const NOTIFICATION_RULES = {
  REMINDER_HOURS_OPTIONS: [1, 2, 4, 24, 48, 72],
  DEFAULT_REMINDER_HOURS: [24, 2],
  MAX_REMINDERS: 3,
  SMS_CHARACTER_LIMIT: 160,
  EMAIL_SUBJECT_MAX_LENGTH: 78,
  BATCH_SIZE: 100, // notifications per batch
} as const;

export const FILE_UPLOAD_RULES = {
  MAX_FILE_SIZE_MB: 5,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  MAX_IMAGES_PER_BUSINESS: 10,
  IMAGE_DIMENSIONS: {
    AVATAR_SIZE: 200, // 200x200px
    LOGO_MAX_WIDTH: 400,
    LOGO_MAX_HEIGHT: 200,
    GALLERY_MAX_WIDTH: 800,
    GALLERY_MAX_HEIGHT: 600,
  },
} as const;

export const RATE_LIMITS = {
  API_REQUESTS_PER_MINUTE: 100,
  LOGIN_ATTEMPTS_PER_HOUR: 5,
  PASSWORD_RESET_PER_HOUR: 3,
  EMAIL_VERIFICATION_PER_HOUR: 3,
  BOOKING_ATTEMPTS_PER_HOUR: 10,
  REVIEW_SUBMISSIONS_PER_DAY: 3,
} as const;

export const ANALYTICS_RULES = {
  MIN_DATE_RANGE_DAYS: 1,
  MAX_DATE_RANGE_DAYS: 365,
  DEFAULT_DATE_RANGE_DAYS: 30,
  DATA_RETENTION_DAYS: 1095, // 3 years
  EXPORT_MAX_ROWS: 10000,
  CHART_MAX_DATA_POINTS: 366,
} as const;

export const SUBSCRIPTION_RULES = {
  TRIAL_DURATION_DAYS: 14,
  GRACE_PERIOD_DAYS: 7,
  PAYMENT_RETRY_ATTEMPTS: 3,
  DOWNGRADE_BUFFER_DAYS: 30,
  CANCELLATION_SURVEY_OPTIONS: [
    'Too expensive',
    'Missing features',
    'Hard to use',
    'Found alternative',
    'Business closed',
    'Other',
  ],
} as const;

export const CURRENCIES = {
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    decimalPlaces: 2,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    decimalPlaces: 2,
  },
} as const;

export const COUNTRIES = {
  ES: {
    code: 'ES',
    name: 'Spain',
    currency: 'EUR',
    timezone: 'Europe/Madrid',
    phoneCode: '+34',
    language: 'es',
  },
  IE: {
    code: 'IE',
    name: 'Ireland',
    currency: 'EUR',
    timezone: 'Europe/Dublin',
    phoneCode: '+353',
    language: 'en',
  },
  UK: {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    timezone: 'Europe/London',
    phoneCode: '+44',
    language: 'en',
  },
} as const;

export const SERVICE_CATEGORIES = [
  { id: 'haircut', name: 'Haircut & Styling', icon: '✂️' },
  { id: 'coloring', name: 'Hair Coloring', icon: '🎨' },
  { id: 'nails', name: 'Nail Care', icon: '💅' },
  { id: 'facial', name: 'Facial Treatments', icon: '✨' },
  { id: 'massage', name: 'Massage Therapy', icon: '💆' },
  { id: 'waxing', name: 'Waxing & Hair Removal', icon: '🪒' },
  { id: 'eyebrows', name: 'Eyebrow Services', icon: '👀' },
  { id: 'eyelashes', name: 'Eyelash Extensions', icon: '👁️' },
  { id: 'makeup', name: 'Makeup Services', icon: '💄' },
  { id: 'fitness', name: 'Fitness Training', icon: '💪' },
  { id: 'wellness', name: 'Wellness & Spa', icon: '🧘' },
  { id: 'other', name: 'Other Services', icon: '🌟' },
] as const;