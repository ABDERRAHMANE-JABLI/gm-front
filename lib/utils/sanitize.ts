/**
 * Strips SQL-injection vectors and dangerous HTML chars from a search string.
 * Keeps French accented letters, apostrophes, spaces, and common punctuation.
 */
/**
 * Valide un slug d'URL : lettres, chiffres, tirets et underscores uniquement.
 * Empêche les requêtes malformées / injections avant tout appel API
 * (un slug invalide → l'appelant renvoie null → la page redirige).
 */
export function isValidSlug(slug: string): boolean {
  return typeof slug === 'string' && /^[a-zA-Z0-9_-]{1,255}$/.test(slug);
}

export function sanitizeSearch(q: string): string {
  return q
    .trim()
    .replace(/[;`\\]/g, '')      // SQL terminators / backtick / backslash
    .replace(/--+/g, '')         // SQL line comments (--)
    .replace(/\/\*|\*\//g, '')   // SQL block comments /* */
    .replace(/[<>]/g, '')        // HTML / XSS
    .replace(/\x00/g, '')        // null byte
    .slice(0, 100);              // max length
}
