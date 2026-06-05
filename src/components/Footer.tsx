import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footMain">
        <div className="footBrand">
          <Link className="footWord" href="/" aria-label="Coride home">Coride</Link>
          <a className="footEmail" href="mailto:info@coride.org">info@coride.org</a>
        </div>
        <nav className="footLegal" aria-label="Legal">
          <span className="footColLabel">Legal</span>
          <a href="/privacy">Privacy policy</a>
          <a href="/legal">Legal info</a>
        </nav>
      </div>

      <div className="footBar">
        <span className="footCopy">© 2026 Coride</span>
        <div className="footBarRight">
          <div className="lang">
            <span className="on">EN</span>
            <span>LV</span>
          </div>
        </div>
      </div>

      <div className="footSupport">
        <span className="footSupportLabel">Supported by</span>
        <Image
          className="footRtu"
          src="/assets/rtu-logo.png"
          alt="RTU Innovations"
          width={530}
          height={343}
        />
      </div>
    </footer>
  );
}
