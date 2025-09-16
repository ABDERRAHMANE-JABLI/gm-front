import React from 'react';
import { Language } from '@/lib/types';

interface WineryDetailPageProps {
  lang: Language;
  winerySlug: string;
}

export default function WineryDetailPage({ lang, winerySlug }: WineryDetailPageProps) {
  const wineryName = winerySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const content = {
    fr: {
      backToWineries: 'Retour aux domaines',
      history: 'Histoire',
      philosophy: 'Philosophie',
      wines: 'Nos vins',
      terroir: 'Terroir',
      awards: 'Distinctions',
      visit: 'Visiter le domaine',
      contact: 'Contact',
      location: 'Localisation',
      established: 'Fondé en',
      vineyard: 'Superficie du vignoble',
      production: 'Production annuelle',
      winemaker: 'Vigneron',
      region: 'Région',
      tastings: 'Dégustations',
      bookVisit: 'Réserver une visite'
    },
    en: {
      backToWineries: 'Back to wineries',
      history: 'History',
      philosophy: 'Philosophy',
      wines: 'Our wines',
      terroir: 'Terroir',
      awards: 'Awards',
      visit: 'Visit the winery',
      contact: 'Contact',
      location: 'Location',
      established: 'Established in',
      vineyard: 'Vineyard area',
      production: 'Annual production',
      winemaker: 'Winemaker',
      region: 'Region',
      tastings: 'Tastings',
      bookVisit: 'Book a visit'
    }
  };

  const t = content[lang] || content.fr;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8">
          <a 
            href={`/${lang}/wineries`}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            ← {t.backToWineries}
          </a>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {wineryName}
              </h1>
              <p className="text-xl text-gray-600">
                {lang === 'fr'
                  ? 'Domaine viticole d\'exception reconnu par Gault&Millau'
                  : 'Exceptional winery recognized by Gault&Millau'
                }
              </p>
            </header>

            <div className="mb-8">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                <span className="text-gray-500">
                  {lang === 'fr' ? 'Photo du domaine' : 'Winery photo'}
                </span>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.history}
              </h2>
              <div className="prose prose-lg">
                <p>
                  {lang === 'fr'
                    ? `Le domaine ${wineryName} est une propriété familiale qui perpétue depuis des générations l'art de la viticulture. Fondé au cœur d'un terroir d'exception, ce domaine incarne la passion et le savoir-faire français.`
                    : `The ${wineryName} estate is a family property that has perpetuated the art of viticulture for generations. Founded in the heart of an exceptional terroir, this estate embodies French passion and know-how.`
                  }
                </p>
                <p>
                  {lang === 'fr'
                    ? 'Chaque millésime reflète l\'authenticité de ce terroir unique, travaillé avec respect et dans le souci constant de l\'excellence.'
                    : 'Each vintage reflects the authenticity of this unique terroir, worked with respect and constant concern for excellence.'
                  }
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.philosophy}
              </h2>
              <div className="prose prose-lg">
                <blockquote className="border-l-4 border-red-600 pl-6 italic">
                  <p>
                    {lang === 'fr'
                      ? '"Nous croyons que chaque vin doit exprimer l\'essence de son terroir tout en révélant la personnalité de celui qui l\'a façonné."'
                      : '"We believe that each wine must express the essence of its terroir while revealing the personality of the one who shaped it."'
                    }
                  </p>
                </blockquote>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.terroir}
              </h2>
              <div className="prose prose-lg">
                <p>
                  {lang === 'fr'
                    ? 'Le terroir exceptionnel de ce domaine bénéficie d\'un microclimat unique et de sols riches qui confèrent aux vins leur caractère distinctif.'
                    : 'The exceptional terroir of this estate benefits from a unique microclimate and rich soils that give the wines their distinctive character.'
                  }
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.wines}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Cuvée Tradition', type: lang === 'fr' ? 'Rouge' : 'Red' },
                  { name: 'Cuvée Prestige', type: lang === 'fr' ? 'Rouge' : 'Red' },
                  { name: 'Blanc de Blancs', type: lang === 'fr' ? 'Blanc' : 'White' },
                  { name: 'Rosé Délicat', type: lang === 'fr' ? 'Rosé' : 'Rosé' }
                ].map((wine, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900">{wine.name}</h3>
                    <p className="text-gray-600 text-sm">{wine.type}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {lang === 'fr' ? 'Informations' : 'Information'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{t.region}</h4>
                  <p className="text-gray-600">Bordeaux</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{t.established}</h4>
                  <p className="text-gray-600">1850</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.vineyard}</h4>
                  <p className="text-gray-600">
                    {lang === 'fr' ? '45 hectares' : '45 hectares'}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.production}</h4>
                  <p className="text-gray-600">
                    {lang === 'fr' ? '200,000 bouteilles' : '200,000 bottles'}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.winemaker}</h4>
                  <p className="text-gray-600">Jean-Pierre Martin</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                {t.bookVisit}
              </button>
              
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                {t.contact}
              </button>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">
                {t.awards}
              </h4>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Médaille d&apos;Or Concours Général Agricole</li>
                <li>• Guide Hachette 2023</li>
                <li>• Sélection Gault&Millau</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
