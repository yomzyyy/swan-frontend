/**
 * Maps technical/API error messages to user-friendly plain English.
 * Messages that are already clear pass through unchanged.
 */

// AJV validation pattern: "must have required property 'fieldName'"
const AJV_REQUIRED_RE = /must have required property '(\w+)'/i;

// AJV pattern: "must NOT have fewer than X characters"
const AJV_MIN_LENGTH_RE = /must NOT have fewer than (\d+) characters/i;

// AJV pattern: "must match format \"email\""
const AJV_FORMAT_RE = /must match format "(\w+)"/i;

// Static mappings for known technical messages
const STATIC_MAP: Record<string, string> = {
  'resource not found': 'The requested item could not be found.',
  'invalid request parameters': 'The request contained invalid data. Please check your input.',
  'network error': 'Unable to connect. Please check your internet connection.',
  'an error occurred': 'Something went wrong. Please try again.',
  'request failed with status code 500': 'A server error occurred. Please try again later.',
  'request failed with status code 404': 'The requested item could not be found.',
  'request failed with status code 403': 'You do not have permission to perform this action.',
  'request failed with status code 429': 'Too many requests. Please wait a moment and try again.',
  'timeout of': 'The request timed out. Please check your connection and try again.',
};

function humanizeFieldName(field: string): string {
  // camelCase → spaced words, then capitalize first letter
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, c => c.toUpperCase())
    .trim();
}

export function friendlyError(message: string): string {
  if (!message) return 'Something went wrong. Please try again.';

  const lower = message.toLowerCase().trim();

  // Check static mappings
  for (const [key, friendly] of Object.entries(STATIC_MAP)) {
    if (lower.startsWith(key) || lower === key) {
      return friendly;
    }
  }

  // AJV: required property
  const requiredMatch = message.match(AJV_REQUIRED_RE);
  if (requiredMatch) {
    return `The ${humanizeFieldName(requiredMatch[1]).toLowerCase()} field is required.`;
  }

  // AJV: min length
  const minLenMatch = message.match(AJV_MIN_LENGTH_RE);
  if (minLenMatch) {
    return `This field must be at least ${minLenMatch[1]} characters long.`;
  }

  // AJV: format
  const formatMatch = message.match(AJV_FORMAT_RE);
  if (formatMatch) {
    return `Please enter a valid ${formatMatch[1]}.`;
  }

  // Already-clear messages (contains spaces, starts with capital, no technical jargon) — pass through
  return message;
}
