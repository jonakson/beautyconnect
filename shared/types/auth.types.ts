/**
 * Authentication Related Types
 * User authentication, authorization, and session management
 */

import { UserRole } from './models.types';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  businessName?: string;
  role: UserRole;
  acceptTerms: boolean;
  marketingConsent?: boolean;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  business?: AuthBusiness;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date;
  permissions: string[];
}

export interface AuthBusiness {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  currency: 'EUR' | 'GBP';
  subscription: {
    tier: 'free' | 'professional' | 'enterprise';
    staffCount: number;
    expiresAt?: Date;
  };
  role: 'owner' | 'manager' | 'staff';
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface InviteStaffRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: 'manager' | 'staff';
  message?: string;
}

export interface AcceptInviteRequest {
  token: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface JWTPayload {
  userId: string;
  businessId?: string;
  role: UserRole;
  permissions: string[];
  iat: number;
  exp: number;
}

export interface SessionData {
  userId: string;
  businessId?: string;
  role: UserRole;
  email: string;
  ip?: string;
  userAgent?: string;
  lastActivity: Date;
  expiresAt: Date;
}

// Permission constants
export const PERMISSIONS = {
  // Business management
  BUSINESS_VIEW: 'business:view',
  BUSINESS_EDIT: 'business:edit',
  BUSINESS_DELETE: 'business:delete',
  
  // Staff management
  STAFF_VIEW: 'staff:view',
  STAFF_CREATE: 'staff:create',
  STAFF_EDIT: 'staff:edit',
  STAFF_DELETE: 'staff:delete',
  
  // Service management
  SERVICES_VIEW: 'services:view',
  SERVICES_CREATE: 'services:create',
  SERVICES_EDIT: 'services:edit',
  SERVICES_DELETE: 'services:delete',
  
  // Appointment management
  APPOINTMENTS_VIEW: 'appointments:view',
  APPOINTMENTS_CREATE: 'appointments:create',
  APPOINTMENTS_EDIT: 'appointments:edit',
  APPOINTMENTS_DELETE: 'appointments:delete',
  APPOINTMENTS_VIEW_ALL: 'appointments:view_all', // can see other staff's appointments
  
  // Customer management
  CUSTOMERS_VIEW: 'customers:view',
  CUSTOMERS_CREATE: 'customers:create',
  CUSTOMERS_EDIT: 'customers:edit',
  CUSTOMERS_DELETE: 'customers:delete',
  CUSTOMERS_EXPORT: 'customers:export',
  
  // Analytics
  ANALYTICS_VIEW: 'analytics:view',
  ANALYTICS_EXPORT: 'analytics:export',
  
  // Settings
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_EDIT: 'settings:edit',
  
  // Reviews
  REVIEWS_VIEW: 'reviews:view',
  REVIEWS_RESPOND: 'reviews:respond',
  REVIEWS_MODERATE: 'reviews:moderate',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  owner: [
    PERMISSIONS.BUSINESS_VIEW,
    PERMISSIONS.BUSINESS_EDIT,
    PERMISSIONS.BUSINESS_DELETE,
    PERMISSIONS.STAFF_VIEW,
    PERMISSIONS.STAFF_CREATE,
    PERMISSIONS.STAFF_EDIT,
    PERMISSIONS.STAFF_DELETE,
    PERMISSIONS.SERVICES_VIEW,
    PERMISSIONS.SERVICES_CREATE,
    PERMISSIONS.SERVICES_EDIT,
    PERMISSIONS.SERVICES_DELETE,
    PERMISSIONS.APPOINTMENTS_VIEW,
    PERMISSIONS.APPOINTMENTS_CREATE,
    PERMISSIONS.APPOINTMENTS_EDIT,
    PERMISSIONS.APPOINTMENTS_DELETE,
    PERMISSIONS.APPOINTMENTS_VIEW_ALL,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.CUSTOMERS_CREATE,
    PERMISSIONS.CUSTOMERS_EDIT,
    PERMISSIONS.CUSTOMERS_DELETE,
    PERMISSIONS.CUSTOMERS_EXPORT,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.ANALYTICS_EXPORT,
    PERMISSIONS.SETTINGS_VIEW,
    PERMISSIONS.SETTINGS_EDIT,
    PERMISSIONS.REVIEWS_VIEW,
    PERMISSIONS.REVIEWS_RESPOND,
    PERMISSIONS.REVIEWS_MODERATE,
  ],
  manager: [
    PERMISSIONS.BUSINESS_VIEW,
    PERMISSIONS.STAFF_VIEW,
    PERMISSIONS.SERVICES_VIEW,
    PERMISSIONS.SERVICES_CREATE,
    PERMISSIONS.SERVICES_EDIT,
    PERMISSIONS.APPOINTMENTS_VIEW,
    PERMISSIONS.APPOINTMENTS_CREATE,
    PERMISSIONS.APPOINTMENTS_EDIT,
    PERMISSIONS.APPOINTMENTS_DELETE,
    PERMISSIONS.APPOINTMENTS_VIEW_ALL,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.CUSTOMERS_CREATE,
    PERMISSIONS.CUSTOMERS_EDIT,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.REVIEWS_VIEW,
    PERMISSIONS.REVIEWS_RESPOND,
  ],
  staff: [
    PERMISSIONS.BUSINESS_VIEW,
    PERMISSIONS.SERVICES_VIEW,
    PERMISSIONS.APPOINTMENTS_VIEW,
    PERMISSIONS.APPOINTMENTS_CREATE,
    PERMISSIONS.APPOINTMENTS_EDIT,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.CUSTOMERS_CREATE,
    PERMISSIONS.CUSTOMERS_EDIT,
  ],
  customer: [
    // Customers have limited permissions, mostly handled separately
  ],
};