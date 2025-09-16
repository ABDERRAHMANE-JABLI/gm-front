import React from 'react';
import { Language } from '@/lib/types';

interface BlogDetailPageProps {
  lang: Language;
  slug: string;
}

export default function BlogDetailPage({ lang, slug }: BlogDetailPageProps) {
  const blogTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const content = {
    fr: {
      backToBlogs: 'Retour aux articles',
      publishedOn: 'Publié le',
      by: 'Par',
      readTime: 'Temps de lecture',
      minutes: 'minutes',
      tags: 'Tags',
      relatedArticles: 'Articles associés'
    },
    en: {
      backToBlogs: 'Back to articles',
      publishedOn: 'Published on',
      by: 'By',
      readTime: 'Reading time',
      minutes: 'minutes',
      tags: 'Tags',
      relatedArticles: 'Related articles'
    }
  };

  const t = content[lang] || content.fr;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <a 
            href={`/${lang}/blogs`}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            ← {t.backToBlogs}
          </a>
        </nav>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {blogTitle}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <span>{t.publishedOn} {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}</span>
              <span>•</span>
              <span>{t.by} Gault&Millau</span>
              <span>•</span>
              <span>{5} {t.minutes} {t.readTime.toLowerCase()}</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              {lang === 'fr'
                ? 'Découvrez cet article passionnant de notre équipe éditoriale, explorant les tendances et innovations du monde gastronomique.'
                : 'Discover this fascinating article from our editorial team, exploring trends and innovations in the gastronomic world.'
              }
            </p>

            <div className="mb-8">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <span className="text-gray-500">
                  {lang === 'fr' ? 'Image de l\'article' : 'Article image'}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <p>
                {lang === 'fr'
                  ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                }
              </p>

              <h2>
                {lang === 'fr' ? 'Une tradition culinaire' : 'A culinary tradition'}
              </h2>

              <p>
                {lang === 'fr'
                  ? 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                  : 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                }
              </p>
            </div>
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.tags}</h3>
              <div className="flex flex-wrap gap-2">
                {['gastronomie', 'chef', 'restaurant'].map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
