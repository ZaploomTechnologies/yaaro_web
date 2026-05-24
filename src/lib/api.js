const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3200/frontend/v1';

/**
 * Build a full API URL from a relative path.
 * e.g. apiUrl('/users/123') → 'http://localhost:3200/frontend/v1/users/123'
 */
export function apiUrl(path) {
  return `${BASE_URL}${path}`;
}
