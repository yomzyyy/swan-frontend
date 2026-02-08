// API response wrapper — matches SuccessResponseMapper on the backend
export interface ApiResponse<T> {
  data: T;
}

// Service-layer result pattern used by adminCrudService create/update/remove
export type ServiceResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

// Remove result has no data payload
export type RemoveResult =
  | { success: true }
  | { success: false; error: string };

// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponseUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: LoginResponseUser;
}

// Session user stored in AuthContext (transformed from LoginResponseUser)
export interface AuthUser {
  username: string;
  name: string;
  role: string;
}

// Image upload results
export interface ImageUploadResult {
  success: boolean;
  imageUrl?: string;
  data?: Record<string, unknown>;
  error?: string;
}

// Validation result
export interface ValidationResult {
  valid: boolean;
  error?: string;
}
