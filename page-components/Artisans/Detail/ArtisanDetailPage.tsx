import React from 'react';
import { Language } from '@/lib/types';

interface ArtisanDetailPageProps {
  lang: Language;
  slug: string;
}

export default function ArtisanDetailPage({ lang, slug }: ArtisanDetailPageProps) {
  const artisanName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const content = {
    fr: {
      title: `Artisan ${artisanName}`,
      description: 'Découvrez ce talentueux artisan sélectionné par Gault&Millau.',
      specialty: 'Spécialité',
      location: 'Localisation',
      story: 'Son Histoire',
      products: 'Ses Produits',
      contact: 'Contact'
    },
    en: {
      title: `Artisan ${artisanName}`,
      description: 'Discover this talented artisan selected by Gault&Millau.',
      specialty: 'Specialty',
      location: 'Location', 
      story: 'Their Story',
      products: 'Their Products',
      contact: 'Contact'
    }
  };

  const t = content[lang] || content.fr;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600">
            {t.description}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.story}
              </h2>
              <div className="prose prose-lg">
                <p>
                  {lang === 'fr' 
                    ? `Découvrez l'histoire passionnante de ${artisanName}, artisan d'exception reconnu par Gault&Millau pour son savoir-faire traditionnel et son innovation constante.`
                    : `Discover the passionate story of ${artisanName}, an exceptional artisan recognized by Gault&Millau for their traditional expertise and constant innovation.`
                  }
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.products}
              </h2>
              <div className="prose prose-lg">
                <p>
                  {lang === 'fr'
                    ? 'Une sélection de produits d\'exception, créés avec passion et expertise.'
                    : 'A selection of exceptional products, created with passion and expertise.'
                  }
                </p>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t.contact}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{t.specialty}</h4>
                  <p className="text-gray-600">
                    {lang === 'fr' ? 'Artisanat traditionnel' : 'Traditional craftsmanship'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{t.location}</h4>
                  <p className="text-gray-600">
                    {lang === 'fr' ? 'France' : 'France'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
