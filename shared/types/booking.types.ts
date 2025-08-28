/**
 * Booking Domain Types
 * Availability, time slots, and booking-specific interfaces
 */

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
  available: boolean;
  staffId?: string;
  price?: number;
  currency?: 'EUR' | 'GBP';
}

export interface AvailabilitySlot {
  date: string; // YYYY-MM-DD format
  slots: TimeSlot[];
}

export interface BookingRequest {
  serviceId: string;
  staffId?: string;
  startTime: Date;
  endTime?: Date; // calculated from service duration if not provided
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  notes?: string;
  source?: 'online' | 'phone' | 'walk-in' | 'admin';
  metadata?: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
  };
}

export interface BookingResponse {
  appointmentId: string;
  confirmationCode: string;
  appointment: {
    id: string;
    service: {
      name: string;
      duration: number;
      price: number;
      currency: 'EUR' | 'GBP';
    };
    staff?: {
      name: string;
      avatar?: string;
    };
    startTime: Date;
    endTime: Date;
    status: 'pending' | 'confirmed';
  };
  business: {
    name: string;
    address: string;
    phone?: string;
    email?: string;
  };
}

export interface AvailabilityRequest {
  businessId: string;
  serviceId: string;
  staffId?: string;
  dateFrom: string; // YYYY-MM-DD
  dateTo: string; // YYYY-MM-DD
  timezone?: string;
}

export interface AvailabilityResponse {
  businessId: string;
  serviceId: string;
  staffId?: string;
  timezone: string;
  slots: AvailabilitySlot[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  classNames?: string[];
  extendedProps?: {
    appointmentId?: string;
    serviceId?: string;
    staffId?: string;
    customerId?: string;
    status?: string;
    type?: 'appointment' | 'break' | 'unavailable';
    editable?: boolean;
    customer?: {
      name: string;
      phone?: string;
      email?: string;
    };
    service?: {
      name: string;
      duration: number;
      price: number;
    };
    staff?: {
      name: string;
    };
  };
}

export interface CalendarView {
  view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';
  date: Date;
  timezone: string;
  businessId: string;
  staffId?: string; // filter by specific staff member
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // repeat every N periods
  count?: number; // number of occurrences
  until?: Date; // end date
  byDay?: number[]; // days of week (0=Sunday, 1=Monday, etc.)
  byMonthDay?: number[]; // days of month (1-31)
  byMonth?: number[]; // months (1-12)
}

export interface RecurringAppointment {
  id: string;
  seriesId: string; // groups all appointments in the series
  recurrenceRule: RecurrenceRule;
  exceptions?: Date[]; // dates to skip
  isException?: boolean; // this appointment is an exception to the series
  originalDate?: Date; // for exceptions, the original date
}

export interface TimePreference {
  type: 'morning' | 'afternoon' | 'evening' | 'anytime';
  specificTime?: string; // HH:MM format
  flexibility: number; // minutes of flexibility (±30 min, ±60 min, etc.)
}

export interface BookingPreferences {
  staffPreference?: {
    staffId: string;
    required: boolean; // must be this staff member
  };
  timePreference?: TimePreference;
  locationPreference?: string; // for multi-location businesses
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    reminderHours: number[]; // [24, 2] = 24 hours and 2 hours before
  };
}

export interface WaitingListEntry {
  id: string;
  businessId: string;
  serviceId: string;
  staffId?: string;
  customerId: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  preferences: BookingPreferences;
  preferredDates: string[]; // YYYY-MM-DD format
  createdAt: Date;
  notifiedAt?: Date;
  expiresAt: Date;
}

export interface CancellationRequest {
  appointmentId: string;
  reason?: string;
  requestRefund?: boolean;
}

export interface CancellationResponse {
  cancelled: boolean;
  refundAmount?: number;
  refundMethod?: string;
  cancellationFee?: number;
  message: string;
}

export interface ReschedulingRequest {
  appointmentId: string;
  newStartTime: Date;
  newStaffId?: string;
  reason?: string;
}

export interface ReschedulingResponse {
  rescheduled: boolean;
  newAppointmentId?: string;
  conflictResolution?: 'moved_existing' | 'waiting_list' | 'declined';
  message: string;
}

// Booking flow state management
export interface BookingFlowState {
  step: 'service' | 'staff' | 'datetime' | 'details' | 'confirmation';
  selectedService?: {
    id: string;
    name: string;
    duration: number;
    price: number;
    currency: 'EUR' | 'GBP';
  };
  selectedStaff?: {
    id: string;
    name: string;
    avatar?: string;
  };
  selectedDateTime?: {
    date: string;
    time: string;
    timezone: string;
  };
  customerInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  notes?: string;
  preferences?: BookingPreferences;
}