import Image from 'next/image';
import styles from './guide.module.css';
import { Language } from '@/lib/i18n/client';

interface Props { lang: Language }

const CONTENT = {
  fr: {
    pageTitle: "L'Hospitalité Marocaine",
    sections: [
      {
        type: 'Container1' as const,
        title: "les hotels et riads sélectionnés",
        items: [
          '<strong>Gault&Millau Maroc</strong> met à l’honneur l’hôtellerie et les riads qui incarnent l’élégance, l’hospitalité et l’excellence du service marocain. Nos équipes parcourent le Royaume pour découvrir les établissements qui reflètent le mieux cet art de vivre unique, entre tradition et modernité',
          '<strong>Être référencé dans le Guide Gault&Millau Maroc</strong>, c’est bénéficier d’une visibilité nationale et internationale grâce à notre guide papier, notre site web et nos médias partenaires. Un atout majeur pour les hôtels, riads et maisons d’hôtes qui souhaitent développer leur notoriété et faire rayonner la richesse de l’accueil marocain dans le monde.',
        ],
        image: '/images/hospitality.png',
        imageAlt: "Hospitalité marocaine",
      },
      {
        type: 'Container2' as const,
        title: "Les distinctions Gault&Millau Maroc",
        items: [
          '<strong>Gault&Millau Maroc</strong> Chaque établissement évalué par Gault&Millau Maroc peut obtenir une notation allant de 1 à 5 étoiles, reflet du niveau d’excellence et de l’expérience proposée. Les “Sélectionnés Gault&Millau Maroc” sont les adresses qui se distinguent par leur qualité et leur authenticité, tandis que les établissements sponsorisés bénéficient d’une visibilité renforcée à travers nos supports et partenariats, sans que cela n’influence leur évaluation. Cette classification claire et indépendante permet de guider les voyageurs vers les meilleures adresses du Royaume, reconnues pour leur savoir-faire, leur accueil et leur contribution au rayonnement du Maroc.',
        ],
        image: '/images/sejour.png',
        imageAlt: "Les distinctions Gault&Millau Maroc",
      },
    ],
  },
  en: {
    pageTitle: "Moroccan Hospitality",
    sections: [
      {
        type: 'Container1' as const,
        title: "A Unique Hospitality",
        items: [
          '...',
          '...',
          '...',
        ],
        image: '/images/hospitality-1.png',
        imageAlt: "Moroccan hospitality",
      },
      {
        type: 'Container2' as const,
        title: "The Art of Welcoming",
        items: [
          '...',
          '...',
        ],
        image: '/images/hospitality-2.png',
        imageAlt: "Art of welcoming",
      },
      {
        type: 'Container3' as const,
        title: "Hotel Excellence in Morocco",
        items: [
          '...',
          '...',
          '...',
        ],
        image: '/images/hospitality-3.png',
        imageAlt: "Hotel excellence",
      },
    ],
  },
};

type SectionType = 'Container1' | 'Container2' | 'Container3';

const IMAGE_HEIGHT: Record<SectionType, number> = {
  Container1: 400,
  Container2: 350,
  Container3: 520,
};

export default function HospitalityPage({ lang }: Props) {
  const c = CONTENT[lang] ?? CONTENT.fr;

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>{c.pageTitle}</h1>
      <span className={styles.titleUnderline} />

      <section className={styles.mainSection}>
        {c.sections.map((section, i) => (
          <div key={i} className={styles[section.type]}>
            {section.type === 'Container1' ? (
              <>
                <div className={styles.contentLeft}>
                  <h2>{section.title}</h2>
                  <ul>
                    {section.items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
                <div className={styles.contentRight}>
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    width={200}
                    height={IMAGE_HEIGHT[section.type]}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.contentLeft}>
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    width={400}
                    height={IMAGE_HEIGHT[section.type]}
                    style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                  />
                </div>
                <div className={styles.contentRight}>
                  <h2>{section.title}</h2>
                  <ul>
                    {section.items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
