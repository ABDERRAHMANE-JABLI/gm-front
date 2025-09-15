import React from 'react';
import { Language } from '@/lib/types';

interface WineDetailPageProps {
  lang: Language;
  winerySlug: string;
  slug: string;
}

export default function WineDetailPage({ lang, winerySlug, slug }: WineDetailPageProps) {
  const wineName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const wineryName = winerySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const content = {
    fr: {
      backToWinery: 'Retour au domaine',
      backToWineries: 'Retour aux domaines',
      vintage: 'Millésime',
      grape: 'Cépage',
      region: 'Région',
      alcohol: 'Degré d\'alcool',
      serving: 'Service',
      aging: 'Élevage',
      production: 'Production',
      tastingNotes: 'Notes de dégustation',
      foodPairing: 'Accords mets-vins',
      winemaker: 'Vigneron',
      vineyard: 'Vignoble',
      awards: 'Distinctions',
      buyNow: 'Acheter maintenant',
      addToCart: 'Ajouter au panier',
      price: 'Prix',
      availability: 'Disponibilité',
      inStock: 'En stock',
      nose: 'Nez',
      palate: 'Bouche',
      finish: 'Finale',
      color: 'Couleur'
    },
    en: {
      backToWinery: 'Back to winery',
      backToWineries: 'Back to wineries',
      vintage: 'Vintage',
      grape: 'Grape variety',
      region: 'Region',
      alcohol: 'Alcohol content',
      serving: 'Serving',
      aging: 'Aging',
      production: 'Production',
      tastingNotes: 'Tasting notes',
      foodPairing: 'Food pairing',
      winemaker: 'Winemaker',
      vineyard: 'Vineyard',
      awards: 'Awards',
      buyNow: 'Buy now',
      addToCart: 'Add to cart',
      price: 'Price',
      availability: 'Availability',
      inStock: 'In stock',
      nose: 'Nose',
      palate: 'Palate',
      finish: 'Finish',
      color: 'Color'
    }
  };

  const t = content[lang] || content.fr;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8 space-x-2">
          <a 
            href={`/${lang}/wineries`}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            {t.backToWineries}
          </a>
          <span className="text-gray-400">→</span>
          <a 
            href={`/${lang}/wineries/${winerySlug}`}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            {wineryName}
          </a>
          <span className="text-gray-400">→</span>
          <span className="text-gray-600">{wineName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <header className="mb-8">
              <div className="mb-2">
                <span className="text-gray-500 text-sm">{wineryName}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {wineName}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-yellow-400 text-lg">★★★★☆</span>
                <span className="text-gray-600">4.2/5</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">Gault&Millau</span>
              </div>
            </header>

            <div className="mb-8">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                <span className="text-gray-500">
                  {lang === 'fr' ? 'Photo du vin' : 'Wine photo'}
                </span>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.tastingNotes}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t.color}</h3>
                  <p className="text-gray-600">
                    {lang === 'fr' ? 'Rouge rubis profond' : 'Deep ruby red'}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t.nose}</h3>
                  <p className="text-gray-600">
                    {lang === 'fr' ? 'Fruits rouges, épices' : 'Red fruits, spices'}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t.palate}</h3>
                  <p className="text-gray-600">
                    {lang === 'fr' ? 'Équilibré, tannins soyeux' : 'Balanced, silky tannins'}
                  </p>
                </div>
              </div>

              <div className="prose prose-lg">
                <p>
                  {lang === 'fr'
                    ? `Ce ${wineName} du domaine ${wineryName} exprime toute la richesse de son terroir d'origine. Un vin d'une grande finesse qui révèle une personnalité authentique et des arômes complexes.`
                    : `This ${wineName} from the ${wineryName} estate expresses all the richness of its terroir of origin. A wine of great finesse that reveals an authentic personality and complex aromas.`
                  }
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.foodPairing}
              </h2>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                <p className="text-amber-800">
                  {lang === 'fr'
                    ? 'S\'accorde parfaitement avec les viandes rouges, le gibier et les fromages affinés. Servir à 16-18°C.'
                    : 'Pairs perfectly with red meats, game and aged cheeses. Serve at 16-18°C.'
                  }
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.production}
              </h2>
              <div className="prose prose-lg">
                <p>
                  {lang === 'fr'
                    ? 'Vinification traditionnelle avec élevage en fûts de chêne français pendant 12 mois. Production limitée à 5000 bouteilles par millésime.'
                    : 'Traditional vinification with aging in French oak barrels for 12 months. Production limited to 5000 bottles per vintage.'
                  }
                </p>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {lang === 'fr' ? 'Caractéristiques' : 'Characteristics'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{t.vintage}</h4>
                  <p className="text-gray-600">2020</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{t.grape}</h4>
                  <p className="text-gray-600">
                    {lang === 'fr' ? 'Cabernet Sauvignon, Merlot' : 'Cabernet Sauvignon, Merlot'}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.region}</h4>
                  <p className="text-gray-600">Bordeaux</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.alcohol}</h4>
                  <p className="text-gray-600">13.5%</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.aging}</h4>
                  <p className="text-gray-600">
                    {lang === 'fr' ? '12 mois en fûts de chêne' : '12 months in oak barrels'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900">89€</span>
                <p className="text-gray-600">{t.availability}: <span className="text-green-600">{t.inStock}</span></p>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  {t.buyNow}
                </button>
                
                <button className="w-full border border-red-600 text-red-600 py-3 px-6 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                  {t.addToCart}
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">
                {t.awards}
              </h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Médaille d&apos;Argent Concours de Bordeaux</li>
                <li>• 89/100 Wine Spectator</li>
                <li>• Coup de Cœur Guide Hachette</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
