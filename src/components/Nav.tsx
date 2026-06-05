'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <Link className="word" href="/" aria-label="Coride home">Coride</Link>
      <div className="navRight">
        <div className={`navLinks ${open ? 'navLinksOpen' : ''}`}>
          {/* Hidden until the destination pages exist — do not delete. */}
          {/* <a href="#" onClick={() => setOpen(false)}>For employers</a> */}
          {/* <a href="#" onClick={() => setOpen(false)}>For partners</a> */}
        </div>
        <button className="navCta">Join the waitlist</button>
        <div className="lang">
          <span className="on">EN</span>
          <span>LV</span>
        </div>
        <button
          className={`navBurger ${open ? 'navBurgerOpen' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
