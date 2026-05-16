import { motion, useReducedMotion } from "framer-motion";
import { Instagram } from "lucide-react";

const footerLinks = [
  { label: "OG Collection", href: "#welcome" },
  { label: "Game", href: "#experience" },
  { label: "Cards", href: "#anatomy" },
  { label: "Codex", href: "#legacy" },
];

export function SignalFooter() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="signal" className="signal-footer" data-scroll-section aria-labelledby="signal-title">
      <div className="signal-footer__content">
        <div className="signal-footer__heading">
          <h2 id="signal-title">Take the Pill</h2>
          <p>Collect. Conspire. Transcend.</p>
          <button className="glow-button glow-button--primary signal-footer__cta" type="button">
            <span>Mint Now</span>
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

      <footer className="signal-footer__bar" aria-label="Footer navigation">
        <nav className="signal-footer__links" aria-label="Footer links">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="signal-footer__socials" aria-label="Social links">
          <a href="https://x.com" aria-label="X">
            X
          </a>
          <a href="https://discord.com" aria-label="Discord">
            Discord
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <Instagram size={17} aria-hidden="true" />
          </a>
        </nav>
      </footer>
    </section>
  );
}
