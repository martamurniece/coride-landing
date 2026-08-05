'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

type LenisWindow = Window & { __lenis?: Lenis };

/**
 * Smooth wheel scrolling via Lenis, plus reliable same-page hash navigation.
 *
 * Lenis's built-in `anchors: true` can no-op (or fight the browser) when the
 * resolved URL pathname/search doesn't match exactly — which showed up on the
 * live site while localhost worked. We handle `#…` clicks ourselves and scroll
 * through Lenis when it's running.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const win = window as LenisWindow;

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href?.startsWith('#') || href.length < 2) return;

      const target = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!target) return;

      event.preventDefault();
      if (win.__lenis) {
        win.__lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth' });
      }
      history.pushState(null, '', href);
    };

    document.addEventListener('click', onAnchorClick);

    if (reduced.matches) {
      return () => document.removeEventListener('click', onAnchorClick);
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      autoRaf: true,
      // Handled by onAnchorClick above.
      anchors: false,
    });
    win.__lenis = lenis;

    return () => {
      document.removeEventListener('click', onAnchorClick);
      delete win.__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
