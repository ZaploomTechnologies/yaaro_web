/** Base URL for public frontend API (includes /frontend/v1). */
export function getApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/frontend/v1").replace(/\/$/, "");
}

/** Build a full API URL for a path segment, e.g. `/users/123`. */
export function apiUrl(path) {
  const base = getApiBaseUrl();
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
