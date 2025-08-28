/**
 * Database Model Types
 * Framework-agnostic interfaces matching the database schema
 */

export type Currency = 'EUR' | 'GBP';
export type UserRole = 'owner' | 'manager' | 'staff' | 'customer';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
export type ServiceCategory = 'haircut' | 'coloring' | 'styling' | 'nails' | 'facial' | 'massage' | 'fitness' | 'other';
export type SubscriptionTier = 'free' | 'professional' | 'enterprise';

export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  email: string;
  phone?: string;
  website?: string;
  address: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    lat?: number;
    lng?: number;
  };
  timezone: string;
  currency: Currency;
  subscription: {
    tier: SubscriptionTier;
    staffCount: number;
    expiresAt?: Date;
  };
  settings: {
    bookingWindow: number; // days in advance
    minAdvanceBooking: number; // hours
    bufferTime: number; // minutes
    autoConfirm: boolean;
    allowCancellation: boolean;
    cancellationWindow: number; // hours
  };
  businessHours: Array<{
    dayOfWeek: number; // 0-6, Sunday = 0
    isOpen: boolean;
    openTime?: string; // HH:MM
    closeTime?: string; // HH:MM
    breaks?: Array<{
      startTime: string;
      endTime: string;
    }>;
  }>;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  images?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface StaffMember {
  id: string;
  userId: string;
  businessId: string;
  displayName?: string;
  bio?: string;
  specialties?: string[];
  workingHours: Array<{
    dayOfWeek: number;
    isWorking: boolean;
    startTime?: string;
    endTime?: string;
    breaks?: Array<{
      startTime: string;
      endTime: string;
    }>;
  }>;
  services: string[]; // service IDs
  commission?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  category: ServiceCategory;
  duration: number; // minutes
  price: number;
  currency: Currency;
  color?: string; // hex color for calendar display
  isActive: boolean;
  requiresStaff: boolean;
  maxAdvanceBooking?: number; // days
  bufferTime?: number; // minutes
  resources?: Array<{
    name: string;
    quantity: number;
  }>;
  metadata?: {
    images?: string[];
    instructions?: string;
    aftercareInstructions?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  notes?: string;
  preferences?: {
    language?: string;
    notifications: {
      email: boolean;
      sms: boolean;
    };
    marketing: boolean;
  };
  tags?: string[];
  totalSpent?: number;
  totalAppointments?: number;
  lastAppointmentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  businessId: string;
  serviceId: string;
  staffId?: string;
  customerId?: string;
  customerInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  notes?: string;
  internalNotes?: string;
  price?: number;
  currency?: Currency;
  reminderSent?: boolean;
  confirmationSent?: boolean;
  metadata?: {
    source?: 'online' | 'phone' | 'walk-in' | 'admin';
    ip?: string;
    userAgent?: string;
  };
  cancelledAt?: Date;
  cancelledBy?: string;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  businessId: string;
  appointmentId?: string;
  customerId?: string;
  customerName: string;
  rating: number; // 1-5
  comment?: string;
  response?: {
    text: string;
    respondedAt: Date;
    respondedBy: string;
  };
  isVerified: boolean;
  isPublic: boolean;
  reportedAt?: Date;
  moderatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AvailabilityRule {
  id: string;
  businessId: string;
  staffId?: string; // null for business-wide rules
  title?: string;
  type: 'available' | 'unavailable' | 'break';
  isRecurring: boolean;
  // For single events
  startTime?: Date;
  endTime?: Date;
  // For recurring events
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number; // every N days/weeks/months
    daysOfWeek?: number[]; // for weekly: [1,2,3,4,5] = Mon-Fri
    dayOfMonth?: number; // for monthly
    endDate?: Date;
  };
  // For daily recurring
  timeSlots?: Array<{
    startTime: string; // HH:MM
    endTime: string; // HH:MM
  }>;
  createdAt: Date;
  updatedAt: Date;
}