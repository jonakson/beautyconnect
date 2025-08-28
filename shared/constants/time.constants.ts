/**
 * Time Slots, Durations, and Timezone Constants
 * Centralized time-related constants for consistent scheduling
 */

export const TIME_SLOTS = {
  DURATIONS: [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 75, label: '1 hour 15 minutes' },
    { value: 90, label: '1 hour 30 minutes' },
    { value: 105, label: '1 hour 45 minutes' },
    { value: 120, label: '2 hours' },
    { value: 150, label: '2 hours 30 minutes' },
    { value: 180, label: '3 hours' },
    { value: 240, label: '4 hours' },
    { value: 300, label: '5 hours' },
    { value: 360, label: '6 hours' },
    { value: 420, label: '7 hours' },
    { value: 480, label: '8 hours' },
  ],
  DEFAULT_DURATION: 30,
  MIN_DURATION: 15,
  MAX_DURATION: 480,
  SLOT_INCREMENT: 15, // minutes between available time slots
} as const;

export const BUSINESS_HOURS_PRESETS = {
  EARLY_MORNING: { start: '06:00', end: '14:00' },
  STANDARD: { start: '09:00', end: '17:00' },
  EXTENDED: { start: '08:00', end: '20:00' },
  EVENING: { start: '12:00', end: '22:00' },
  SALON_HOURS: { start: '09:00', end: '19:00' },
  SPA_HOURS: { start: '10:00', end: '18:00' },
  FITNESS_HOURS: { start: '06:00', end: '22:00' },
} as const;

export const DAYS_OF_WEEK = [
  { value: 0, short: 'Sun', long: 'Sunday' },
  { value: 1, short: 'Mon', long: 'Monday' },
  { value: 2, short: 'Tue', long: 'Tuesday' },
  { value: 3, short: 'Wed', long: 'Wednesday' },
  { value: 4, short: 'Thu', long: 'Thursday' },
  { value: 5, short: 'Fri', long: 'Friday' },
  { value: 6, short: 'Sat', long: 'Saturday' },
] as const;

export const WORKING_DAYS = [1, 2, 3, 4, 5] as const; // Monday to Friday
export const WEEKEND_DAYS = [0, 6] as const; // Sunday and Saturday

export const TIMEZONES = {
  SPAIN: {
    zone: 'Europe/Madrid',
    name: 'Central European Time',
    abbreviation: 'CET',
    utcOffset: '+01:00',
    dstOffset: '+02:00',
  },
  IRELAND: {
    zone: 'Europe/Dublin',
    name: 'Irish Standard Time',
    abbreviation: 'IST',
    utcOffset: '+00:00',
    dstOffset: '+01:00',
  },
  UK: {
    zone: 'Europe/London',
    name: 'Greenwich Mean Time',
    abbreviation: 'GMT',
    utcOffset: '+00:00',
    dstOffset: '+01:00',
  },
  UTC: {
    zone: 'UTC',
    name: 'Coordinated Universal Time',
    abbreviation: 'UTC',
    utcOffset: '+00:00',
    dstOffset: '+00:00',
  },
} as const;

export const DEFAULT_TIMEZONE = TIMEZONES.SPAIN.zone;

export const BUFFER_TIME_OPTIONS = [
  { value: 0, label: 'No buffer' },
  { value: 5, label: '5 minutes' },
  { value: 10, label: '10 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 20, label: '20 minutes' },
  { value: 30, label: '30 minutes' },
] as const;

export const ADVANCE_BOOKING_OPTIONS = [
  { value: 1, label: '1 day ahead' },
  { value: 3, label: '3 days ahead' },
  { value: 7, label: '1 week ahead' },
  { value: 14, label: '2 weeks ahead' },
  { value: 30, label: '1 month ahead' },
  { value: 60, label: '2 months ahead' },
  { value: 90, label: '3 months ahead' },
  { value: 180, label: '6 months ahead' },
  { value: 365, label: '1 year ahead' },
] as const;

export const MIN_ADVANCE_BOOKING_OPTIONS = [
  { value: 0, label: 'No minimum' },
  { value: 1, label: '1 hour ahead' },
  { value: 2, label: '2 hours ahead' },
  { value: 4, label: '4 hours ahead' },
  { value: 8, label: '8 hours ahead' },
  { value: 12, label: '12 hours ahead' },
  { value: 24, label: '1 day ahead' },
  { value: 48, label: '2 days ahead' },
] as const;

export const CANCELLATION_WINDOW_OPTIONS = [
  { value: 1, label: '1 hour before' },
  { value: 2, label: '2 hours before' },
  { value: 4, label: '4 hours before' },
  { value: 8, label: '8 hours before' },
  { value: 12, label: '12 hours before' },
  { value: 24, label: '1 day before' },
  { value: 48, label: '2 days before' },
  { value: 72, label: '3 days before' },
  { value: 168, label: '1 week before' },
] as const;

export const REMINDER_TIME_OPTIONS = [
  { value: 15, label: '15 minutes before', type: 'minutes' },
  { value: 30, label: '30 minutes before', type: 'minutes' },
  { value: 1, label: '1 hour before', type: 'hours' },
  { value: 2, label: '2 hours before', type: 'hours' },
  { value: 4, label: '4 hours before', type: 'hours' },
  { value: 24, label: '1 day before', type: 'hours' },
  { value: 48, label: '2 days before', type: 'hours' },
  { value: 72, label: '3 days before', type: 'hours' },
  { value: 168, label: '1 week before', type: 'hours' },
] as const;

export const TIME_FORMATS = {
  TIME_24H: 'HH:mm',
  TIME_12H: 'h:mm A',
  DATETIME_SHORT: 'MMM dd, HH:mm',
  DATETIME_LONG: 'MMMM dd, yyyy HH:mm',
  DATE_SHORT: 'MMM dd',
  DATE_LONG: 'MMMM dd, yyyy',
  DATE_ISO: 'yyyy-MM-dd',
  DATETIME_ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
} as const;

export const CALENDAR_VIEWS = {
  DAY: 'timeGridDay',
  WEEK: 'timeGridWeek',
  MONTH: 'dayGridMonth',
  LIST: 'listWeek',
} as const;

export const RECURRENCE_PATTERNS = {
  DAILY: {
    value: 'daily',
    label: 'Daily',
    intervals: [1, 2, 3, 4, 5, 6, 7],
  },
  WEEKLY: {
    value: 'weekly',
    label: 'Weekly',
    intervals: [1, 2, 3, 4],
  },
  MONTHLY: {
    value: 'monthly',
    label: 'Monthly',
    intervals: [1, 2, 3, 6],
  },
  YEARLY: {
    value: 'yearly',
    label: 'Yearly',
    intervals: [1],
  },
} as const;

// Utility time values
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;
export const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR;
export const DAYS_IN_WEEK = 7;
export const MILLISECONDS_IN_SECOND = 1000;
export const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * 60;
export const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;
export const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;

// Common time periods in milliseconds
export const TIME_PERIODS = {
  SECOND: MILLISECONDS_IN_SECOND,
  MINUTE: MILLISECONDS_IN_MINUTE,
  HOUR: MILLISECONDS_IN_HOUR,
  DAY: MILLISECONDS_IN_DAY,
  WEEK: MILLISECONDS_IN_DAY * 7,
  MONTH: MILLISECONDS_IN_DAY * 30, // approximate
  YEAR: MILLISECONDS_IN_DAY * 365, // approximate
} as const;

// Business hours templates for different industries
export const INDUSTRY_HOURS = {
  HAIR_SALON: {
    monday: { start: '09:00', end: '18:00' },
    tuesday: { start: '09:00', end: '18:00' },
    wednesday: { start: '09:00', end: '18:00' },
    thursday: { start: '09:00', end: '20:00' },
    friday: { start: '09:00', end: '20:00' },
    saturday: { start: '08:00', end: '17:00' },
    sunday: { closed: true },
  },
  NAIL_SALON: {
    monday: { start: '09:30', end: '19:00' },
    tuesday: { start: '09:30', end: '19:00' },
    wednesday: { start: '09:30', end: '19:00' },
    thursday: { start: '09:30', end: '20:00' },
    friday: { start: '09:30', end: '20:00' },
    saturday: { start: '09:00', end: '18:00' },
    sunday: { start: '11:00', end: '17:00' },
  },
  SPA: {
    monday: { start: '10:00', end: '18:00' },
    tuesday: { start: '10:00', end: '18:00' },
    wednesday: { start: '10:00', end: '18:00' },
    thursday: { start: '10:00', end: '18:00' },
    friday: { start: '10:00', end: '19:00' },
    saturday: { start: '09:00', end: '18:00' },
    sunday: { start: '10:00', end: '17:00' },
  },
  FITNESS: {
    monday: { start: '06:00', end: '22:00' },
    tuesday: { start: '06:00', end: '22:00' },
    wednesday: { start: '06:00', end: '22:00' },
    thursday: { start: '06:00', end: '22:00' },
    friday: { start: '06:00', end: '22:00' },
    saturday: { start: '08:00', end: '20:00' },
    sunday: { start: '08:00', end: '20:00' },
  },
} as const;