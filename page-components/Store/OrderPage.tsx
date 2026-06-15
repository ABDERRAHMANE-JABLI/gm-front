'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './OrderPage.module.css';
import { useCartContext } from '@/lib/context/CartContext';

interface FormData {
  nom: string;
  telephone: string;
  email: string;
  etablissement: string;
  adresse: string;
  ville: string;
  codePostal: string;
  pays: string;
}

interface FormErrors {
  nom?: string;
  telephone?: string;
  email?: string;
  etablissement?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
}

const INITIAL: FormData = {
  nom: '',
  telephone: '',
  email: '',
  etablissement: '',
  adresse: '',
  ville: '',
  codePostal: '',
  pays: 'Maroc',
};

interface Props {
  lang: string;
}

export default function OrderPage({ lang }: Props) {
  const { items, totalPrice, clearCart } = useCartContext();
  const [form, setForm]       = useState<FormData>(INITIAL);
  const [errors, setErrors]   = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.nom.trim())           e.nom           = 'Champ requis';
    if (!form.telephone.trim())     e.telephone     = 'Champ requis';
    else if (!/^[\d\s\+\-\(\)]{7,}$/.test(form.telephone.trim()))
                                    e.telephone     = 'Numéro invalide';
    if (!form.email.trim())         e.email         = 'Champ requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
                                    e.email         = 'Email invalide';
    if (!form.etablissement.trim()) e.etablissement = 'Champ requis';
    if (!form.adresse.trim())       e.adresse       = 'Champ requis';
    if (!form.ville.trim())         e.ville         = 'Champ requis';
    if (!form.codePostal.trim())    e.codePostal    = 'Champ requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
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
    <div className={styles.page}>
      <div className={styles.inner}>

        <div className={styles.pageHeader}>
          <div className={styles.pageDash} />
          <h1 className={styles.pageTitle}>Finaliser la commande</h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGrid}>

            {/* ── Colonne 1 : Coordonnées ── */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <h2 className={styles.cardTitle}>Vos Coordonnées</h2>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="nom">
                  Nom complet <span className={styles.required}>*</span>
                </label>
                <input
                  id="nom"
                  className={`${styles.input} ${errors.nom ? styles.error : ''}`}
                  type="text"
                  placeholder="ex : Mohammed Alaoui"
                  value={form.nom}
                  onChange={e => update('nom', e.target.value)}
                  autoComplete="name"
                />
                {errors.nom && <span className={styles.errorMsg}>{errors.nom}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="telephone">
                  Téléphone <span className={styles.required}>*</span>
                </label>
                <input
                  id="telephone"
                  className={`${styles.input} ${errors.telephone ? styles.error : ''}`}
                  type="tel"
                  placeholder="ex : +212 6 00 00 00 00"
                  value={form.telephone}
                  onChange={e => update('telephone', e.target.value)}
                  autoComplete="tel"
                />
                {errors.telephone && <span className={styles.errorMsg}>{errors.telephone}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  Adresse e-mail <span className={styles.required}>*</span>
                </label>
                <input
                  id="email"
                  className={`${styles.input} ${errors.email ? styles.error : ''}`}
                  type="email"
                  placeholder="ex : contact@etablissement.ma"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  autoComplete="email"
                />
                {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="etablissement">
                  Nom de l&apos;établissement <span className={styles.required}>*</span>
                </label>
                <input
                  id="etablissement"
                  className={`${styles.input} ${errors.etablissement ? styles.error : ''}`}
                  type="text"
                  placeholder="ex : Restaurant Le Jardin"
                  value={form.etablissement}
                  onChange={e => update('etablissement', e.target.value)}
                />
                {errors.etablissement && <span className={styles.errorMsg}>{errors.etablissement}</span>}
              </div>
            </div>

            {/* ── Colonne 2 : Adresse de livraison ── */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <h2 className={styles.cardTitle}>Adresse de livraison</h2>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="adresse">
                  Adresse <span className={styles.required}>*</span>
                </label>
                <input
                  id="adresse"
                  className={`${styles.input} ${errors.adresse ? styles.error : ''}`}
                  type="text"
                  placeholder="Numéro et nom de rue"
                  value={form.adresse}
                  onChange={e => update('adresse', e.target.value)}
                  autoComplete="street-address"
                />
                {errors.adresse && <span className={styles.errorMsg}>{errors.adresse}</span>}
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="ville">
                    Ville <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="ville"
                    className={`${styles.input} ${errors.ville ? styles.error : ''}`}
                    type="text"
                    placeholder="ex : Casablanca"
                    value={form.ville}
                    onChange={e => update('ville', e.target.value)}
                    autoComplete="address-level2"
                  />
                  {errors.ville && <span className={styles.errorMsg}>{errors.ville}</span>}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="codePostal">
                    Code postal <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="codePostal"
                    className={`${styles.input} ${errors.codePostal ? styles.error : ''}`}
                    type="text"
                    placeholder="ex : 20000"
                    value={form.codePostal}
                    onChange={e => update('codePostal', e.target.value)}
                    autoComplete="postal-code"
                  />
                  {errors.codePostal && <span className={styles.errorMsg}>{errors.codePostal}</span>}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="pays">Pays</label>
                <input
                  id="pays"
                  className={styles.input}
                  type="text"
                  value={form.pays}
                  onChange={e => update('pays', e.target.value)}
                  autoComplete="country-name"
                />
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
                          <span className={styles.summaryItemQty}>×{item.quantity}</span>
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
            </div>

          </div>

          {/* ── Submit ── */}
          <div className={styles.submitRow}>
            <span className={styles.submitNote}>En commandant, vous acceptez que G&amp;M utilise vos données pour vous contacter.</span>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={items.length === 0}
            >
              <span className={styles.submitBtnLabel}>Confirmer la commande</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
