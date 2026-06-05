import { HeroLines } from './HeroLines';

export function Hero() {
  return (
    <header className="hero">
      {/* Desktop colored lines — verbatim from the 1440×920 design frame.
           Green from the top gutter, orange from the right, blue from the
           bottom-left, hub beneath the phone. The frame is a fixed 1440×920
           box anchored to the right edge so the geometry tracks the
           right-anchored phone across all desktop widths (overflow clips left). */}
      <div className="heroNet" aria-hidden="true">
        <svg viewBox="0 0 1440 920" fill="none" preserveAspectRatio="none">
          {/* Green: drops from the top gutter → down → hub */}
          <path d="M836,-20 V820 H1130" stroke="#0CA64A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          {/* Orange: in from the right → down the right margin → hub */}
          <path d="M1462,300 H1344 V820 H1130" stroke="#F26B1F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          {/* Blue: from the bottom-left → hub */}
          <path d="M-20,866 H1130 V820" stroke="#1B4FCF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          {/* Stub from phone bottom down to the hub */}
          <path d="M1130,784 V820" stroke="#1f1f1f" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="1130" cy="784" r="5.5" fill="#fff" stroke="#1f1f1f" strokeWidth="3" />
          <circle cx="1130" cy="820" r="9" fill="#fff" stroke="#1f1f1f" strokeWidth="3" />
        </svg>
      </div>

      <div className="heroContent">
        <h1>Earn perks for the commute you already make.</h1>
        <p className="heroSub">
          Join your workplace community on Coride. Share your daily commute with colleagues, spend
          less getting to work and earn rewards from local partners along the way.
        </p>
        <div className="ctaRow">
          <button className="btnPrimary">
            Get early access <span className="arr">→</span>
          </button>
          <button className="btnGhost">
            <span className="ico">↓</span> How it works
          </button>
        </div>
        <p className="traction">
          <strong>First pilots with several employers launching later this year.</strong> Get your early access.
        </p>
      </div>

      {/* Mobile & tablet colored lines — computed at runtime so they hug the
           fixed-size phone (see HeroLines.tsx). Desktop uses the static SVG above. */}
      <HeroLines />

      {/* Phone mockup placeholder */}
      <div className="appFrame">
        <div className="notch" />
        <div className="appScreen">
          <div className="appPhGrid" />
          <div className="appPhStop" />
          <div className="appPhLabel">App preview</div>
          <div className="appPhNote">{'// screen design - coming'}</div>
        </div>
      </div>
    </header>
  );
}
