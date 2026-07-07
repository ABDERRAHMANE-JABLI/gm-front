import 'server-only'

/**
 * Vérifie un token reCAPTCHA v2 auprès de Google.
 *
 * Fail-closed : si `RECAPTCHA_SECRET_KEY` n'est pas configurée, on retourne false
 * (on bloque) plutôt que de laisser passer sans protection.
 *  Les deux clés (SITE_KEY côté client + SECRET_KEY côté serveur) doivent donc
 * être définies pour que les formulaires fonctionnent.
 */
export async function verifyRecaptcha(token: string | undefined, ip?: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    console.error('[recaptcha] manquant')
    return false
  }
  if (!token) return false

  try {
    const params = new URLSearchParams({ secret, response: token })
    if (ip && ip !== 'unknown') params.set('remoteip', ip)

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}
