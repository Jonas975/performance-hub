"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { SiTiktok } from "./TikTokIcon";
import SpringWrapper from "@/components/animations/SpringWrapper";
import { useTranslation } from "@/hooks/useTranslations";

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "TikTok", href: "#", icon: SiTiktok },
  { label: "YouTube", href: "#", icon: Youtube },
];

export default function Footer() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const tagline = useTranslation('footer.tagline');
  const stayInLoop = useTranslation('footer.stayInLoop');
  const join = useTranslation('footer.join');
  const affiliate = useTranslation('footer.affiliate');

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollY]);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-t border-surface bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
        {/* Grid auf 2 Spalten angepasst, da Navigate entfernt wurde */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 md:grid-cols-2">
          
          {/* Brand + tagline */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-display text-xl sm:text-2xl font-black uppercase tracking-tighter text-foreground w-fit"
            >
              Performance<span className="text-accent-hover">Hub</span>
            </Link>
            <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-muted">
              {tagline}
            </p>
          </div>

          {/* Newsletter + socials */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-[10px] sm:text-xs font-black uppercase tracking-widest text-foreground">
                {stayInLoop}
              </h3>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-full border border-surface-light bg-surface px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <SpringWrapper hoverScale={1.06} tapScale={0.95}>
                  <button
                    type="submit"
                    className="rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:bg-accent-hover active:scale-95 whitespace-nowrap"
                  >
                    {join}
                  </button>
                </SpringWrapper>
              </form>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <SpringWrapper key={social.label} hoverScale={1.15} tapScale={0.9}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-surface-light text-muted transition-colors hover:border-accent hover:text-accent-hover active:scale-95"
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                </SpringWrapper>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar with affiliate disclosure */}
        <div className="mt-8 sm:mt-12 border-t border-surface pt-4 sm:pt-6">
          <div className="text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted mb-2 sm:mb-3">
            © {new Date().getFullYear()} PerformanceHub. All rights reserved.
          </div>
          <div className="text-center text-[8px] sm:text-[9px] leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            {affiliate}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}