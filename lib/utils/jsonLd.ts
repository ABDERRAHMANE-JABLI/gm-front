/**
 * Sérialise un objet JSON-LD pour injection dans une balise
 * <script type="application/ld+json">.
 *
 * Échappe `<`, `>` et `&` en séquences unicode pour empêcher un breakout
 * `</script>` si une donnée (nom d'établissement, titre…) contient du HTML.
 */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
