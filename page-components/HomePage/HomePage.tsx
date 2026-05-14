import Image from 'next/image';
import styles from './styles.module.css';
import SingleNewsCard from '@/components/cards/newsUneCard';
import NewsSecondCard from '@/components/cards/newsSecondCard';
import NewsCard from '@/components/cards/NewsCard';
import RestaurantCard from '@/components/cards/restaurantCard';
import HorizontalRecipeCard from '@/components/cards/recipeCard/HorizontalCard';
import LicensedCountries from '@/components/cards/LicensedContries';
import PartenairesSection from '@/components/cards/partners';
import { HomeApiResponse, HomeSection, HomeSectionItem, HomeRecipe } from '@/types/api/Home';
import { ApiPartner } from '@/types/api/Partner';
import { NewsCardProps } from '@/types/News';
import { RestaurantProps } from '@/types/Restaurant';
import { RecipeCardProps } from '@/types/Recipe';
import RecipeCard from '@/components/cards/recipeCard';
import GMLogo         from '@/public/icons/GaultMillau.svg';

const LICENSED_COUNTRIES = [
  { name: "Austria",              image: "https://assets.gaultmillau.com/assets/f768ea77-849a-428f-aa2d-43bdd9795b0a/austria-795b0a.webp?width=125&height=125&format=webp",              url: "https://www.gaultmillau.at" },
  { name: "Belgium",              image: "https://assets.gaultmillau.com/assets/5aa18e14-f5c2-4e90-8f52-c732806cf8f6/belgium-6cf8f6.webp?width=125&height=125&format=webp",              url: "https://www.gaultmillau.be" },
  { name: "Croatia",              image: "https://assets.gaultmillau.com/assets/489e3390-5327-418b-a0a6-93566bc6d8dd/croatia-c6d8dd.webp?width=125&height=125&format=webp",              url: "https://hr.gaultmillau.com" },
  { name: "Czech Republic",       image: "https://assets.gaultmillau.com/assets/c4153a91-4b11-42fc-99a6-f1c2a3896cbe/czech-republic-896cbe.webp?width=125&height=125&format=webp",       url: "https://www.gault-millau.cz/" },
  { name: "France",               image: "https://assets.gaultmillau.com/assets/ccb1a33c-da49-485a-86a9-b44a49285842/france-285842.webp?width=125&height=125&format=webp",               url: "https://fr.gaultmillau.com" },
  { name: "Georgia",              image: "https://assets.gaultmillau.com/assets/81b2a615-f877-4573-8f73-a66d871504c5/georgia-1504c5.webp?width=125&height=125&format=webp",              url: "https://ge.gaultmillau.com" },
  { name: "Germany",              image: "https://assets.gaultmillau.com/assets/2b91670c-d670-4ef0-9a2b-a4a1b14c0e98/germany-4c0e98.webp?width=125&height=125&format=webp",              url: "https://www.gaultmillau.de/" },
  { name: "Hungary",              image: "https://assets.gaultmillau.com/assets/75f49373-b5e1-4d20-a762-1cf7ed675d4e/hungary-675d4e.webp?width=125&height=125&format=webp",              url: "https://www.gault-millau.hu" },
  { name: "Italy",                image: "https://assets.gaultmillau.com/assets/5b922ea2-e3bb-4c7e-a50d-a1c45287b260/italy-87b260.webp?width=125&height=125&format=webp",                url: "https://www.gaultmillau.it" },
  { name: "Japan",                image: "https://assets.gaultmillau.com/assets/3ed0a244-8fbe-42d6-ba48-552b783f2891/japan-3f2891.webp?width=125&height=125&format=webp",                url: "https://jp.gaultmillau.com" },
  { name: "Luxembourg",           image: "https://assets.gaultmillau.com/assets/06752659-6bd1-4e5e-8b40-9844951fc068/luxembourg-1fc068.webp?width=125&height=125&format=webp",           url: "https://www.gaultmillau.lu" },
  { name: "Morocco",              image: "https://assets.gaultmillau.com/assets/21bf4eaa-0235-4934-ab59-de39cfb9a73f/morocco-b9a73f.webp?width=125&height=125&format=webp",              url: "https://www.gaultmillau.ma" },
  { name: "Netherlands",          image: "https://assets.gaultmillau.com/assets/cbbf3667-e71e-40f0-a919-cc1787915527/netherlands-915527.webp?width=125&height=125&format=webp",          url: "https://www.gault-millau.nl" },
  { name: "Poland",               image: "https://assets.gaultmillau.com/assets/5e1ad9f8-4fd6-4a5a-afeb-3507b106a8aa/poland-06a8aa.webp?width=125&height=125&format=webp",               url: "https://gaultmillau.com.pl/" },
  { name: "Saudi Arabia",         image: "https://assets.gaultmillau.com/assets/84ff9159-90e6-48b2-9b47-76ec492001bc/saudi-arabia-2001bc.webp?width=125&height=125&format=webp",         url: "https://sa.gaultmillau.com" },
  { name: "Serbia",               image: "https://assets.gaultmillau.com/assets/664f2d85-9e12-49a0-945a-81e14efb2fa1/serbia-fb2fa1.webp?width=125&height=125&format=webp",               url: "https://rs.gaultmillau.com" },
  { name: "Slovakia",             image: "https://assets.gaultmillau.com/assets/56081f6f-aeb4-448f-b377-1bc5c9c52ef2/slovakia-c52ef2.webp?width=125&height=125&format=webp",             url: "https://www.gault-millau.sk" },
  { name: "Slovenia",             image: "https://assets.gaultmillau.com/assets/8fd6908c-b7f7-4b2c-a162-69f6859ca0e1/slovenia-9ca0e1.webp?width=125&height=125&format=webp",             url: "https://si.gaultmillau.com" },
  { name: "Switzerland",          image: "https://assets.gaultmillau.com/assets/f9520f43-ae98-4e62-a2ee-fc7d2b18b7f1/switzerland-18b7f1.webp?width=125&height=125&format=webp",          url: "https://www.gaultmillau.ch/fr" },
  { name: "Turkey",               image: "https://assets.gaultmillau.com/assets/d2f2f30b-7785-4177-a246-69a4e825a4e1/turkey-25a4e1.webp?width=125&height=125&format=webp",               url: "https://www.gault-millau.com.tr/" },
  { name: "United Arab Emirates", image: "https://assets.gaultmillau.com/assets/41071e2b-c3e7-47bd-9fa6-3932894381e9/united-arab-emirates-4381e9.webp?width=125&height=125&format=webp", url: "https://gaultmillauae.com" },
];

type Language = 'fr' | 'en';

// ── Mappers ─────────────────────────────────────────────────────────────────

function toNewsProps(item: HomeSectionItem): NewsCardProps {
  return {
    id:      item.id.toString(),
    title:   item.title,
    resume:  '',
    slug:    item.slug,
    thumbId: item.thumbId ?? '',
    buttons: [],
  };
}

function toRestaurantProps(item: HomeSectionItem): RestaurantProps {
  return {
    title:    item.title,
    slug:     item.slug,
    nbToques: 0,
    thumbId:  item.thumbId ?? '',
  };
}

function toRecipeItemProps(item: HomeSectionItem): RecipeCardProps {
  return {
    id:      item.id.toString(),
    title:   item.title,
    resume:  '',
    slug:    item.slug,
    thumbId: item.thumbId ?? '',
    buttons: [],
  };
}

function toRecipeProps(recipe: HomeRecipe): RecipeCardProps {
  return {
    id:      recipe.slug,
    title:   recipe.title,
    resume:  recipe.resume,
    slug:    recipe.slug,
    thumbId: recipe.thumbId ?? '',
    theme:   recipe.typeRecipe ? [recipe.typeRecipe] : undefined,
    buttons: [],
  };
}

// ── Item renderer (type + size) ──────────────────────────────────────────────

type Size = 'full' | 'large' | 'small';

function ItemByType({ lang, item, size }: { lang: Language; item: HomeSectionItem; size: Size }) {
  switch (item.type) {
    case 'article':
      if (size === 'full')  return <SingleNewsCard  lang={lang} news={toNewsProps(item)} />;
      if (size === 'large') return <NewsSecondCard  lang={lang} news={toNewsProps(item)} />;
      return                       <NewsCard         lang={lang} news={toNewsProps(item)} withHeader />;

    case 'restaurant':
      return <RestaurantCard lang={lang} restaurant={toRestaurantProps(item)} withHeader />;

    case 'recipe':
      return <RecipeCard lang={lang} recipe={toRecipeItemProps(item)} withHeader />;

    default:
      return null;
  }
}

// ── Pub image ────────────────────────────────────────────────────────────────

function PubImage({ thumbId, link }: { thumbId: string; link: string | null }) {
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src={thumbId} alt="Publicité" className={styles.pubImg} />;
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.pubLink}>
        {img}
      </a>
    );
  }
  return img;
}

// ── Section layouts ──────────────────────────────────────────────────────────

function SectionRenderer({ lang, section }: { lang: Language; section: HomeSection }) {
  const { layoutType, main, secondary, tertiary, pubThumbId, pubLink } = section;

  switch (layoutType) {

    // Entité pleine largeur (3/3)
    case 'article_full':
      if (!main) return null;
      return (
        <div className={styles.gridFull}>
          <ItemByType lang={lang} item={main} size="full" />
        </div>
      );

    // Entité 2/3 + Entité 1/3
    case 'articles_split':
      if (!main && !secondary) return null;
      return (
        <div className={styles.gridSplit}>
          {main      && <div className={styles.col23}><ItemByType lang={lang} item={main}      size="large" /></div>}
          {secondary && <div className={styles.col13}><ItemByType lang={lang} item={secondary} size="small" /></div>}
        </div>
      );

    // Entité 2/3 + Pub 1/3
    case 'article_pub':
      if (!main && !pubThumbId) return null;
      return (
        <div className={styles.gridSplit}>
          {main       && <div className={styles.col23}><ItemByType lang={lang} item={main} size="large" /></div>}
          {pubThumbId && <div className={styles.col13}><PubImage thumbId={pubThumbId} link={pubLink} /></div>}
        </div>
      );

    // 3 Entités (1/3 chacun)
    case 'three_articles':
      if (!main && !secondary && !tertiary) return null;
      return (
        <div className={styles.gridThree}>
          {main      && <ItemByType lang={lang} item={main}      size="small" />}
          {secondary && <ItemByType lang={lang} item={secondary} size="small" />}
          {tertiary  && <ItemByType lang={lang} item={tertiary}  size="small" />}
        </div>
      );

    // Bannière pleine largeur (3/3)
    case 'pub_full':
      if (!pubThumbId) return null;
      return (
        <div className={styles.gridFull}>
          <PubImage thumbId={pubThumbId} link={pubLink} />
        </div>
      );

    default:
      return null;
  }
}

// ── Main component ───────────────────────────────────────────────────────────

function HeroDefault() {
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
      <h1 className={styles.heroTitle}><GMLogo width={300} height={150}/></h1>
      <p className={styles.heroText}>
        Le guide de référence arrive au Maroc — découvrez les meilleures tables, chefs et artisans de la gastronomie marocaine.
      </p>
    </div>
  );
}

export default function HomePage({ lang, data, partners }: { lang: Language; data: HomeApiResponse | null; partners: ApiPartner[] }) {
  const isEmpty = !data || (data.sections.length === 0 && data.latestRecipes.length === 0);

  if (isEmpty) {
    return (
      <main className={styles.homepage}>
        <HeroDefault />
        <div className={styles.licensedSection}>
          <div className={styles.licensedHeader}>
            <GMLogo width={216} height={32} />
            <p className={styles.licensedTitle}>dans le monde</p>
          </div>
          <LicensedCountries countries={LICENSED_COUNTRIES} />
        </div>
        <PartenairesSection partners={partners} />
      </main>
    );
  }

  const { sections, latestRecipes } = data;

  return (
    <main className={styles.homepage}>
      <div className={styles.container}>

        {sections.map((section) => (
          <section key={section.id} className={styles.section}>
            <SectionRenderer lang={lang} section={section} />
          </section>
        ))}

        {latestRecipes.length > 0 && (
          <section className={styles.section}>
            <div className={styles.recipesList}>
              {latestRecipes.map((recipe) => (
                <HorizontalRecipeCard key={recipe.slug} lang={lang} recipe={toRecipeProps(recipe)} />
              ))}
            </div>
          </section>
        )}

      </div>

      <div className={styles.licensedSection}>
        <div className={styles.licensedHeader}>
          <GMLogo width={216} height={32} />
          <p className={styles.licensedTitle}>dans le monde</p>
        </div>
        <LicensedCountries countries={LICENSED_COUNTRIES} />
      </div>

      <PartenairesSection partners={partners} />
    </main>
  );
}
