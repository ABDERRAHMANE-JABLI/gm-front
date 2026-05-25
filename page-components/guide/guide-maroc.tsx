import Image from 'next/image';
import styles from './guide.module.css';
import { Language } from '@/lib/i18n/client';

interface Props { lang: Language }

const CONTENT = {
  fr: {
    pageTitle: 'Mission, Vision Et Valeurs',
    sections: [
      {
        type: 'Container1' as const,
        title: 'La Mission De Gault&Millau',
        items: [
          '<strong>SÉLECTIONNER & RECOMMANDER :</strong> offrir à notre communauté de lecteurs la garantie de découvrir, à travers nos sélections et recommandations, le meilleur de la restauration, de l’hospitalité et des métiers de bouche.',
          '<strong>DÉNICHER & ACCOMPAGNER :</strong> découvrir des talents, les mettre en avant et les promouvoir ; accompagner les chefs vers toujours plus d’excellence et créer des liens justes et bienveillants avec une communauté d’acteurs de la restauration et de l’hospitalité.',
          '<strong>ÉDITER & VALORISER :</strong> Gault&Millau est une référence incontournable, une caution pour les professionnels comme pour les amateurs. Une expertise et un savoir-faire qui nous ont conduits à labelliser les meilleurs établissements et produits.',
        ],
        image: '/images/img_right.jpg',
        imageAlt: 'Mission Gault&Millau',
      },
      {
        type: 'Container2' as const,
        title: 'La Vision De Gault&Millau',
        items: [
          '<strong>De l\’ambition…</strong> devenir le média de référence dans la création de contenus et la recherche d’informations qualifiées pour tous les métiers de la gastronomie et de l’hospitalité.',
          '<strong>… à l’internationalisation :</strong> faire rayonner les savoir-faire et l’excellence des gastronomies locales dans plus de 30 pays et auprès de 2,7 milliards de lecteurs et amateurs d’ici à 2028.',
        ],
        image: '/images/img_left1.png',
        imageAlt: 'Vision Gault&Millau',
      },
      {
        type: 'Container3' as const,
        title: 'Les Valeurs De Gault&Millau',
        items: [
            '<strong>IMPARTIALITÉ & ÉTHIQUE :</strong> les enquêtes sont menées par des experts anonymes qui ne s’annoncent pas et paient leur addition.',
            '<strong>OBJECTIVITÉ & INDÉPENDANCE :</strong> chaque enquêteur reste neutre et impartial, remplissant une grille d’évaluation normée.',
            '<strong>BIENVEILLANCE & RESPECT :</strong> les chefs et professionnels sont suivis tout au long de leur carrière avec considération.',
            '<strong>SAVOIR-FAIRE & FAIRE SAVOIR :</strong> développer la culture du goût et valoriser les savoir-faire dans tous les métiers de bouche.',
            '<strong>ESPRIT PIONNIER & RECONNAISSANCE :</strong> dénicher les nouveaux talents, leur apporter de la visibilité et les honorer à travers les dotations et palmarès.',
        ],
        image: '/images/gala.png',
        imageAlt: 'Valeurs Gault&Millau',
      },
    ],
  },
  en: {
    pageTitle: 'Mission, Vision And Values',
    sections: [
      {
        type: 'Container1' as const,
        title: 'The Mission of Gault&Millau',
        items: [
          '<strong>SELECT & RECOMMEND:</strong> offer our community of readers the guarantee of discovering, through our selections and recommendations, the best in dining, hospitality and culinary craftsmanship.',
          '<strong>DISCOVER & SUPPORT:</strong> uncover talents, highlight and promote them; guide chefs towards ever greater excellence and build fair, caring relationships with a community of restaurateurs and hospitality professionals.',
          '<strong>PUBLISH & PROMOTE:</strong> Gault&Millau is an essential reference, a mark of quality for professionals and enthusiasts alike. An expertise and know-how that has led us to certify the finest establishments and products.',
        ],
        image: '/images/img_right.jpg',
        imageAlt: 'Mission Gault&Millau',
      },
      {
        type: 'Container2' as const,
        title: 'The Vision of Gault&Millau',
        items: [
          '<strong>Ambition…</strong> to become the reference media for content creation and qualified information across all gastronomy and hospitality professions.',
          '<strong>… towards internationalisation:</strong> to share the expertise and excellence of local cuisines across more than 30 countries and reach 2.7 billion readers and enthusiasts by 2028.',
        ],
        image: '/images/img_left1.png',
        imageAlt: 'Vision Gault&Millau',
      },
      {
        type: 'Container3' as const,
        title: 'The Values of Gault&Millau',
        items: [
          '<strong>IMPARTIALITY & ETHICS:</strong> inspections are carried out by anonymous experts who do not announce themselves and pay their own bill.',
          '<strong>OBJECTIVITY & INDEPENDENCE:</strong> each inspector remains neutral and impartial, completing a standardised evaluation form.',
          '<strong>BENEVOLENCE & RESPECT:</strong> chefs and professionals are followed throughout their careers with consideration and care.',
          '<strong>KNOW-HOW & RECOGNITION:</strong> developing a culture of taste and promoting expertise across all culinary trades.',
          '<strong>PIONEERING SPIRIT & ACHIEVEMENT:</strong> discovering new talents, giving them visibility and honouring them through awards and rankings.',
        ],
        image: '/images/gala.png',
        imageAlt: 'Values Gault&Millau',
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

export default function GuideMarocPage({ lang }: Props) {
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
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
