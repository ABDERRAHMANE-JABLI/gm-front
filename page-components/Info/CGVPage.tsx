import styles from './info.module.css';
import { Language } from '@/lib/i18n/client';

interface Subsection { heading: string; body: string }
interface Section {
  heading:     string;
  body?:       string;
  items?:      string[];
  closing?:    string;
  subsections?: Subsection[];
}

interface PageContent { title: string; sections: Section[] }

interface Props { lang: Language }

const CGV_FR: PageContent = {
  title: "Conditions Générales de Vente",
  sections: [
    {
      heading: "1. Objet et champ d'application",
      body: "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Gault&Millau Maroc, Société par Actions Simplifiée au capital de 90.000,00 Dhs, immatriculée au Registre du Commerce de Casablanca sous le numéro 684903, ICE : 003770977000059, IF : 68298651, Patente : 35556374, dont le siège social est sis 81, Boulevard Moulay Hassan I, 6ème étage, Casablanca, Maroc, Tél. : 06.64.08.21.88, Courriel : contact@gaultmillau.ma, et toute entreprise, établissement ou marque (ci-après « le Client ») souhaitant bénéficier d'une ou plusieurs prestations de communication, publicité, événementiel ou produits dérivés proposées dans le cadre du Réseau Gault&Millau Maroc.\n\nElles s'appliquent à l'ensemble des ventes de :",
      items: [
        "Espaces publicitaires dans les Guides Nationaux ou Régionaux ;",
        "Offres Digitales (site web, réseaux sociaux, newsletters, contenus sponsorisés) ;",
        "Événements et Trophées (Gault&Millau Tour, Jeunes Talents, Gala) ;",
        "Produits physiques tels que les plaques officielles Gault&Millau et actions terrain associées.",
      ],
      closing: "Toute commande passée auprès de Gault&Millau Maroc implique l'adhésion entière et sans réserve du Client aux présentes CGV.",
    },
    {
      heading: "2. Commande et validation",
      body: "Toute commande est matérialisée par un Bon de Commande (BDC) signé par le Client, précisant la nature, le prix et les délais des prestations. La signature du BDC vaut acceptation des présentes CGV sans réserve.\n\nLa validation du BDC peut s'effectuer par voie électronique (email) ou papier. Aucune prestation ne sera engagée sans validation écrite. Toute commande implique un engagement ferme du Client et ne peut être annulée ou modifiée sans accord écrit de Gault&Millau Maroc.",
    },
    {
      heading: "3. Prestations et livrables",
      subsections: [
        {
          heading: "a. Prestations Print",
          body: "Les insertions publicitaires, publirédactionnels ou fiches établissements dans les Guides Gault&Millau Maroc sont réalisées selon les formats définis dans le Kit Média officiel. Un Bon à Tirer (BAT) est transmis pour validation. L'absence de réponse dans un délai de 48 heures vaut acceptation définitive.",
        },
        {
          heading: "b. Prestations Digitales",
          body: "Les prestations digitales comprennent la publication de contenus sponsorisés sur les supports officiels du réseau (site web, réseaux sociaux, newsletters). Les visuels, textes et logos fournis par le Client doivent respecter la charte graphique et éditoriale de Gault&Millau Maroc. En cas de non-conformité, le Vendeur se réserve le droit de refuser le contenu.",
        },
        {
          heading: "c. Prestations Événementielles",
          body: "Les événements (Trophées, Gala, Gault&Millau Tour, etc.) font l'objet de prestations de visibilité et de sponsoring. En cas de report pour cause indépendante de la volonté de Gault&Millau Maroc (conditions météorologiques, contraintes réglementaires, force majeure), l'événement sera reprogrammé sans indemnité.",
        },
        {
          heading: "d. Produits dérivés",
          body: "Les plaques et produits officiels Gault&Millau sont réservés exclusivement aux établissements sélectionnés. Toute reproduction, imitation ou usage non autorisé du logo, du nom ou des signes distinctifs est strictement interdite et passible de poursuites.",
        },
      ],
    },
    {
      heading: "4. Prix et conditions de règlement",
      body: "Les prix sont exprimés en Dirhams Marocains (MAD), hors taxes, et précisés sur chaque Bon de Commande. Ils peuvent être révisés selon l'évolution des coûts de production. Le règlement s'effectue selon les modalités du BDC : virement bancaire, chèque ou autre moyen convenu.\n\nEn cas de paiement échelonné, les échéances sont strictes, conformément à la Loi n° 15-95 (Code de commerce marocain). Tout retard entraîne une pénalité de 10 % du montant dû, sans préavis, et la suspension immédiate des prestations en cours.",
    },
    {
      heading: "5. Annulation, report et modification",
      body: "Toute demande d'annulation doit être formulée par écrit au moins deux mois avant la date prévue de publication ou d'événement. Passé ce délai, la totalité du montant reste due. En cas de force majeure, tout report sera reprogrammé dans un délai raisonnable sans possibilité de remboursement.",
    },
    {
      heading: "6. Responsabilités",
      body: "Le Client est seul responsable des contenus (textes, images, vidéos) transmis. Gault&Millau Maroc se réserve le droit de refuser tout contenu contraire à la loi marocaine, à l'éthique ou à l'image du réseau.\n\nLes retards imputables au Client (livraison tardive de contenus, validations tardives) ne pourront donner lieu à aucun remboursement ni indemnité.",
    },
    {
      heading: "7. Données personnelles et droit à l'image",
      body: "Les données collectées sont traitées conformément à la Loi marocaine n° 09-08 relative à la protection des personnes physiques. Le Client dispose d'un droit d'accès, de rectification et d'opposition sur ses données.\n\nEn signant le Bon de Commande, le Client autorise expressément Gault&Millau Maroc à utiliser, reproduire et diffuser les images, logos ou contenus fournis à des fins promotionnelles sur tous supports.",
    },
    {
      heading: "8. Propriété intellectuelle",
      body: "Tous les éléments appartenant à Gault&Millau Maroc (logos, marques, visuels, textes, contenus digitaux) demeurent sa propriété exclusive. Aucune cession de droits n'est consentie au Client, sauf mention écrite contraire. Toute reproduction non autorisée expose à des poursuites conformément au Code de la propriété industrielle et intellectuelle marocain.",
    },
    {
      heading: "9. Confidentialité",
      body: "Les Parties s'engagent à garder strictement confidentielles toutes les informations échangées dans le cadre de la relation commerciale. Cette obligation demeure pendant cinq (5) ans après la fin du contrat.",
    },
    {
      heading: "10. Force majeure",
      body: "Conformément à l'article 269 du Code des obligations et contrats marocain, tout événement imprévisible, irrésistible et indépendant de la volonté des Parties (grève, guerre, catastrophe naturelle, pandémie, etc.) constitue un cas de force majeure. Les obligations des Parties sont alors suspendues pendant la durée de celui-ci.",
    },
    {
      heading: "11. Droit applicable et juridiction compétente",
      body: "Les présentes CGV sont régies par le droit marocain. Tout différend sera soumis à la compétence exclusive du Tribunal de Commerce de Casablanca, après tentative de règlement amiable.",
    },
    {
      heading: "12. Dispositions finales",
      body: "Si une clause est jugée invalide, les autres clauses demeurent applicables. Le fait pour Gault&Millau Maroc de ne pas exercer un droit ne saurait être interprété comme une renonciation.",
    },
    {
      heading: "13. Modification des CGV",
      body: "Gault&Millau Maroc se réserve le droit de modifier à tout moment les présentes CGV. Les conditions applicables sont celles en vigueur à la date de la commande effectuée par le Client.",
    },
  ],
};

const CGV_EN: PageContent = {
  title: "General Terms of Sale",
  sections: CGV_FR.sections.map((s) => ({ ...s })),
};

export default function CGVPage({ lang }: Props) {
  const page = lang === 'en' ? CGV_EN : CGV_FR;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{page.title}</h1>
        <p className={styles.updated}>
          {lang === 'fr' ? 'Dernière mise à jour : janvier 2026' : 'Last updated: January 2026'}
        </p>

        {page.sections.map((s) => (
          <section key={s.heading} className={styles.section}>
            <h2 className={styles.sectionTitle}>{s.heading}</h2>

            {s.body && s.body.split('\n\n').map((para, i) => (
              <p key={i} className={styles.sectionBody}>{para}</p>
            ))}

            {s.items && (
              <ul className={styles.sectionList}>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {s.closing && (
              <p className={styles.sectionBody}>{s.closing}</p>
            )}

            {s.subsections && s.subsections.map((sub) => (
              <div key={sub.heading} className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>{sub.heading}</h3>
                <p className={styles.sectionBody}>{sub.body}</p>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
