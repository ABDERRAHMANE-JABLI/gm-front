'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './OrderPage.module.css';
import c from '@/page-components/Contact/ContactPage.module.css';
import Combobox from '@/components/ui/Combobox';
import { useCartContext } from '@/lib/context/CartContext';
import { submitOrder } from '@/lib/actions/order';

interface FormData {
  nom: string;
  telephone: string;
  email: string;
  etablissement: string;
  adresse: string;
  ville: string;
}

interface FormErrors {
  nom?: string;
  telephone?: string;
  email?: string;
  etablissement?: string;
  adresse?: string;
  ville?: string;
}

const INITIAL: FormData = {
  nom: '',
  telephone: '',
  email: '',
  etablissement: '',
  adresse: '',
  ville: '',
};

const VILLES = [
  'Agadir', 'Al Hoceïma', 'Asilah', 'Azemmour', 'Azrou', 'Béni Mellal', 'Benslimane',
  'Berkane', 'Berrechid', 'Casablanca', 'Chefchaouen', 'Dakhla', 'El Jadida', 'Errachidia',
  'Essaouira', 'Fès', 'Fnideq', 'Guelmim', 'Ifrane', 'Kénitra', 'Khémisset', 'Khénifra',
  'Khouribga', 'Laâyoune', 'Larache', 'Marrakech', 'Meknès', 'Mohammedia', 'Nador',
  'Ouarzazate', 'Oujda', 'Rabat', 'Safi', 'Salé', 'Settat', 'Sidi Ifni', 'Sidi Kacem',
  'Tanger', 'Tan-Tan', 'Taourirt', 'Taroudant', 'Taza', 'Témara', 'Tétouan', 'Tinghir',
  'Tiznit', 'Zagora',
  'Autre',
];

interface Props {
  lang: string;
}

export default function OrderPage({ lang }: Props) {
  const { items, totalPrice, clearCart } = useCartContext();
  const [form, setForm]       = useState<FormData>(INITIAL);
  const [errors, setErrors]   = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [apiError, setApiError] = useState('');

  function update(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setApiError('');
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.nom.trim())           e.nom           = 'Champ requis';
    if (!form.telephone.trim())     e.telephone     = 'Champ requis';
    else if (!/^[\d\s+\-()]{7,}$/.test(form.telephone.trim()))
                                    e.telephone     = 'Numéro invalide';
    if (!form.email.trim())         e.email         = 'Champ requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
                                    e.email         = 'Email invalide';
    if (!form.etablissement.trim()) e.etablissement = 'Champ requis';
    if (!form.adresse.trim())       e.adresse       = 'Champ requis';
    if (!form.ville.trim())         e.ville         = 'Champ requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    setApiError('');

    const result = await submitOrder({
      nom: form.nom.trim(),
      nomEtablissement: form.etablissement.trim(),
      adresse: form.adresse.trim(),
      email: form.email.trim(),
      tel: form.telephone.trim(),
      ville: form.ville.trim(),
      produits: items.map(item => ({ id: item.award.id, qte: item.quantity })),
    });

    setSending(false);

    if (result.ok) {
      setSubmitted(true);
      clearCart();
    } else {
      setApiError(result.message || 'Une erreur est survenue.');
    }
  }

  if (submitted) {
    return (
      <div className={`${styles.page} ${c.flush} ${c.bgSection}`}>
        <div className={`${styles.inner} ${c.whiteBox}`}>
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h2 className={styles.successTitle}>Commande envoyée !</h2>
            <p className={styles.successText}>
              Merci pour votre commande. Notre équipe vous contactera dans les plus brefs délais pour confirmer et organiser la livraison.
            </p>
            <Link href={`/${lang}/store`} className={styles.backLink}>
              Retour à la boutique
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${c.flush} ${c.bgSection}`}>
      <div className={`${styles.inner} ${c.whiteBox}`}>

        <div className={styles.pageHeader}>
          <div className={styles.pageDash} />
          <h1 className={styles.pageTitle}>Finaliser la commande</h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className={c.formCol}>

            <div className={styles.field}>
              <label className={c.label} htmlFor="nom">
                Nom complet <span className={c.required}>*</span>
              </label>
              <input
                id="nom"
                className={`${c.input} ${errors.nom ? c.error : ''}`}
                type="text"
                value={form.nom}
                onChange={e => update('nom', e.target.value)}
                autoComplete="name"
              />
              {errors.nom && <span className={c.errorMsg}>{errors.nom}</span>}
            </div>

            <div className={styles.field}>
              <label className={c.label} htmlFor="etablissement">
                Nom de l&apos;établissement <span className={c.required}>*</span>
              </label>
              <input
                id="etablissement"
                className={`${c.input} ${errors.etablissement ? c.error : ''}`}
                type="text"
                value={form.etablissement}
                onChange={e => update('etablissement', e.target.value)}
              />
              {errors.etablissement && <span className={c.errorMsg}>{errors.etablissement}</span>}
            </div>

            <div className={styles.field}>
              <label className={c.label} htmlFor="adresse">
                Adresse <span className={c.required}>*</span>
              </label>
              <input
                id="adresse"
                className={`${c.input} ${errors.adresse ? c.error : ''}`}
                type="text"
                value={form.adresse}
                onChange={e => update('adresse', e.target.value)}
                autoComplete="street-address"
              />
              {errors.adresse && <span className={c.errorMsg}>{errors.adresse}</span>}
            </div>

            <div className={styles.field}>
              <label className={c.label} htmlFor="ville">
                Ville <span className={c.required}>*</span>
              </label>
              <Combobox
                id="ville"
                value={form.ville}
                onChange={(v) => update('ville', v)}
                options={VILLES}
                placeholder="Sélectionnez ou tapez une ville"
                inputClassName={`${c.input} ${errors.ville ? c.error : ''}`}
              />
              {errors.ville && <span className={c.errorMsg}>{errors.ville}</span>}
            </div>

            <div className={c.row2}>
              <div className={styles.field}>
                <label className={c.label} htmlFor="telephone">
                  Téléphone <span className={c.required}>*</span>
                </label>
                <input
                  id="telephone"
                  className={`${c.input} ${errors.telephone ? c.error : ''}`}
                  type="tel"
                  maxLength={15}
                  value={form.telephone}
                  onChange={e => update('telephone', e.target.value)}
                  autoComplete="tel"
                />
                {errors.telephone && <span className={c.errorMsg}>{errors.telephone}</span>}
              </div>

              <div className={styles.field}>
                <label className={c.label} htmlFor="email">
                  Email <span className={c.required}>*</span>
                </label>
                <input
                  id="email"
                  className={`${c.input} ${errors.email ? c.error : ''}`}
                  type="email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  autoComplete="email"
                />
                {errors.email && <span className={c.errorMsg}>{errors.email}</span>}
              </div>
            </div>

          </div>

          {/* ── Récapitulatif commande ── */}
          <div className={styles.summary}>
            <p className={styles.summaryTitle}>Récapitulatif</p>
            {items.length === 0 ? (
              <p className={styles.summaryEmpty}>Panier vide</p>
            ) : (
              <>
                <div className={styles.summaryItems}>
                  {items.map(item => (
                    <div key={item.award.id} className={styles.summaryItem}>
                      <span className={styles.summaryItemName}>{item.award.title}</span>
                      <span className={styles.summaryItemQty}>{item.quantity}x</span>
                      <span className={styles.summaryItemPrice}>
                        {(item.award.price * item.quantity).toLocaleString('fr-FR')} MAD
                      </span>
                    </div>
                  ))}
                </div>
                <div className={styles.summaryTotal}>
                  <span className={styles.summaryTotalLabel}>Total</span>
                  <span>
                    <span className={styles.summaryTotalAmount}>
                      {totalPrice.toLocaleString('fr-FR')}
                    </span>
                    <span className={styles.summaryTotalCurrency}>MAD</span>
                  </span>
                </div>
              </>
            )}
          </div>

          {/* ── Submit ── */}
          {apiError && <p className={c.errorMsg} style={{ textAlign: 'center', marginTop: 16 }}>{apiError}</p>}
          <div className={styles.submitRow}>
            <span className={styles.submitNote}>En commandant, vous acceptez que G&amp;M utilise vos données pour vous contacter.</span>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={items.length === 0 || sending}
            >
              <span className={styles.submitBtnLabel}>{sending ? 'Envoi en cours...' : 'Confirmez la commande'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
