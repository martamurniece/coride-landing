'use client';

import { useState, useEffect } from 'react';
import { RouteOverlay } from './RouteOverlay';
import { RouteOverlayMobile } from './RouteOverlayMobile';

const DESKTOP_BP = 770;

export function RouteSwitch() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= DESKTOP_BP);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isDesktop ? <RouteOverlay /> : <RouteOverlayMobile />;
}
