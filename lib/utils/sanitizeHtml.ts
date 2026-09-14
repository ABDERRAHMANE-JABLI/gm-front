import DOMPurify from 'isomorphic-dompurify';

// Iframes du CMS : le CSS les passe en pleine largeur, on convertit donc leurs
// width/height (ex. 560x315) en `aspect-ratio` inline pour que la hauteur suive
// les proportions d'origine. Les embeds portrait (reels Facebook, 267x476) sont
// en plus limités à leur largeur d'origine pour ne pas devenir démesurés.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.nodeName !== 'IFRAME') return;
  const w = Number(node.getAttribute('width'));
  const h = Number(node.getAttribute('height'));
  if (!(w > 0 && h > 0)) return;
  const style = `aspect-ratio: ${w} / ${h};` + (h > w ? ` max-width: ${w}px;` : '');
  node.setAttribute('style', [node.getAttribute('style'), style].filter(Boolean).join('; '));
});

/**
 * Nettoie une chaîne HTML provenant de l'API/CMS (CKEditor) avant injection
 * via dangerouslySetInnerHTML.
 *
 * BLOQUE tout vecteur JavaScript :
 *   - balises <script>, <object>, <embed>, <base>, <form>
 *   - handlers inline (onclick, onerror, onload…)
 *   - URLs javascript:, vbscript:, data:text/html
 * CONSERVE :
 *   - la mise en forme rédactionnelle, y compris les styles inline du CMS
 *   - les <iframe> (embeds vidéos / cartes) avec src http(s) uniquement
 *
 * Fonctionne côté serveur (RSC) et client.
 */
export function sanitizeHtml(dirty: string | null | undefined): string {
  if (!dirty) return '';
  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ['iframe'],
    // On garde la mise en forme inline + attributs d'iframe légitimes
    ADD_ATTR: ['style', 'target', 'allow', 'allowfullscreen', 'frameborder', 'src', 'width', 'height'],
    // Défense en profondeur contre les vecteurs JS
    FORBID_TAGS: ['script', 'object', 'embed', 'base', 'form'],
    FORBID_ATTR: [
      'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus',
      'onblur', 'onchange', 'onsubmit', 'onanimationstart', 'formaction',
    ],
    // Schémas d'URL autorisés (interdit javascript:, vbscript:, data:text/html…)
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i,
  });
}
