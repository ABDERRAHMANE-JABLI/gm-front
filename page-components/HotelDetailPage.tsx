import React from 'react';
import { Language } from '@/lib/types';

interface HotelDetailPageProps {
  lang: Language;
  slug: string;
}

export default function HotelDetailPage({ lang, slug }: HotelDetailPageProps) {
  const hotelName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const content = {
    fr: {
      backToHotels: 'Retour aux hôtels',
      overview: 'Présentation',
      amenities: 'Services',
      location: 'Emplacement',
      contact: 'Contact',
      rooms: 'Chambres',
      restaurant: 'Restaurant',
      booking: 'Réserver',
      rating: 'Note',
      address: 'Adresse',
      phone: 'Téléphone',
      email: 'Email',
      website: 'Site web'
    },
    en: {
      backToHotels: 'Back to hotels',
      overview: 'Overview',
      amenities: 'Amenities',
      location: 'Location',
      contact: 'Contact',
      rooms: 'Rooms',
      restaurant: 'Restaurant',
      booking: 'Book now',
      rating: 'Rating',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      website: 'Website'
    }
  };

  const t = content[lang] || content.fr;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8">
          <a 
            href={`/${lang}/hotels`}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            ← {t.backToHotels}
          </a>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {hotelName}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="ml-2 text-gray-600">4.8</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">
                  {lang === 'fr' ? 'Hôtel de luxe' : 'Luxury hotel'}
                </span>
              </div>
            </header>

            <div className="mb-8">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                <span className="text-gray-500">
                  {lang === 'fr' ? 'Photo de l\'hôtel' : 'Hotel photo'}
                </span>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.overview}
              </h2>
              <div className="prose prose-lg">
                <p>
                  {lang === 'fr'
                    ? `Découvrez ${hotelName}, un établissement d'exception sélectionné par Gault&Millau pour son service irréprochable et son art de vivre à la française.`
                    : `Discover ${hotelName}, an exceptional establishment selected by Gault&Millau for its impeccable service and French art of living.`
                  }
                </p>
                <p>
                  {lang === 'fr'
                    ? 'Cet hôtel combine élégance traditionnelle et confort moderne, offrant une expérience unique dans un cadre raffiné.'
                    : 'This hotel combines traditional elegance with modern comfort, offering a unique experience in a refined setting.'
                  }
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t.amenities}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  lang === 'fr' ? 'Restaurant gastronomique' : 'Gourmet restaurant',
                  lang === 'fr' ? 'Spa & bien-être' : 'Spa & wellness',
                  lang === 'fr' ? 'Piscine' : 'Swimming pool',
                  lang === 'fr' ? 'Service de conciergerie' : 'Concierge service',
                  lang === 'fr' ? 'Wi-Fi gratuit' : 'Free Wi-Fi',
                  lang === 'fr' ? 'Parking' : 'Parking'
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t.contact}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{t.address}</h4>
                  <p className="text-gray-600">123 Rue de l&apos;Élégance, Paris, France</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{t.phone}</h4>
                  <p className="text-gray-600">+33 1 23 45 67 89</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{t.email}</h4>
                  <p className="text-gray-600">contact@hotel.com</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              {t.booking}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
