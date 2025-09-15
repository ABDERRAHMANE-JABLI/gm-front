import React from 'react';
import { Language } from '@/lib/types';

interface SpiritDetailPageProps {
  lang: Language;
  slug: string;
}

export default function SpiritDetailPage({ lang, slug }: SpiritDetailPageProps) {
  const spiritName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const content = {
    fr: {
      backToSpirits: 'Retour aux spiritueux',
      description: 'Description',
      tastingNotes: 'Notes de dégustation',
      production: 'Production',
      serving: 'Service',
      pairing: 'Accords',
      awards: 'Distinctions',
      type: 'Type',
      origin: 'Origine',
      alcohol: 'Degré d\'alcool',
      volume: 'Volume',
      producer: 'Producteur',
      vintage: 'Millésime',
      buyNow: 'Acheter maintenant',
      addToWishlist: 'Ajouter à ma liste'
    },
    en: {
      backToSpirits: 'Back to spirits',
      description: 'Description',
      tastingNotes: 'Tasting notes',
      production: 'Production',
      serving: 'Serving',
      pairing: 'Pairing',
      awards: 'Awards',
      type: 'Type',
      origin: 'Origin',
      alcohol: 'Alcohol content',
      volume: 'Volume',
      producer: 'Producer',
      vintage: 'Vintage',
      buyNow: 'Buy now',
      addToWishlist: 'Add to wishlist'
    }
  };

  const t = content[lang] || content.fr;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8">
          <a 
            href={`/${lang}/spirits`}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            ← {t.backToSpirits}
          </a>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {spiritName}
              </h1>
              <p className="text-xl text-gray-600">
                {lang === 'fr'
                  ? 'Un spiritueux d\'exception sélectionné par Gault&Millau'
                  : 'An exceptional spirit selected by Gault&Millau'
                }
              </p>
            </header>

            <div className="mb-8">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                <span className="text-gray-500">
                  {lang === 'fr' ? 'Photo du spiritueux' : 'Spirit photo'}
                </span>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.description}
              </h2>
              <div className="prose prose-lg">
                <p>
                  {lang === 'fr'
                    ? `${spiritName} est un spiritueux d'exception qui incarne l'art de la distillation française. Chaque bouteille raconte l'histoire d'un savoir-faire transmis de génération en génération.`
                    : `${spiritName} is an exceptional spirit that embodies the art of French distillation. Each bottle tells the story of know-how passed down from generation to generation.`
                  }
                </p>
                <p>
                  {lang === 'fr'
                    ? 'Élaboré selon des méthodes traditionnelles et avec des ingrédients soigneusement sélectionnés, ce spiritueux offre une expérience gustative unique.'
                    : 'Crafted using traditional methods and carefully selected ingredients, this spirit offers a unique tasting experience.'
                  }
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.tastingNotes}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <h3 className="font-semibold mb-2">
                    {lang === 'fr' ? 'Vue' : 'Appearance'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {lang === 'fr' ? 'Robe dorée brillante' : 'Bright golden color'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👃</span>
                  </div>
                  <h3 className="font-semibold mb-2">
                    {lang === 'fr' ? 'Nez' : 'Nose'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {lang === 'fr' ? 'Arômes complexes et élégants' : 'Complex and elegant aromas'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👅</span>
                  </div>
                  <h3 className="font-semibold mb-2">
                    {lang === 'fr' ? 'Goût' : 'Taste'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {lang === 'fr' ? 'Finale longue et harmonieuse' : 'Long and harmonious finish'}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.serving}
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-blue-800">
                  {lang === 'fr'
                    ? 'À déguster pur, à température ambiante, dans un verre ballon pour révéler tous ses arômes.'
                    : 'To be enjoyed neat, at room temperature, in a balloon glass to reveal all its aromas.'
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
                  <h4 className="font-medium text-gray-900">{t.type}</h4>
                  <p className="text-gray-600">
                    {lang === 'fr' ? 'Cognac' : 'Cognac'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{t.origin}</h4>
                  <p className="text-gray-600">
                    {lang === 'fr' ? 'Charente, France' : 'Charente, France'}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.alcohol}</h4>
                  <p className="text-gray-600">40%</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.volume}</h4>
                  <p className="text-gray-600">70cl</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.producer}</h4>
                  <p className="text-gray-600">Maison Traditionnelle</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                {t.buyNow}
              </button>
              
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                {t.addToWishlist}
              </button>
            </div>

            <div className="mt-6 bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">
                {t.awards}
              </h4>
              <p className="text-yellow-800 text-sm">
                {lang === 'fr'
                  ? 'Médaille d\'or au Concours Général Agricole'
                  : 'Gold medal at the General Agricultural Competition'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
