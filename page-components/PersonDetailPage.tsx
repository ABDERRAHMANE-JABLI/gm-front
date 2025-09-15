import React from 'react';
import { Language } from '@/lib/types';

interface PersonDetailPageProps {
  lang: Language;
  slug: string;
}

export default function PersonDetailPage({ lang, slug }: PersonDetailPageProps) {
  const personName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const content = {
    fr: {
      backToPeople: 'Retour aux personnalités',
      biography: 'Biographie',
      achievements: 'Réalisations',
      philosophy: 'Philosophie culinaire',
      restaurants: 'Restaurants',
      awards: 'Distinctions',
      contact: 'Contact',
      specialty: 'Spécialité',
      experience: 'Expérience',
      style: 'Style de cuisine'
    },
    en: {
      backToPeople: 'Back to people',
      biography: 'Biography',
      achievements: 'Achievements',
      philosophy: 'Culinary philosophy',
      restaurants: 'Restaurants',
      awards: 'Awards',
      contact: 'Contact',
      specialty: 'Specialty',
      experience: 'Experience',
      style: 'Cooking style'
    }
  };

  const t = content[lang] || content.fr;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8">
          <a 
            href={`/${lang}/peoples`}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            ← {t.backToPeople}
          </a>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {personName}
              </h1>
              <p className="text-xl text-gray-600">
                {lang === 'fr'
                  ? 'Chef cuisinier reconnu par Gault&Millau'
                  : 'Chef recognized by Gault&Millau'
                }
              </p>
            </header>

            <div className="mb-8">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                <span className="text-gray-500">
                  {lang === 'fr' ? 'Portrait du chef' : 'Chef portrait'}
                </span>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.biography}
              </h2>
              <div className="prose prose-lg">
                <p>
                  {lang === 'fr'
                    ? `${personName} est un chef d'exception dont le talent et la créativité ont été reconnus par Gault&Millau. Son parcours remarquable l'a mené à développer une cuisine unique, alliant tradition et innovation.`
                    : `${personName} is an exceptional chef whose talent and creativity have been recognized by Gault&Millau. Their remarkable journey has led them to develop a unique cuisine, combining tradition and innovation.`
                  }
                </p>
                <p>
                  {lang === 'fr'
                    ? 'Formé dans les plus prestigieuses maisons, ce chef a su développer son propre style culinaire, marqué par une recherche constante de l\'excellence et du goût authentique.'
                    : 'Trained in the most prestigious establishments, this chef has developed their own culinary style, marked by a constant search for excellence and authentic taste.'
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
                      ? '"La cuisine est un art qui demande passion, respect du produit et créativité. Chaque plat raconte une histoire."'
                      : '"Cooking is an art that requires passion, respect for the product and creativity. Each dish tells a story."'
                    }
                  </p>
                </blockquote>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.achievements}
              </h2>
              <div className="space-y-4">
                {[
                  lang === 'fr' ? 'Toque Gault&Millau' : 'Gault&Millau Toque',
                  lang === 'fr' ? 'Prix du Jeune Chef de l\'Année' : 'Young Chef of the Year Award',
                  lang === 'fr' ? 'Restaurant étoilé Michelin' : 'Michelin starred restaurant'
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-yellow-500 mr-3">🏆</span>
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {lang === 'fr' ? 'Profil' : 'Profile'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{t.specialty}</h4>
                  <p className="text-gray-600">
                    {lang === 'fr' ? 'Cuisine française moderne' : 'Modern French cuisine'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{t.experience}</h4>
                  <p className="text-gray-600">
                    {lang === 'fr' ? '15 ans' : '15 years'}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.style}</h4>
                  <p className="text-gray-600">
                    {lang === 'fr' ? 'Créatif et authentique' : 'Creative and authentic'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">
                {t.restaurants}
              </h4>
              <p className="text-red-700 text-sm">
                {lang === 'fr'
                  ? 'Découvrez les restaurants de ce chef talentueux.'
                  : 'Discover the restaurants of this talented chef.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
