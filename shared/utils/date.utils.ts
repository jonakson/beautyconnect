/**
 * Date/Time Helper Functions
 * Shared date utilities used by both frontend and backend
 */

import { TIMEZONES, TIME_FORMATS, DAYS_OF_WEEK } from '../constants/time.constants';

/**
 * Format a date to a specific format string
 */
export function formatDate(date: Date | string, format: string = TIME_FORMATS.DATE_ISO): string {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  // Simple format replacements - in a real app you'd use date-fns or similar
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  
  return format
    .replace('yyyy', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('dd', day.toString().padStart(2, '0'))
    .replace('HH', hours.toString().padStart(2, '0'))
    .replace('mm', minutes.toString().padStart(2, '0'))
    .replace('ss', seconds.toString().padStart(2, '0'));
}

/**
 * Format time to HH:MM format
 */
export function formatTime(date: Date | string): string {
  const d = new Date(date);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

/**
 * Parse time string (HH:MM) to minutes since midnight
 */
export function timeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Convert minutes since midnight to time string (HH:MM)
 */
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string): boolean {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date | string): boolean {
  return new Date(date) < new Date();
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date | string): boolean {
  return new Date(date) > new Date();
}

/**
 * Get the start of day for a date
 */
export function startOfDay(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get the end of day for a date
 */
export function endOfDay(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Add days to a date
 */
export function addDays(date: Date | string, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Add hours to a date
 */
export function addHours(date: Date | string, hours: number): Date {
  const d = new Date(date);
  d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
  return d;
}

/**
 * Add minutes to a date
 */
export function addMinutes(date: Date | string, minutes: number): Date {
  const d = new Date(date);
  d.setTime(d.getTime() + (minutes * 60 * 1000));
  return d;
}

/**
 * Get difference between two dates in minutes
 */
export function differenceInMinutes(laterDate: Date | string, earlierDate: Date | string): number {
  const later = new Date(laterDate);
  const earlier = new Date(earlierDate);
  return Math.floor((later.getTime() - earlier.getTime()) / (1000 * 60));
}

/**
 * Get difference between two dates in hours
 */
export function differenceInHours(laterDate: Date | string, earlierDate: Date | string): number {
  return Math.floor(differenceInMinutes(laterDate, earlierDate) / 60);
}

/**
 * Get difference between two dates in days
 */
export function differenceInDays(laterDate: Date | string, earlierDate: Date | string): number {
  return Math.floor(differenceInHours(laterDate, earlierDate) / 24);
}

/**
 * Check if two time ranges overlap
 */
export function timeRangesOverlap(
  start1: Date | string,
  end1: Date | string,
  start2: Date | string,
  end2: Date | string
): boolean {
  const s1 = new Date(start1);
  const e1 = new Date(end1);
  const s2 = new Date(start2);
  const e2 = new Date(end2);
  
  return s1 < e2 && s2 < e1;
}

/**
 * Get the day of week name
 */
export function getDayOfWeekName(date: Date | string, short: boolean = false): string {
  const d = new Date(date);
  const dayIndex = d.getDay();
  const day = DAYS_OF_WEEK.find(day => day.value === dayIndex);
  return short ? day?.short || '' : day?.long || '';
}

/**
 * Check if a date falls on a weekend
 */
export function isWeekend(date: Date | string): boolean {
  const d = new Date(date);
  const day = d.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

/**
 * Get the next occurrence of a specific day of week
 */
export function getNextDayOfWeek(dayOfWeek: number, fromDate: Date = new Date()): Date {
  const date = new Date(fromDate);
  const days = (dayOfWeek + 7 - date.getDay()) % 7;
  date.setDate(date.getDate() + (days === 0 ? 7 : days));
  return date;
}

/**
 * Generate time slots for a given day
 */
export function generateTimeSlots(
  startTime: string,
  endTime: string,
  slotDuration: number = 30,
  slotIncrement: number = 15
): string[] {
  const slots: string[] = [];
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime) - slotDuration;
  
  for (let minutes = startMinutes; minutes <= endMinutes; minutes += slotIncrement) {
    slots.push(minutesToTime(minutes));
  }
  
  return slots;
}

/**
 * Check if a time is within business hours for a specific day
 */
export function isWithinBusinessHours(
  time: string,
  dayOfWeek: number,
  businessHours: Array<{ dayOfWeek: number; isOpen: boolean; openTime?: string; closeTime?: string }>
): boolean {
  const dayHours = businessHours.find(h => h.dayOfWeek === dayOfWeek);
  
  if (!dayHours || !dayHours.isOpen || !dayHours.openTime || !dayHours.closeTime) {
    return false;
  }
  
  const timeMinutes = timeToMinutes(time);
  const openMinutes = timeToMinutes(dayHours.openTime);
  const closeMinutes = timeToMinutes(dayHours.closeTime);
  
  return timeMinutes >= openMinutes && timeMinutes <= closeMinutes;
}

/**
 * Create a date from date string and time string
 */
export function combineDateAndTime(dateStr: string, timeStr: string): Date {
  const date = new Date(dateStr);
  const [hours, minutes] = timeStr.split(':').map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diffMinutes = Math.abs(differenceInMinutes(d, now));
  const isPastDate = d < now;
  
  if (diffMinutes < 1) {
    return 'now';
  } else if (diffMinutes < 60) {
    const suffix = isPastDate ? 'ago' : 'in';
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ${isPastDate ? suffix : `${suffix}`}`;
  } else if (diffMinutes < 1440) { // less than 24 hours
    const hours = Math.floor(diffMinutes / 60);
    const suffix = isPastDate ? 'ago' : 'in';
    return `${hours} hour${hours !== 1 ? 's' : ''} ${isPastDate ? suffix : `${suffix}`}`;
  } else {
    const days = Math.floor(diffMinutes / 1440);
    const suffix = isPastDate ? 'ago' : 'in';
    return `${days} day${days !== 1 ? 's' : ''} ${isPastDate ? suffix : `${suffix}`}`;
  }
}

/**
 * Validate that a date string is in ISO format (YYYY-MM-DD)
 */
export function isValidDateString(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }
  
  const date = new Date(dateString);
  const [year, month, day] = dateString.split('-').map(Number);
  
  return date.getFullYear() === year &&
         date.getMonth() === month - 1 &&
         date.getDate() === day;
}

/**
 * Validate that a time string is in HH:MM format
 */
export function isValidTimeString(timeString: string): boolean {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(timeString);
}