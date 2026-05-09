'use client'

interface ShareButtonProps {
  title: string;
  text?: string;
}

export default function ShareButton({ title, text }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, text, url: window.location.href }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  return (
    <button onClick={handleShare} aria-label="Partager" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', display: 'flex', alignItems: 'center' }}>
      <svg id="Groupe_19" data-name="Groupe 19" viewBox="0 0 14.74 11.76" fill="currentColor" width="22px" aria-hidden="true">
        <defs>
          <clipPath id="clippath"><rect width="14.74" height="11.76" fill="none" /></clipPath>
        </defs>
        <g clipPath="url(#clippath)">
          <path d="M14.26,4.79L9.29.18c-.27-.25-.68-.23-.93.04-.11.12-.18.28-.18.45v2.16S.49,1.96,0,10.87c-.01.24.17.44.4.45.14,0,.28-.05.36-.16,1.05-1.35,3.29-3.1,7.41-2.24v2.18c0,.36.3.66.66.66.17,0,.33-.06.45-.18l4.98-4.61c.6-.56.64-1.5.08-2.1-.03-.03-.05-.05-.08-.08" />
        </g>
      </svg>
    </button>
  );
}
