import { ENV } from '../config/env';

/**
 * Resolves image URLs stored in the database.
 * Uploaded images are stored as `/api/...` paths and need the backend base URL prepended.
 * External URLs (https://...) are returned as-is.
 */
export function resolveImageUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith('/api/')) {
    return `${ENV.API_URL.replace('/v1', '')}/v1${url}`;
  }
  return url;
}
