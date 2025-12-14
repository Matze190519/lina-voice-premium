export const SPONSOR_KEY = 'sponsor_code';
export const SPONSOR_EXPIRY_KEY = 'sponsor_expiry';
export const SPONSOR_REGEX = /^(DE|AT|ES)\d{6,}$/;

export function normalizeSponsor(input: string): string {
  return input.trim().replace(/[\s\-_]/g, '').toUpperCase();
}

export function validateSponsor(sponsor: string): boolean {
  return SPONSOR_REGEX.test(sponsor);
}

export function saveSponsor(sponsor: string) {
  if (!validateSponsor(sponsor)) return;
  
  const expiry = Date.now() + 90 * 24 * 60 * 60 * 1000; // 90 days
  localStorage.setItem(SPONSOR_KEY, sponsor);
  localStorage.setItem(SPONSOR_EXPIRY_KEY, expiry.toString());
}

export function getSponsor(): string | null {
  const sponsor = localStorage.getItem(SPONSOR_KEY);
  const expiry = localStorage.getItem(SPONSOR_EXPIRY_KEY);
  
  if (!sponsor || !expiry) return null;
  
  if (Date.now() > parseInt(expiry, 10)) {
    localStorage.removeItem(SPONSOR_KEY);
    localStorage.removeItem(SPONSOR_EXPIRY_KEY);
    return null;
  }
  
  return sponsor;
}
