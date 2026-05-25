import styles from './info.module.css';
import { Language } from '@/lib/i18n/client';

interface Section {
  heading:  string;
  body?:    string;
  items?:   string[];
  closing?: string;
}

interface Props { lang: Language }

const SECTIONS: Section[] = [
  {
    heading: "1. Responsable du traitement",
    body: "Gault&Millau Maroc, société au capital de 90 000 Dhs, immatriculée au Registre du Commerce de Casablanca sous le numéro 684903, ICE : 003770977000059, IF : 68298651, Patente : 35556374, dont le siège social est sis 81, Boulevard Moulay Hassan I, 6ème étage, Casablanca, Maroc, Tél. : 06.64.08.21.88, Courriel : contact@gaultmillau.ma",
  },
  {
    heading: "2. Données collectées",
    body: "Nom, prénom, date de naissance, genre, email, téléphone, adresse, etc., selon le profil (utilisateur ou professionnel).",
  },
  {
    heading: "3. Utilisation des données",
    items: [
      "Offrir les services du site : recherche d'établissements, consultation des produits, évaluation.",
      "Publication possible du nom, prénom ou « position » des professionnels dans leur établissement.",
      "Seules les données strictement nécessaires sont collectées.",
    ],
  },
  {
    heading: "4. Stockage & sécurité",
    body: "Les services informatiques et processus automatisés sont fournis par un sous-traitant : Gault & Millau International SA – Rue du Jeu-de-l'Arc 15, 1207 Genève. Toutes les données que nous collectons sont stockées dans une base de données hébergée au sein des infrastructures de Platform.sh, sous-traitant en France. Les mots de passe des comptes y sont chiffrés, et les connexions sécurisées au moyen du protocole SSL. Physiquement, les serveurs sont sécurisés et non accessibles au public. Les accès professionnels y sont rigoureusement contrôlés, et limités au personnel technique habilité.",
    items: [
      "Connexions sécurisées (SSL), mots de passe chiffrés.",
      "Contrôle d'accès restreint au personnel technique.",
    ],
  },
  {
    heading: "5. Durée de conservation",
    items: [
      "Les données professionnelles sont conservées tant qu'elles reflètent la réalité. Elles sont mises à jour ou supprimées par un administrateur lorsqu'elles ne sont plus valables.",
      "Pour les utilisateurs disposant d'un compte, les données sont supprimées dans un délai d'un mois après la fermeture du compte.",
      "Sur certaines versions internationales (ex. Gault&Millau Australie), les comptes inactifs depuis plus de 5 ans sont supprimés automatiquement.",
    ],
  },
  {
    heading: "6. Droits des personnes",
    items: [
      "Droit d'accès, de rectification, de suppression, d'opposition, de limitation et de portabilité selon la politique du site.",
      "Pour faire valoir ces droits, les utilisateurs peuvent contacter Gault&Millau Maroc : contact@gaultmillau.ma",
    ],
  },
  {
    heading: "7. Cookies",
    items: [
      "Utilisation de cookies strictement nécessaires au bon fonctionnement du site.",
      "Utilisation de cookies analytiques (ex. Google Analytics), avec des durées de conservation précisées (ex. cookie _ga : 24 mois).",
    ],
  },
  {
    heading: "8. Modifications de la politique de confidentialité",
    items: [
      "Gault&Millau Maroc se réserve le droit de modifier cette politique pour rester en conformité avec l'évolution réglementaire ou technique.",
      "La date de dernière mise à jour est toujours indiquée sur cette page.",
    ],
  },
  {
    heading: "9. Contact et autorité de contrôle",
    body: "Pour toute question ou demande liée à la vie privée : contact@gaultmillau.ma",
    closing: "En cas de non-respect de leurs droits, les utilisateurs peuvent contacter l'autorité de contrôle compétente (ex. la CNIL en France, la CNDP au Maroc).",
  },
];

export default function PolitiqueConfidentialitePage({ lang }: Props) {
  const title = lang === 'en' ? 'Privacy Policy' : 'Politique de confidentialité';
  const updated = lang === 'en' ? 'Last updated: January 2025' : 'Dernière mise à jour : janvier 2025';

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>{updated}</p>

        {SECTIONS.map((s) => (
          <section key={s.heading} className={styles.section}>
            <h2 className={styles.sectionTitle}>{s.heading}</h2>

            {s.body && <p className={styles.sectionBody}>{s.body}</p>}

            {s.items && (
              <ul className={styles.sectionList}>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {s.closing && <p className={styles.sectionBody}>{s.closing}</p>}
          </section>
        ))}
      </div>
    </div>
  );
}
