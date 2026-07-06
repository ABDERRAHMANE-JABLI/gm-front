'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function ArticlesCarousel({ slides }: { slides: React.ReactNode[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = slides.length;

  // Point actif = carte en tête, calculée depuis la position de l'animation
  useEffect(() => {
    if (n <= 1) return;
    const track = trackRef.current;
    if (!track) return;

    const id = setInterval(() => {
      const transform = getComputedStyle(track).transform;
      if (!transform || transform === 'none') return;
      const x = Math.abs(new DOMMatrixReadOnly(transform).m41); // translateX en px
      const half = track.scrollWidth / 2;                        // largeur d'un jeu (doublé)
      if (half > 0) setActive(Math.floor((x / half) * n) % n);
    }, 120);

    return () => clearInterval(id);
  }, [n]);

  if (n === 0) return null;

  // Doublé pour une boucle continue et sans couture (droite → gauche)
  const loop = [...slides, ...slides];

  return (
    <div className={styles.carouselWrap}>
      <div className={styles.carousel}>
        <div className={styles.carouselTrack} ref={trackRef}>
          {loop.map((slide, i) => (
            <div key={i} className={styles.carouselSlide}>{slide}</div>
          ))}
        </div>
      </div>

      <div className={styles.carouselDots} aria-hidden="true">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`${styles.carouselDot} ${i === active ? styles.carouselDotActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
