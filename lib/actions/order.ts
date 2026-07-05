'use server'

import { headers } from 'next/headers'
import { getApiBaseUrl, getApiHeaders } from '@/lib/api/_config'
import { rateLimit } from '@/lib/rateLimit'

const MAX_ORDERS_PER_DAY = 5
const ONE_DAY_MS = 24 * 60 * 60 * 1000 // 24h en millisecondes

/**
 * IP cliente : on prend la DERNIÈRE valeur de X-Forwarded-For (ajoutée par notre
 * reverse proxy de confiance) plutôt que la première, fournie par le client et
 * donc falsifiable pour contourner le rate-limit.
 */
function getClientIp(hdrs: Headers): string {
  const xff = hdrs.get('x-forwarded-for')
  if (xff) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean)
    if (parts.length) return parts[parts.length - 1]
  }
  return hdrs.get('x-real-ip') || 'unknown'
}

interface OrderProduct {
  id: string
  qte: number
}

interface OrderPayload {
  nom: string
  nomEtablissement: string
  adresse: string
  email: string
  tel: string
  ville: string
  produits: OrderProduct[]
}

// Longueurs max alignées sur les contraintes du backend (Symfony Assert)
const MAX = { nom: 255, etab: 255, adresse: 255, tel: 20, ville: 100 }

function sanitize(str: unknown, maxLen = 255): string {
  if (typeof str !== 'string') return ''
  return str.replace(/[<>]/g, '').trim().slice(0, maxLen)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(tel: string): boolean {
  // backend : NotBlank + max 20 → tel obligatoire ici
  return /^[\d\s+\-()]{7,20}$/.test(tel)
}

function isValidProductId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{1,50}$/.test(id)
}

export async function submitOrder(payload: OrderPayload): Promise<{ ok: boolean; message?: string }> {
  const hdrs = await headers()
  const ip = getClientIp(hdrs)
  if (!rateLimit(`order:${ip}`, MAX_ORDERS_PER_DAY, ONE_DAY_MS)) {
    return { ok: false, message: 'Vous avez atteint la limite de commandes pour aujourd\'hui. Veuillez réessayer demain.' }
  }

  const nom              = sanitize(payload.nom, MAX.nom)
  const nomEtablissement = sanitize(payload.nomEtablissement, MAX.etab)
  const adresse          = sanitize(payload.adresse, MAX.adresse)
  const email            = sanitize(payload.email)
  const tel              = sanitize(payload.tel, MAX.tel)
  const ville            = sanitize(payload.ville, MAX.ville)

  if (!nom)              return { ok: false, message: 'Le nom est requis.' }
  if (!nomEtablissement) return { ok: false, message: "Le nom de l'établissement est requis." }
  if (!adresse)          return { ok: false, message: "L'adresse est requise." }
  if (!ville)            return { ok: false, message: 'La ville est requise.' }
  if (!email || !isValidEmail(email)) return { ok: false, message: 'Email invalide.' }
  if (!tel)              return { ok: false, message: 'Le téléphone est requis.' }
  if (!isValidPhone(tel)) return { ok: false, message: 'Numéro de téléphone invalide (max 20 caractères).' }

  if (!Array.isArray(payload.produits) || payload.produits.length === 0) {
    return { ok: false, message: 'Le panier est vide.' }
  }

  if (payload.produits.length > 50) {
    return { ok: false, message: 'Trop de produits.' }
  }

  const produits: OrderProduct[] = []
  for (const p of payload.produits) {
    const id = sanitize(p.id)
    const qte = Math.floor(Number(p.qte))
    if (!isValidProductId(id)) return { ok: false, message: `Produit invalide: ${id}` }
    if (!Number.isFinite(qte) || qte < 1 || qte > 100) return { ok: false, message: `Quantité invalide pour ${id}` }
    produits.push({ id, qte })
  }

  try {
    const res = await fetch(`${getApiBaseUrl()}/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // IP réelle du visiteur transmise au backend (sinon il voit l'IP de Next.js
        // et tous les visiteurs partageraient le même bucket de rate-limit).
        'X-Real-IP': ip,
        ...getApiHeaders(),
      },
      body: JSON.stringify({ nom, nomEtablissement, adresse, email, tel, ville, produits }),
    })

    if (!res.ok) {
      // le backend renvoie { error, details? } en JSON
      const body = await res.json().catch(() => null)
      const message = body?.error || `Erreur ${res.status}`
      return { ok: false, message }
    }

    return { ok: true }
  } catch {
    return { ok: false, message: 'Erreur réseau, veuillez réessayer.' }
  }
}
