'use server'

import { headers } from 'next/headers'
import { getApiBaseUrl, getApiHeaders } from '@/lib/api/_config'

const MAX_ORDERS_PER_DAY = 5
const rateMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 86400_000 })
    return true
  }
  if (entry.count >= MAX_ORDERS_PER_DAY) return false
  entry.count++
  return true
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

function sanitize(str: unknown): string {
  if (typeof str !== 'string') return ''
  return str.replace(/[<>]/g, '').trim().slice(0, 500)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(tel: string): boolean {
  if (!tel) return true
  return /^[\d\s+\-()]{7,20}$/.test(tel)
}

function isValidProductId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{1,50}$/.test(id)
}

export async function submitOrder(payload: OrderPayload): Promise<{ ok: boolean; message?: string }> {
  const hdrs = await headers()
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() || hdrs.get('x-real-ip') || 'unknown'
  if (!checkRateLimit(ip)) {
    return { ok: false, message: 'Vous avez atteint la limite de commandes pour aujourd\'hui. Veuillez réessayer demain.' }
  }

  const nom              = sanitize(payload.nom)
  const nomEtablissement = sanitize(payload.nomEtablissement)
  const adresse          = sanitize(payload.adresse)
  const email            = sanitize(payload.email)
  const tel              = sanitize(payload.tel)
  const ville            = sanitize(payload.ville)

  if (!nom)              return { ok: false, message: 'Le nom est requis.' }
  if (!nomEtablissement) return { ok: false, message: "Le nom de l'établissement est requis." }
  if (!adresse)          return { ok: false, message: "L'adresse est requise." }
  if (!ville)            return { ok: false, message: 'La ville est requise.' }
  if (!email || !isValidEmail(email)) return { ok: false, message: 'Email invalide.' }
  if (!isValidPhone(tel)) return { ok: false, message: 'Numéro de téléphone invalide.' }

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
        ...getApiHeaders(),
      },
      body: JSON.stringify({ nom, nomEtablissement, adresse, email, tel, ville, produits }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      return { ok: false, message: text || `Erreur ${res.status}` }
    }

    return { ok: true }
  } catch {
    return { ok: false, message: 'Erreur réseau, veuillez réessayer.' }
  }
}
