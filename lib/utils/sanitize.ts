/**
 * Strips SQL-injection vectors and dangerous HTML chars from a search string.
 * Keeps French accented letters, apostrophes, spaces, and common punctuation.
 */
export function sanitizeSearch(q: string): string {
  return q
    .trim()
    .replace(/[;`\\]/g, '')      // SQL terminators / backtick / backslash
    .replace(/--+/g, '')         // SQL line comments (--)
    .replace(/\/\*|\*\//g, '')   // SQL block comments /* */
    .replace(/[<>]/g, '')        // HTML / XSS
    .replace(/\x00/g, '')        // null byte
    .slice(0, 150);              // max length
}
