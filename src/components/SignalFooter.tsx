import { motion, useReducedMotion } from "framer-motion";

export function SignalFooter() {
  const reduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <section id="signal" className="signal-footer" data-scroll-section aria-labelledby="signal-title">
      <div className="signal-footer__content">
        <div className="signal-footer__heading">
          <h2 id="signal-title">Just take the Pill</h2>
          <p>Collect. Conspire. Transcend.</p>
          <button
            className="glow-button glow-button--primary signal-footer__cta is-mint-soon"
            type="button"
            aria-disabled="true"
          >
            <span>Mint Soon</span>
          </button>
        </div>

        <motion.div
          className="signal-footer__art"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, x: "-50%", y: 38, scale: 0.96 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: "-50%", y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.34 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/assets/footer/paradox-footer-characters.png" alt="" />
        </motion.div>
      </div>

      <footer className="signal-footer__bar" aria-label="Footer">
        <p className="signal-footer__copyright">&copy; {year} Paradox. All rights reserved.</p>

        <nav className="signal-footer__socials" aria-label="Social links">
          <a href="https://x.com/javpixel_art" aria-label="X (Twitter)">
            <img src="/assets/brand/x-icon.svg" alt="" />
          </a>
          <a href="https://opensea.io/collection/paradox-by-javpixel" aria-label="OpenSea">
            <img src="/assets/brand/opensea-custom.svg" alt="" />
          </a>
        </nav>
      </footer>
    </section>
  );
}
