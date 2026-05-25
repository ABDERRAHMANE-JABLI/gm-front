import styles from './info.module.css';
import { Language } from '@/lib/i18n/client';

interface Props { lang: Language }

const PDF_URL = '/media/KIT_MEDIA_GAULTMILLAU_MA.pdf';

export default function KitMediaPage({ lang }: Props) {
  const labels = {
    fr: {
      title: 'Kit Média',
      subtitle: 'Téléchargez notre dossier de présentation pour tout savoir sur Gault&Millau Maroc.',
      download: 'Télécharger le Kit Média (PDF)',
      viewerHint: 'Si le PDF ne s\'affiche pas, utilisez le bouton ci-dessus.',
    },
    en: {
      title: 'Media Kit',
      subtitle: 'Download our presentation file to learn everything about Gault&Millau Morocco.',
      download: 'Download Media Kit (PDF)',
      viewerHint: 'If the PDF does not display, use the button above.',
    },
  };

  const l = labels[lang] ?? labels.fr;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{l.title}</h1>
        <p className={styles.subtitle}>{l.subtitle}</p>

        <a
          href={PDF_URL}
          download
          className={styles.downloadBtn}
        >
          ↓ {l.download}
        </a>

        <div className={styles.pdfWrapper}>
          <iframe
            src={PDF_URL}
            className={styles.pdfFrame}
            title={l.title}
          />
        </div>
        <p className={styles.pdfHint}>{l.viewerHint}</p>
      </div>
    </div>
  );
}
