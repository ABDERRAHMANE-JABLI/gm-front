import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import SingleNewsCard from '@/components/cards/newsUneCard';
import NewsSecondCard from '@/components/cards/newsSecondCard';
import NewsCard from '@/components/cards/NewsCard';
import ArticlesCarousel from './ArticlesCarousel';
import LicensedCountries from '@/components/cards/LicensedContries';
import PartenairesSection from '@/components/cards/partners';
import { HomeApiResponse, HomeSection, HomeSectionItem } from '@/types/api/Home';
import { ApiPartner } from '@/types/api/Partner';
import { NewsCardProps, NewsCardButtonProps, NewsCardButtonKind } from '@/types/News';
import GMLogo from '@/public/icons/GaultMillau.svg';
import { useClientTranslation } from '@/lib/i18n/client';

const LICENSED_COUNTRIES = [
  { name: "Austria",              image: "/images/pays/austria-795b0a.webp",              url: "https://www.gaultmillau.at" },
  { name: "Belgium",              image: "/images/pays/belgium-6cf8f6.webp",              url: "https://www.gaultmillau.be" },
  { name: "Croatia",              image: "/images/pays/croatia-c6d8dd.webp",              url: "https://hr.gaultmillau.com" },
  { name: "Czech Republic",       image: "/images/pays/czech-republic-896cbe.webp",       url: "https://www.gault-millau.cz/" },
  { name: "France",               image: "/images/pays/france-285842.webp",               url: "https://fr.gaultmillau.com" },
  { name: "Georgia",              image: "/images/pays/georgia-1504c5.webp",              url: "https://ge.gaultmillau.com" },
  { name: "Germany",              image: "/images/pays/germany-4c0e98.webp",              url: "https://www.gaultmillau.de/" },
  { name: "Hungary",              image: "/images/pays/hungary-675d4e.webp",              url: "https://www.gault-millau.hu" },
  { name: "Italy",                image: "/images/pays/italy-87b260.webp",                url: "https://www.gaultmillau.it" },
  { name: "Japan",                image: "/images/pays/japan-3f2891.webp",                url: "https://jp.gaultmillau.com" },
  { name: "Luxembourg",           image: "/images/pays/luxembourg-1fc068.webp",           url: "https://www.gaultmillau.lu" },
  { name: "Morocco",              image: "/images/pays/morocco-b9a73f.webp",              url: "https://www.gaultmillau.ma" },
  { name: "Netherlands",          image: "/images/pays/netherlands-915527.webp",          url: "https://www.gault-millau.nl" },
  { name: "Poland",               image: "/images/pays/poland-06a8aa.webp",               url: "https://gaultmillau.com.pl/" },
  { name: "Saudi Arabia",         image: "/images/pays/saudia.png",                       url: "https://sa.gaultmillau.com" },
  { name: "Serbia",               image: "/images/pays/serbia-fb2fa1.webp",               url: "https://rs.gaultmillau.com" },
  { name: "Slovakia",             image: "/images/pays/slovakia-c52ef2.webp",             url: "https://www.gault-millau.sk" },
  { name: "Slovenia",             image: "/images/pays/slovenia-9ca0e1.webp",             url: "https://si.gaultmillau.com" },
  { name: "Switzerland",          image: "/images/pays/switzerland-18b7f1.webp",          url: "https://www.gaultmillau.ch/fr" },
  { name: "Turkey",               image: "/images/pays/turkey-25a4e1.webp",               url: "https://www.gault-millau.com.tr/" },
  { name: "United Arab Emirates", image: "/images/pays/united-arab-emirates-4381e9.webp", url: "https://gaultmillauae.com" },
];

type Language = 'fr' | 'en';

// ── Mappers ──────────────────────────────────────────────────────────────────

function buildButtons(item: HomeSectionItem): NewsCardProps['buttons'] {
  const list: NewsCardButtonProps[] = [];

  if (item.talent) {
    list.push({ buttonKind: NewsCardButtonKind.PEOPLE, text_line1: item.talent.fullName, slug: item.talent.slug });
  }
  if (item.restaurant && list.length < 2) {
    list.push({ buttonKind: NewsCardButtonKind.RESTAURANT, text_line1: item.restaurant.name, text_line2: item.restaurant.lieu, slug: item.restaurant.slug });
  }
  if (item.hotel && list.length < 2) {
    list.push({ buttonKind: NewsCardButtonKind.HOTEL, text_line1: item.hotel.name, text_line2: item.hotel.lieu, slug: item.hotel.slug });
  }
  if (item.artisan && list.length < 2) {
    list.push({ buttonKind: NewsCardButtonKind.ARTISAN, text_line1: item.artisan.title, text_line2: item.artisan.lieu, slug: item.artisan.slug });
  }

  if (list.length === 0) return [];
  if (list.length === 1) return [list[0]];
  return [list[0], list[1]];
}

function toNewsProps(item: HomeSectionItem): NewsCardProps {
  return {
    id:      item.id.toString(),
    title:   item.title,
    resume:  item.resume,
    slug:    item.slug,
    thumbId: item.thumbId ?? '',
    theme:   item.theme ?? undefined,
    buttons: buildButtons(item),
  };
}

// ── Article card by size ─────────────────────────────────────────────────────

type Size = 'full' | 'large' | 'small';

function ArticleCard({ lang, item, size }: { lang: Language; item: HomeSectionItem; size: Size }) {
  const news = toNewsProps(item);
  if (size === 'full')  return <SingleNewsCard lang={lang} news={news} />;
  if (size === 'large') return <NewsSecondCard lang={lang} news={news} />;
  return <NewsCard lang={lang} news={news} withHeader />;
}

// ── Pub image (inline, petite taille) ───────────────────────────────────────

function PubImage({ thumbId, link }: { thumbId: string | null; link: string | null }) {
  const inner = thumbId
    // eslint-disable-next-line @next/next/no-img-element
    ? <img src={thumbId} alt="Publicité" className={styles.pubImg} />
    : <div className={styles.pubPlaceholder} />;

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.pubLink}>
        {inner}
      </a>
    );
  }
  return inner;
}

// ── Pub banner pleine largeur ─────────────────────────────────────────────────

function PubBanner({ thumbId, link }: { thumbId: string | null; link: string | null }) {
  const inner = (
    <div className={styles.pubBanner}>
      {thumbId && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumbId} alt="Publicité" className={styles.pubBannerImg} />
      )}
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.pubBannerLink}>
        {inner}
      </a>
    );
  }
  return inner;
}

// ── Section layouts ──────────────────────────────────────────────────────────

function SectionRenderer({ lang, section }: { lang: Language; section: HomeSection }) {
  const { t } = useClientTranslation(lang);
  const { layoutType, main, secondary, tertiary, pubThumbId, pubLink } = section;

  switch (layoutType) {

    // Entité pleine largeur (3/3)
    case 'article_full':
      if (!main) return null;
      return (
        <div className={styles.gridFull}>
          <ArticleCard lang={lang} item={main} size="full" />
        </div>
      );

    // Entité 2/3 + Entité 1/3
    case 'articles_split':
      if (!main && !secondary) return null;
      return (
        <div className={styles.gridSplit}>
          {main      && <div className={styles.col23}><ArticleCard lang={lang} item={main}      size="large" /></div>}
          {secondary && <div className={styles.col13}><ArticleCard lang={lang} item={secondary} size="small" /></div>}
        </div>
      );

    // Entité 2/3 + Pub 1/3
    case 'article_pub':
      if (!main) return null;
      return (
        <div className={styles.gridSplit}>
          <div className={styles.col23}><ArticleCard lang={lang} item={main} size="large" /></div>
          <div className={styles.col13}><PubImage thumbId={pubThumbId} link={pubLink} /></div>
        </div>
      );

    // 3 Entités → carrousel (bande grise, 1200px, 3 cartes + points)
    case 'three_articles': {
      const items = [main, secondary, tertiary].filter(Boolean) as HomeSectionItem[];
      if (items.length === 0) return null;
      return (
        <div className={styles.carouselBand}>
          <div className={styles.carouselInner}>
            <ArticlesCarousel
              slides={items.map((item, i) => (
                <ArticleCard key={i} lang={lang} item={item} size="small" />
              ))}
            />
            <Link href={`/${lang}/blogs`} className={styles.discoverMore}>
              {t('home.discover_more')}
              <svg className={styles.discoverArrow} width="18" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      );
    }

    // 2 Entités + Pub (1/3 chacun)
    case 'two_articles_pub':
      if (!main && !secondary) return null;
      return (
        <div className={styles.gridThree}>
          {main      && <ArticleCard lang={lang} item={main}      size="small" />}
          {secondary && <ArticleCard lang={lang} item={secondary} size="small" />}
          {pubThumbId && <PubImage thumbId={pubThumbId} link={pubLink} />}
        </div>
      );

    // Bannière pleine largeur (3/3)
    case 'pub_full':
      if (!pubThumbId && !pubLink) return null;
      return (
        <div className={styles.gridFull}>
          <PubBanner thumbId={pubThumbId} link={pubLink} />
        </div>
      );

    default:
      return null;
  }
}

// ── Main component ───────────────────────────────────────────────────────────

function HeroDefault({ lang }: { lang: Language }) {
  const { t } = useClientTranslation(lang);
  return (
    <div className={styles.hero}>
      <Image
        src="/icons/bg_mainsection.avif"
        alt=""
        fill
        unoptimized
        className={styles.heroBg}
        priority
      />
      <div className={styles.heroOverlay} />
      <h1 className={styles.heroTitle}>
        <GMLogo width={300} height={150} />
        <span className="sr-only">{t('seo.h1_home')}</span>
      </h1>
      <p className={styles.heroText}>{t('home.hero.description')}</p>
    </div>
  );
}

export default function HomePage({ lang, data, partners }: { lang: Language; data: HomeApiResponse | null; partners: ApiPartner[] }) {
  const { t } = useClientTranslation(lang);
  const isEmpty = !data || data.sections.length === 0;

  if (isEmpty) {
    return (
      <main className={styles.homepage}>
        <HeroDefault lang={lang} />
        <div className={styles.licensedSection}>
          <div className={styles.licensedHeader}>
            <GMLogo width={216} height={32} />
            <p className={styles.licensedTitle}>{t('home.licensed.world')}</p>
          </div>
          <LicensedCountries countries={LICENSED_COUNTRIES} />
        </div>
        <PartenairesSection partners={partners} lang={lang} />
      </main>
    );
  }

  const { sections } = data;

  return (
    <main className={styles.homepage}>
      <div className={styles.container}>

        {sections.map((section) => (
          <section
            key={section.id}
            className={`${styles.section} ${section.layoutType === 'pub_full' ? styles.pubFullSection : ''}`}
          >
            <SectionRenderer lang={lang} section={section} />
          </section>
        ))}

      </div>

      <div className={styles.licensedSection}>
        <div className={styles.licensedHeader}>
          <GMLogo width={216} height={32} />
          <p className={styles.licensedTitle}>{t('home.licensed.world')}</p>
        </div>
        <LicensedCountries countries={LICENSED_COUNTRIES} />
      </div>

      <PartenairesSection partners={partners} lang={lang} />
    </main>
  );
}
