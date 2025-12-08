// lib/apiFetch.ts
const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

type Init = RequestInit & { suppressAutoRedirect?: boolean };

export default async function apiFetch(input: string, init: Init = {}) {
  const url = input.startsWith("http") ? input : `${BACKEND_BASE}${input}`;
  const opts: RequestInit = {
    credentials: "include", // IMPORTANT: include cookies
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    ...init,
  };

  const res = await fetch(url, opts);

  // global handling for 401 (unauthenticated)
  if (res.status === 401 && !init.suppressAutoRedirect) {
    // Option A: Redirect client to login page
    // window.location.href = "/login";
    // OR throw so caller can handle
    // We'll just return the response so caller can decide:
    return res;
  }

  return res;
}
