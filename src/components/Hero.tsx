export function Hero() {
  return (
    <header className="hero">
      {/* Network lines behind the phone */}
      <div className="heroNet" aria-hidden="true">
        <svg viewBox="0 0 720 920" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d="M200,-20 V50 L300,150" stroke="#1B4FCF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M410,-20 V150" stroke="#0CA64A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M610,-20 V50 L510,150" stroke="#F26B1F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="200" cy="20" r="5.5" fill="#fff" stroke="#1B4FCF" strokeWidth="3" />
          <circle cx="410" cy="44" r="5.5" fill="#fff" stroke="#0CA64A" strokeWidth="3" />
          <circle cx="410" cy="104" r="5.5" fill="#fff" stroke="#0CA64A" strokeWidth="3" />
          <circle cx="610" cy="20" r="5.5" fill="#fff" stroke="#F26B1F" strokeWidth="3" />
        </svg>
      </div>

      <div className="heroContent">
        <h1>Skip traffic. Earn perks. Co-ride with colleagues.</h1>
        <p className="heroSub">
          Join verified communities going on the same routes as you. Drive together and earn perks
          from our local partners and get back your commute costs - or even earn extra.
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

      {/* Phone mockup placeholder */}
      <div className="appFrame">
        <div className="notch" />
        <div className="appScreen">
          <div className="appPhGrid" />
          <div className="appPhStop" />
          <div className="appPhLabel">App preview</div>
          <div className="appPhNote">// screen design - coming</div>
        </div>
      </div>
    </header>
  );
}
