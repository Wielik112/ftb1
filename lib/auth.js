import crypto from 'crypto';
import { cookies } from 'next/headers';

export const COOKIE_NAME = 'fbt_admin';
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function secret() {
  return process.env.AUTH_SECRET || 'dev-insecure-secret-change-me';
}

function hmac(value) {
  return crypto.createHmac('sha256', secret()).update(value).digest('hex');
}

// token = "<issuedAtMs>.<hmac>"
export function makeSessionToken() {
  const value = String(Date.now());
  return `${value}.${hmac(value)}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;
  const i = token.lastIndexOf('.');
  if (i <= 0) return false;
  const value = token.slice(0, i);
  const mac = token.slice(i + 1);
  const expected = hmac(value);
  if (mac.length !== expected.length) return false;
  try {
    if (!crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  const ts = parseInt(value, 10);
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts <= MAX_AGE_MS;
}

// Constant-time password comparison against ADMIN_PASSWORD.
export function checkPassword(input) {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return false;
  const a = Buffer.from(String(input ?? ''));
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function isAuthed() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}
