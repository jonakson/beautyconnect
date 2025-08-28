/**
 * API Request/Response Types
 * Used for consistent API contracts between frontend and backend
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface SearchParams {
  query?: string;
  location?: {
    lat: number;
    lng: number;
    radius?: number; // in km
  };
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: {
    date: string;
    timeFrom?: string;
    timeTo?: string;
  };
}

export interface FilterParams {
  businessId?: string;
  serviceId?: string;
  staffId?: string;
  customerId?: string;
  status?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface BulkActionRequest {
  action: 'delete' | 'update' | 'export';
  ids: string[];
  data?: any;
}

export interface BulkActionResponse {
  success: number;
  failed: number;
  errors?: Array<{
    id: string;
    error: string;
  }>;
}