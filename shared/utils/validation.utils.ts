/**
 * Shared Validation Functions
 * Common validation utilities used across frontend and backend
 */

import { CUSTOMER_RULES, SERVICE_RULES, STAFF_RULES, REVIEW_RULES } from '../constants/business.constants';

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  return CUSTOMER_RULES.EMAIL_REGEX.test(email);
}

/**
 * Phone number validation (E.164 format)
 */
export function isValidPhone(phone: string): boolean {
  return CUSTOMER_RULES.PHONE_REGEX.test(phone);
}

/**
 * Password strength validation
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (password.length > 128) {
    errors.push('Password must be no more than 128 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Name validation (first name, last name, business name)
 */
export function validateName(name: string, fieldName: string = 'Name'): {
  isValid: boolean;
  error?: string;
} {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  if (trimmedName.length < CUSTOMER_RULES.MIN_NAME_LENGTH) {
    return { isValid: false, error: `${fieldName} must be at least ${CUSTOMER_RULES.MIN_NAME_LENGTH} character${CUSTOMER_RULES.MIN_NAME_LENGTH !== 1 ? 's' : ''} long` };
  }
  
  if (trimmedName.length > CUSTOMER_RULES.MAX_NAME_LENGTH) {
    return { isValid: false, error: `${fieldName} must be no more than ${CUSTOMER_RULES.MAX_NAME_LENGTH} characters long` };
  }
  
  // Check for invalid characters (allow letters, spaces, hyphens, apostrophes)
  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmedName)) {
    return { isValid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }
  
  return { isValid: true };
}

/**
 * Service validation
 */
export function validateService(service: {
  name: string;
  description?: string;
  duration: number;
  price: number;
}): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  
  // Name validation
  const nameValidation = validateName(service.name, 'Service name');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error!;
  }
  
  if (service.name.length > SERVICE_RULES.MAX_NAME_LENGTH) {
    errors.name = `Service name must be no more than ${SERVICE_RULES.MAX_NAME_LENGTH} characters long`;
  }
  
  // Description validation
  if (service.description && service.description.length > SERVICE_RULES.MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be no more than ${SERVICE_RULES.MAX_DESCRIPTION_LENGTH} characters long`;
  }
  
  // Duration validation
  if (service.duration < SERVICE_RULES.MIN_DURATION_MINUTES) {
    errors.duration = `Duration must be at least ${SERVICE_RULES.MIN_DURATION_MINUTES} minutes`;
  }
  
  if (service.duration > SERVICE_RULES.MAX_DURATION_MINUTES) {
    errors.duration = `Duration must be no more than ${SERVICE_RULES.MAX_DURATION_MINUTES} minutes`;
  }
  
  if (service.duration % 15 !== 0) {
    errors.duration = 'Duration must be in 15-minute increments';
  }
  
  // Price validation
  if (service.price < SERVICE_RULES.MIN_PRICE) {
    errors.price = `Price must be at least ${SERVICE_RULES.MIN_PRICE}`;
  }
  
  if (service.price > SERVICE_RULES.MAX_PRICE) {
    errors.price = `Price must be no more than ${SERVICE_RULES.MAX_PRICE}`;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Staff member validation
 */
export function validateStaffMember(staff: {
  displayName?: string;
  bio?: string;
  specialties?: string[];
}): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  
  // Display name validation
  if (staff.displayName) {
    if (staff.displayName.length < STAFF_RULES.MIN_NAME_LENGTH) {
      errors.displayName = `Display name must be at least ${STAFF_RULES.MIN_NAME_LENGTH} characters long`;
    }
    
    if (staff.displayName.length > STAFF_RULES.MAX_NAME_LENGTH) {
      errors.displayName = `Display name must be no more than ${STAFF_RULES.MAX_NAME_LENGTH} characters long`;
    }
  }
  
  // Bio validation
  if (staff.bio && staff.bio.length > STAFF_RULES.MAX_BIO_LENGTH) {
    errors.bio = `Bio must be no more than ${STAFF_RULES.MAX_BIO_LENGTH} characters long`;
  }
  
  // Specialties validation
  if (staff.specialties) {
    if (staff.specialties.length > STAFF_RULES.MAX_SPECIALTIES) {
      errors.specialties = `Cannot have more than ${STAFF_RULES.MAX_SPECIALTIES} specialties`;
    }
    
    for (const specialty of staff.specialties) {
      if (specialty.length > STAFF_RULES.SPECIALTY_MAX_LENGTH) {
        errors.specialties = `Each specialty must be no more than ${STAFF_RULES.SPECIALTY_MAX_LENGTH} characters long`;
        break;
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Customer validation
 */
export function validateCustomer(customer: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
}): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  
  // First name validation
  const firstNameValidation = validateName(customer.firstName, 'First name');
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.error!;
  }
  
  // Last name validation
  const lastNameValidation = validateName(customer.lastName, 'Last name');
  if (!lastNameValidation.isValid) {
    errors.lastName = lastNameValidation.error!;
  }
  
  // Email validation
  if (!isValidEmail(customer.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation (optional)
  if (customer.phone && !isValidPhone(customer.phone)) {
    errors.phone = 'Please enter a valid phone number (e.g., +34612345678)';
  }
  
  // Notes validation
  if (customer.notes && customer.notes.length > CUSTOMER_RULES.MAX_NOTES_LENGTH) {
    errors.notes = `Notes must be no more than ${CUSTOMER_RULES.MAX_NOTES_LENGTH} characters long`;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Review validation
 */
export function validateReview(review: {
  rating: number;
  comment?: string;
}): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  
  // Rating validation
  if (review.rating < REVIEW_RULES.MIN_RATING || review.rating > REVIEW_RULES.MAX_RATING) {
    errors.rating = `Rating must be between ${REVIEW_RULES.MIN_RATING} and ${REVIEW_RULES.MAX_RATING}`;
  }
  
  if (!Number.isInteger(review.rating)) {
    errors.rating = 'Rating must be a whole number';
  }
  
  // Comment validation
  if (review.comment && review.comment.length > REVIEW_RULES.MAX_COMMENT_LENGTH) {
    errors.comment = `Comment must be no more than ${REVIEW_RULES.MAX_COMMENT_LENGTH} characters long`;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Business slug validation
 */
export function validateBusinessSlug(slug: string): {
  isValid: boolean;
  error?: string;
} {
  if (!slug) {
    return { isValid: false, error: 'Business slug is required' };
  }
  
  if (slug.length < 3) {
    return { isValid: false, error: 'Business slug must be at least 3 characters long' };
  }
  
  if (slug.length > 50) {
    return { isValid: false, error: 'Business slug must be no more than 50 characters long' };
  }
  
  // Must be lowercase, alphanumeric, and hyphens only
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { isValid: false, error: 'Business slug can only contain lowercase letters, numbers, and hyphens' };
  }
  
  // Cannot start or end with hyphen
  if (slug.startsWith('-') || slug.endsWith('-')) {
    return { isValid: false, error: 'Business slug cannot start or end with a hyphen' };
  }
  
  // Cannot have consecutive hyphens
  if (slug.includes('--')) {
    return { isValid: false, error: 'Business slug cannot contain consecutive hyphens' };
  }
  
  return { isValid: true };
}

/**
 * URL validation
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Credit card number validation (basic Luhn algorithm)
 */
export function isValidCreditCard(cardNumber: string): boolean {
  // Remove all non-digit characters
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

/**
 * Sanitize HTML input (basic)
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}