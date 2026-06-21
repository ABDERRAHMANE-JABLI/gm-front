'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const CLASS = 'nav-loading';

export default function NavigationCursor() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove(CLASS);
  }, [pathname]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `html.${CLASS}, html.${CLASS} * { cursor: progress !important; }`;
    document.head.appendChild(style);

    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (anchor.target === '_blank') return;

      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname) return;

      document.documentElement.classList.add(CLASS);
      setTimeout(() => document.documentElement.classList.remove(CLASS), 5000);
    }

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      style.remove();
    };
  }, []);

  return null;
}
