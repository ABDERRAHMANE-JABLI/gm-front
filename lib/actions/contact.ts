'use server'

import { headers } from 'next/headers'
import { getApiBaseUrl, getApiHeaders } from '@/lib/api/_config'
import { rateLimit } from '@/lib/rateLimit'
import { verifyRecaptcha } from '@/lib/recaptcha'

const MAX_REQUESTS = 5
const ONE_DAY_MS = 24 * 60 * 60 * 1000

function getClientIp(hdrs: Headers): string {
  const xff = hdrs.get('x-forwarded-for')
  if (xff) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean)
    if (parts.length) return parts[parts.length - 1]
  }
  return hdrs.get('x-real-ip') || 'unknown'
}

interface PartnershipPayload {
  nomEtablissement: string
  domaine: string
  adresse: string
  ville: string
  email: string
  tel?: string
  recaptchaToken?: string
}

// Longueurs max alignées sur le backend (Symfony Assert)
const MAX = { etab: 255, domaine: 255, adresse: 255, ville: 100, tel: 20 }

function sanitize(str: unknown, maxLen = 255): string {
  if (typeof str !== 'string') return ''
  return str.replace(/[<>]/g, '').trim().slice(0, maxLen)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(tel: string): boolean {
  // tel optionnel côté backend → on ne valide que s'il est renseigné
  if (!tel) return true
  return /^[\d\s+\-()]{7,20}$/.test(tel)
}

export async function submitPartnership(payload: PartnershipPayload): Promise<{ ok: boolean; message?: string }> {
  const hdrs = await headers()
  const ip = getClientIp(hdrs)
  if (!rateLimit(`partnership:${ip}`, MAX_REQUESTS, ONE_DAY_MS)) {
    return { ok: false, message: 'Vous avez atteint la limite de demandes pour aujourd\'hui. Veuillez réessayer demain.' }
  }

  // Vérification anti-robot (reCAPTCHA v2)
  if (!(await verifyRecaptcha(payload.recaptchaToken, ip))) {
    return { ok: false, message: 'Échec de la vérification anti-robot. Veuillez cocher la case et réessayer.' }
  }

  const nomEtablissement = sanitize(payload.nomEtablissement, MAX.etab)
  const domaine          = sanitize(payload.domaine, MAX.domaine)
  const adresse          = sanitize(payload.adresse, MAX.adresse)
  const ville            = sanitize(payload.ville, MAX.ville)
  const email            = sanitize(payload.email)
  const tel              = sanitize(payload.tel, MAX.tel)

  if (!nomEtablissement) return { ok: false, message: "Le nom de l'établissement est requis." }
  if (!domaine)          return { ok: false, message: 'Le domaine est requis.' }
  if (!adresse)          return { ok: false, message: "L'adresse est requise." }
  if (!ville)            return { ok: false, message: 'La ville est requise.' }
  if (!email || !isValidEmail(email)) return { ok: false, message: 'Email invalide.' }
  if (!isValidPhone(tel)) return { ok: false, message: 'Numéro de téléphone invalide (max 20 caractères).' }

  try {
    const res = await fetch(`${getApiBaseUrl()}/api/contact/partnership`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // IP réelle du visiteur (sinon le backend voit l'IP de Next.js)
        'X-Real-IP': ip,
        ...getApiHeaders(),
      },
      body: JSON.stringify({ nomEtablissement, domaine, adresse, ville, email, tel: tel || undefined }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => null)
      return { ok: false, message: body?.error || `Erreur ${res.status}` }
    }

    return { ok: true }
  } catch {
    return { ok: false, message: 'Erreur réseau, veuillez réessayer.' }
  }
}
