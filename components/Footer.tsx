import Link from "next/link";

export default function Footer() {
  return (
    <footer className="lp-footer-wrap">
      <div className="lp-footer">
        <div className="lp-footer-card">
          <div className="lp-footer-cols">
            <div className="lp-footer-col">
              <div className="lbl">Categories</div>
              <Link href="/sections?cat=Hero">Hero</Link>
              <Link href="/sections?cat=FAQ">FAQ</Link>
              <Link href="/sections?cat=Header">Headers</Link>
              <Link href="/sections?cat=Footer">Footers</Link>
            </div>
            <div className="lp-footer-col">
              <div className="lbl">Use with</div>
              <a href="#">Claude</a>
              <a href="#">Lovable</a>
              <a href="#">Shopify</a>
              <a href="#">Webflow</a>
            </div>
            <div className="lp-footer-col">
              <div className="lbl">Company</div>
              <a href="#">About</a>
              <Link href="/docs">Docs</Link>
              <a href="#">License</a>
            </div>
          </div>
          <div className="lp-footer-wordmark">
            layout<span>.</span>page
          </div>
        </div>
      </div>
      <div className="lp-footer-bar">
        <span>© 2026 layout.page</span>
        <span className="r">Made for marketers and designers</span>
      </div>
    </footer>
  );
}
