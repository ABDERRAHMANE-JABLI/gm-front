'use client';

import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      padding: '40px 24px',
      textAlign: 'center',
      fontFamily: '"Montserrat", Helvetica, sans-serif',
    }}>
      <div style={{
        display: 'inline-block',
        background: '#ffe700',
        padding: '6px 18px',
        fontWeight: 800,
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#1a1a1a',
        marginBottom: '32px',
      }}>
        Erreur 404
      </div>

      <h1 style={{
        fontSize: 'clamp(64px, 12vw, 120px)',
        fontWeight: 900,
        color: '#1a1a1a',
        lineHeight: 1,
        margin: '0 0 16px',
        letterSpacing: '-0.02em',
      }}>
        404
      </h1>

      <p style={{
        fontSize: '18px',
        fontWeight: 600,
        color: '#1a1a1a',
        margin: '0 0 12px',
      }}>
        Page introuvable
      </p>

      <p style={{
        fontSize: '14px',
        color: '#888',
        maxWidth: '400px',
        lineHeight: 1.6,
        margin: '0 0 40px',
      }}>
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>

      <Link
        href="/fr"
        style={{
          display: 'inline-block',
          padding: '0 40px',
          height: '46px',
          lineHeight: '46px',
          border: '1.5px solid #1a1a1a',
          color: '#1a1a1a',
          fontFamily: '"Montserrat", Helvetica, sans-serif',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#1a1a1a';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#1a1a1a';
        }}
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
