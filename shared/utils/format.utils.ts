/**
 * Formatting Utilities
 * Currency, phone, and other formatting functions
 */

import { CURRENCIES, COUNTRIES } from '../constants/business.constants';

/**
 * Format currency amount
 */
export function formatCurrency(
  amount: number,
  currency: 'EUR' | 'GBP' = 'EUR',
  locale?: string
): string {
  const currencyInfo = CURRENCIES[currency];
  
  // Use browser's Intl.NumberFormat if available
  if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
    const localeCode = locale || (currency === 'EUR' ? 'es-ES' : 'en-GB');
    return new Intl.NumberFormat(localeCode, {
      style: 'currency',
      currency: currencyInfo.code,
    }).format(amount);
  }
  
  // Fallback formatting
  const formatted = amount.toFixed(currencyInfo.decimalPlaces);
  return `${currencyInfo.symbol}${formatted}`;
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phoneNumber: string, countryCode?: string): string {
  // Remove all non-digit characters except +
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  if (!cleaned) {
    return '';
  }
  
  // If number starts with +, keep it as is for international format
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  
  // Try to format based on country
  if (countryCode === 'ES') {
    // Spanish phone number formatting
    if (cleaned.length === 9) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    return `+34 ${cleaned}`;
  } else if (countryCode === 'IE' || countryCode === 'GB') {
    // Irish/UK phone number formatting
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    const code = countryCode === 'IE' ? '+353' : '+44';
    return `${code} ${cleaned}`;
  }
  
  // Default formatting
  return cleaned;
}

/**
 * Format duration in minutes to human-readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return hours === 1 ? '1hr' : `${hours}hrs`;
  }
  
  const hrText = hours === 1 ? '1hr' : `${hours}hrs`;
  return `${hrText} ${remainingMinutes}min`;
}

/**
 * Format duration in minutes to detailed string
 */
export function formatDurationLong(minutes: number): string {
  if (minutes < 60) {
    return minutes === 1 ? '1 minute' : `${minutes} minutes`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return hours === 1 ? '1 hour' : `${hours} hours`;
  }
  
  const hrText = hours === 1 ? '1 hour' : `${hours} hours`;
  const minText = remainingMinutes === 1 ? '1 minute' : `${remainingMinutes} minutes`;
  return `${hrText} ${minText}`;
}

/**
 * Format file size in bytes to human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format business address for display
 */
export function formatAddress(address: {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}): string {
  const parts = [
    address.street,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter(Boolean);
  
  return parts.join(', ');
}

/**
 * Format address for single line display
 */
export function formatAddressOneLine(address: {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}): string {
  const parts = [address.street, address.city];
  return parts.join(', ');
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format large numbers with abbreviations (1K, 1M, etc.)
 */
export function formatNumberAbbreviation(num: number): string {
  if (num < 1000) {
    return num.toString();
  }
  
  const units = ['', 'K', 'M', 'B', 'T'];
  let unitIndex = 0;
  let value = num;
  
  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex++;
  }
  
  const formatted = value % 1 === 0 ? value.toString() : value.toFixed(1);
  return `${formatted}${units[unitIndex]}`;
}

/**
 * Format rating with stars
 */
export function formatRating(rating: number, maxRating: number = 5): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars);
}

/**
 * Format business hours for display
 */
export function formatBusinessHours(hours: {
  dayOfWeek: number;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}): string {
  if (!hours.isOpen) {
    return 'Closed';
  }
  
  if (!hours.openTime || !hours.closeTime) {
    return 'Hours not set';
  }
  
  return `${hours.openTime} - ${hours.closeTime}`;
}

/**
 * Format appointment status for display
 */
export function formatAppointmentStatus(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Pending';
    case 'confirmed':
      return 'Confirmed';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    case 'no_show':
      return 'No Show';
    default:
      return capitalizeWords(status.replace('_', ' '));
  }
}

/**
 * Format subscription tier for display
 */
export function formatSubscriptionTier(tier: string): string {
  switch (tier.toLowerCase()) {
    case 'free':
      return 'Free';
    case 'professional':
      return 'Professional';
    case 'enterprise':
      return 'Enterprise';
    default:
      return capitalizeWords(tier);
  }
}

/**
 * Clean and format user input
 */
export function cleanInput(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

/**
 * Format initials from first and last name
 */
export function getInitials(firstName: string, lastName?: string): string {
  const first = firstName.charAt(0).toUpperCase();
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last;
}

/**
 * Format full name from first and last name
 */
export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

/**
 * Format URL for display (remove protocol, www, trailing slash)
 */
export function formatDisplayUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}

/**
 * Generate avatar color based on name
 */
export function getAvatarColor(name: string): string {
  const colors = [
    '#F87171', '#FB923C', '#FBBF24', '#A3E635',
    '#34D399', '#22D3EE', '#60A5FA', '#A78BFA',
    '#F472B6', '#FB7185', '#FCA5A5', '#FDE047',
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}