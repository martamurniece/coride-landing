'use client';

export function Nav() {
  return (
    <nav className="nav">
      <span className="word">
        Coride
      </span>
      <div className="navRight">
        <div className="navLinks">
          <a href="#">For employers</a>
          <a href="#">For partners</a>
        </div>
        <button className="navCta">Join the waitlist</button>
        <div className="lang">
          <span className="on">EN</span>
          <span>LV</span>
        </div>
      </div>
    </nav>
  );
}
