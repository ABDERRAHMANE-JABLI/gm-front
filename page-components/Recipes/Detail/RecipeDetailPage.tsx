import React from 'react';
import { Language } from '@/lib/types';

interface RecipeDetailPageProps {
  lang: Language;
  slug: string;
}

export default function RecipeDetailPage({ lang, slug }: RecipeDetailPageProps) {
  const recipeTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const content = {
    fr: {
      backToRecipes: 'Retour aux recettes',
      ingredients: 'Ingrédients',
      instructions: 'Préparation',
      cookingTime: 'Temps de cuisson',
      prepTime: 'Temps de préparation',
      difficulty: 'Difficulté',
      servings: 'Portions',
      tips: 'Conseils du chef',
      nutrition: 'Informations nutritionnelles',
      print: 'Imprimer la recette',
      share: 'Partager',
      minutes: 'minutes',
      easy: 'Facile',
      moderate: 'Modéré',
      difficult: 'Difficile',
      step: 'Étape'
    },
    en: {
      backToRecipes: 'Back to recipes',
      ingredients: 'Ingredients',
      instructions: 'Instructions',
      cookingTime: 'Cooking time',
      prepTime: 'Prep time',
      difficulty: 'Difficulty',
      servings: 'Servings',
      tips: 'Chef tips',
      nutrition: 'Nutrition information',
      print: 'Print recipe',
      share: 'Share',
      minutes: 'minutes',
      easy: 'Easy',
      moderate: 'Moderate',
      difficult: 'Difficult',
      step: 'Step'
    }
  };

  const t = content[lang] || content.fr;

  const sampleIngredients = [
    lang === 'fr' ? '500g de filet de bœuf' : '500g beef fillet',
    lang === 'fr' ? '2 échalotes' : '2 shallots',
    lang === 'fr' ? '200ml de vin rouge' : '200ml red wine',
    lang === 'fr' ? '50g de beurre' : '50g butter',
    lang === 'fr' ? 'Sel et poivre' : 'Salt and pepper'
  ];

  const sampleSteps = [
    lang === 'fr' 
      ? 'Sortir la viande du réfrigérateur 30 minutes avant la cuisson.'
      : 'Remove meat from refrigerator 30 minutes before cooking.',
    lang === 'fr'
      ? 'Saler et poivrer la viande sur toutes les faces.'
      : 'Season the meat with salt and pepper on all sides.',
    lang === 'fr'
      ? 'Faire chauffer une poêle à feu vif et saisir la viande.'
      : 'Heat a pan over high heat and sear the meat.',
    lang === 'fr'
      ? 'Réduire le feu et poursuivre la cuisson selon votre goût.'
      : 'Reduce heat and continue cooking to your taste.'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8">
          <a 
            href={`/${lang}/recipes`}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            ← {t.backToRecipes}
          </a>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {recipeTitle}
              </h1>
              <p className="text-xl text-gray-600">
                {lang === 'fr'
                  ? 'Une recette délicieuse sélectionnée par nos chefs Gault&Millau'
                  : 'A delicious recipe selected by our Gault&Millau chefs'
                }
              </p>
            </header>

            <div className="mb-8">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                <span className="text-gray-500">
                  {lang === 'fr' ? 'Photo de la recette' : 'Recipe photo'}
                </span>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.ingredients}
              </h2>
              <ul className="space-y-2">
                {sampleIngredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-red-600 mr-3">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.instructions}
              </h2>
              <div className="space-y-6">
                {sampleSteps.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.tips}
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800">
                  {lang === 'fr'
                    ? 'Pour un résultat optimal, utilisez une viande de qualité et laissez-la reposer après cuisson.'
                    : 'For optimal results, use quality meat and let it rest after cooking.'
                  }
                </p>
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
                  <h4 className="font-medium text-gray-900">{t.prepTime}</h4>
                  <p className="text-gray-600">15 {t.minutes}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{t.cookingTime}</h4>
                  <p className="text-gray-600">20 {t.minutes}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.difficulty}</h4>
                  <p className="text-gray-600">{t.moderate}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.servings}</h4>
                  <p className="text-gray-600">4</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                {t.print}
              </button>
              
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                {t.share}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
