/**
 * Parse a pagination query-string parameter.
 *
 * Returns the parsed integer when the raw string consists solely of decimal
 * digits (i.e. a non-negative integer with no leading/trailing garbage).
 * Returns `null` for anything else — empty string, floats, alphanumeric
 * strings, negative values, exponent notation, etc.
 */
export function parsePaginationParam(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export const MAX_PAGE_LIMIT = 100;
