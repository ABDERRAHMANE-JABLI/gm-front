'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/page-components/Store/OrderPage.module.css';
import c from './ContactPage.module.css';
import Combobox from '@/components/ui/Combobox';
import GMLogo from '@/public/icons/GaultMillau.svg';
import Instagram from '@/public/icons/socialIcon/instagram.svg';
import Linkedin from '@/public/icons/socialIcon/linkedin.svg';
import { submitPartnership } from '@/lib/actions/contact';
import { useClientTranslation, Language } from '@/lib/i18n/client';

const CONTACT = {
  instagram: 'https://www.instagram.com/gaultmillauma',
  linkedin:  'https://www.linkedin.com/company/gault-millau-maroc',
  phone:     '+212 6 64 08 21 88',
  phoneHref: 'tel:+212664082188',
  email:     'contact@gaultmillau.ma',
};

interface FormData {
  nomEtablissement: string;
  domaine: string;
  adresse: string;
  ville: string;
  email: string;
  tel: string;
}

interface FormErrors {
  nomEtablissement?: string;
  domaine?: string;
  adresse?: string;
  ville?: string;
  email?: string;
}

const INITIAL: FormData = {
  nomEtablissement: '',
  domaine: '',
  adresse: '',
  ville: '',
  email: '',
  tel: '',
};

const DOMAINES = [
  'Restauration',
  'Hôtellerie',
  'Riad / Maison d\'hôtes',
  'Café / Salon de thé',
  'Pâtisserie / Boulangerie',
  'Traiteur',
  'Agricole',
  'Agroalimentaire',
  'Produits du terroir',
  'Épicerie fine',
  'Vins & Spiritueux',
  'Boissons',
  'Artisanat',
  'Art de la table',
  'Équipement & matériel CHR',
  'Événementiel',
  'Logistique',
  'Distribution / Grossiste',
  'Tourisme',
  'Transport',
  'Médias / Communication',
  'Formation / École culinaire',
  'Technologie / Digital',
  'Finance / Banque',
  'Immobilier',
  'Services',
  'Autre',
];

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
  lang: Language;
}

export default function ContactPage({ lang }: Props) {
  const { t } = useClientTranslation(lang);
  const [form, setForm]           = useState<FormData>(INITIAL);
  const [errors, setErrors]       = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [apiError, setApiError]   = useState('');

  function update(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setApiError('');
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.nomEtablissement.trim()) e.nomEtablissement = t('contact.required');
    if (!form.domaine.trim())          e.domaine          = t('contact.required');
    if (!form.adresse.trim())          e.adresse          = t('contact.required');
    if (!form.ville.trim())            e.ville            = t('contact.required');
    if (!form.email.trim())            e.email            = t('contact.required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
                                       e.email            = t('contact.invalid_email');
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    setApiError('');

    const result = await submitPartnership({
      nomEtablissement: form.nomEtablissement.trim(),
      domaine: form.domaine.trim(),
      adresse: form.adresse.trim(),
      ville: form.ville.trim(),
      email: form.email.trim(),
      tel: form.tel.trim() || undefined,
    });

    setSending(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setApiError(result.message || t('contact.error_generic'));
    }
  }

  if (submitted) {
    return (
      <div className={`${styles.page} ${c.flush}`}>
        <div className={`${styles.inner} ${c.whiteBox}`}>
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h2 className={styles.successTitle}>{t('contact.success_title')}</h2>
            <p className={styles.successText}>
              {t('contact.success_text')}
            </p>
            <Link href={`/${lang}`} className={styles.backLink}>
              {t('contact.back_home')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${c.flush} ${c.bgSection}`}>
      <div className={`${styles.inner} ${c.whiteBox}`}>
        <div className={c.grid}>

          {/* ── Colonne 1 : logo + coordonnées ── */}
          <aside className={c.colLeft}>
            <GMLogo width={200} height={40} className={c.logo} />

            <div className={c.contactInfo}>
              <div className={c.contactSocials}>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={c.contactSocialIcon}>
                  <Instagram width={18} height={18} />
                </a>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={c.contactSocialIcon}>
                  <Linkedin width={18} height={18} />
                </a>
              </div>

              <address className={c.contactAddress}>
                81 BD Moulay Hassan I, 6<sup>e</sup> étage — Casablanca, Maroc
              </address>

              <div className={c.contactRow}>
                <a href={CONTACT.phoneHref} className={c.contactLink}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {CONTACT.phone}
                </a>
                <a href={`mailto:${CONTACT.email}`} className={c.contactLink}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </aside>

          {/* ── Colonne 2 : titre + formulaire ── */}
          <div className={c.colRight}>
            <div className={`${styles.pageHeader} ${c.pageHeaderContact}`}>
              <div className={styles.pageDash} />
              <h1 className={styles.pageTitle}>{t('contact.title')}</h1>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className={c.formCol}>

                <div className={styles.field}>
                  <label className={c.label} htmlFor="nomEtablissement">
                    {t('contact.label_establishment')} <span className={c.required}>*</span>
                  </label>
                  <input
                    id="nomEtablissement"
                    className={`${c.input} ${errors.nomEtablissement ? c.error : ''}`}
                    type="text"
                    value={form.nomEtablissement}
                    onChange={e => update('nomEtablissement', e.target.value)}
                  />
                  {errors.nomEtablissement && <span className={c.errorMsg}>{errors.nomEtablissement}</span>}
                </div>

                <div className={styles.field}>
                  <label className={c.label} htmlFor="domaine">
                    {t('contact.label_domain')} <span className={c.required}>*</span>
                  </label>
                  <Combobox
                    id="domaine"
                    value={form.domaine}
                    onChange={(v) => update('domaine', v)}
                    options={DOMAINES}
                    placeholder={t('contact.placeholder_domain')}
                    inputClassName={`${c.input} ${errors.domaine ? c.error : ''}`}
                  />
                  {errors.domaine && <span className={c.errorMsg}>{errors.domaine}</span>}
                </div>

                {/* adresse + ville sur la même ligne en écran large */}
                <div className={c.row2}>
                  <div className={styles.field}>
                    <label className={c.label} htmlFor="adresse">
                      {t('contact.label_address')} <span className={c.required}>*</span>
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
                      {t('contact.label_city')} <span className={c.required}>*</span>
                    </label>
                    <Combobox
                      id="ville"
                      value={form.ville}
                      onChange={(v) => update('ville', v)}
                      options={VILLES}
                      placeholder={t('contact.placeholder_city')}
                      inputClassName={`${c.input} ${errors.ville ? c.error : ''}`}
                    />
                    {errors.ville && <span className={c.errorMsg}>{errors.ville}</span>}
                  </div>
                </div>

                {/* email + tel sur la même ligne en écran large */}
                <div className={c.row2}>
                  <div className={styles.field}>
                    <label className={c.label} htmlFor="email">
                      {t('contact.label_email')} <span className={c.required}>*</span>
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

                  <div className={styles.field}>
                    <label className={c.label} htmlFor="tel">{t('contact.label_phone')}</label>
                    <input
                      id="tel"
                      className={c.input}
                      type="tel"
                      maxLength={20}
                      placeholder={t('contact.placeholder_phone')}
                      value={form.tel}
                      onChange={e => update('tel', e.target.value)}
                      autoComplete="tel"
                    />
                  </div>
                </div>

              </div>

              {apiError && <p className={c.errorMsg} style={{ textAlign: 'center', marginTop: 16 }}>{apiError}</p>}
              <div className={styles.submitRow}>
                <span className={styles.submitNote}>{t('contact.submit_note')}</span>
                <button type="submit" className={styles.submitBtn} disabled={sending}>
                  <span className={styles.submitBtnLabel}>{sending ? t('contact.submitting') : t('contact.submit')}</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
