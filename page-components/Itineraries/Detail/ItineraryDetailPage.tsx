import React from 'react';
import { Language } from '@/lib/types';

interface ItineraryDetailPageProps {
  lang: Language;
  regionSlug: string;
  slug: string;
}

export default function ItineraryDetailPage({ lang, regionSlug, slug }: ItineraryDetailPageProps) {
  const itineraryTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const regionName = regionSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const content = {
    fr: {
      backToItineraries: 'Retour aux itinéraires',
      region: 'Région',
      duration: 'Durée',
      difficulty: 'Difficulté',
      highlights: 'Points forts',
      itinerary: 'Itinéraire détaillé',
      recommendations: 'Nos recommandations',
      bookNow: 'Réserver maintenant',
      days: 'jours',
      easy: 'Facile',
      moderate: 'Modéré',
      difficult: 'Difficile'
    },
    en: {
      backToItineraries: 'Back to itineraries',
      region: 'Region',
      duration: 'Duration',
      difficulty: 'Difficulty',
      highlights: 'Highlights',
      itinerary: 'Detailed itinerary',
      recommendations: 'Our recommendations',
      bookNow: 'Book now',
      days: 'days',
      easy: 'Easy',
      moderate: 'Moderate',
      difficult: 'Difficult'
    }
  };

  const t = content[lang] || content.fr;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8">
          <a 
            href={`/${lang}/itineraries`}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            ← {t.backToItineraries}
          </a>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {itineraryTitle}
              </h1>
              <p className="text-xl text-gray-600">
                {lang === 'fr'
                  ? `Un voyage gastronomique exceptionnel à travers ${regionName}`
                  : `An exceptional gastronomic journey through ${regionName}`
                }
              </p>
            </header>

            <div className="mb-8">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                <span className="text-gray-500">
                  {lang === 'fr' ? 'Photo de l\'itinéraire' : 'Itinerary photo'}
                </span>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.highlights}
              </h2>
              <div className="prose prose-lg">
                <ul className="space-y-2">
                  <li>
                    {lang === 'fr'
                      ? 'Découverte de restaurants étoilés'
                      : 'Discovery of starred restaurants'
                    }
                  </li>
                  <li>
                    {lang === 'fr'
                      ? 'Rencontres avec des chefs renommés'
                      : 'Meetings with renowned chefs'
                    }
                  </li>
                  <li>
                    {lang === 'fr'
                      ? 'Dégustation de produits locaux'
                      : 'Tasting of local products'
                    }
                  </li>
                  <li>
                    {lang === 'fr'
                      ? 'Visite de marchés traditionnels'
                      : 'Visit to traditional markets'
                    }
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.itinerary}
              </h2>
              <div className="space-y-6">
                {[1, 2, 3].map(day => (
                  <div key={day} className="border-l-4 border-red-600 pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {lang === 'fr' ? `Jour ${day}` : `Day ${day}`}
                    </h3>
                    <p className="text-gray-600">
                      {lang === 'fr'
                        ? 'Programme passionnant avec découvertes culinaires et rencontres authentiques.'
                        : 'Exciting program with culinary discoveries and authentic encounters.'
                      }
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {lang === 'fr' ? 'Informations pratiques' : 'Practical information'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{t.region}</h4>
                  <p className="text-gray-600">{regionName}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{t.duration}</h4>
                  <p className="text-gray-600">3 {t.days}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.difficulty}</h4>
                  <p className="text-gray-600">{t.easy}</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors mb-4">
              {t.bookNow}
            </button>

            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">
                {t.recommendations}
              </h4>
              <p className="text-red-700 text-sm">
                {lang === 'fr'
                  ? 'Réservez tôt pour garantir votre place dans les meilleurs établissements.'
                  : 'Book early to guarantee your place in the best establishments.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
