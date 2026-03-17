"use client";

import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "./TikTokIcon";
import SpringWrapper from "@/components/animations/SpringWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";

const footerLinks = [
  { label: "Reviews", href: "/products" },
  { label: "Software", href: "/blog" },
  { label: "Community", href: "/about" },
  { label: "Privacy", href: "#" },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "TikTok", href: "#", icon: SiTiktok },
  { label: "YouTube", href: "#", icon: Youtube },
];

export default function Footer() {
  return (
    <ScrollReveal>
      <footer className="border-t border-surface bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Brand + tagline */}
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="font-display text-lg font-bold uppercase tracking-wider text-foreground"
              >
                Performance<span className="text-accent-hover">Hub</span>
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Curated fitness products for athletes who demand the best.
                Every recommendation backed by real testing.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-foreground">
                Navigate
              </h3>
              <ul className="flex flex-col gap-2.5">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-accent-hover"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter + socials */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-foreground">
                  Stay in the loop
                </h3>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 rounded-full border border-surface-light bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <SpringWrapper hoverScale={1.06} tapScale={0.95}>
                    <button
                      type="submit"
                      className="rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-accent-hover"
                    >
                      Join
                    </button>
                  </SpringWrapper>
                </form>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <SpringWrapper key={social.label} hoverScale={1.15} tapScale={0.9}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-light text-muted transition-colors hover:border-accent hover:text-accent-hover"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  </SpringWrapper>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-surface pt-6 text-center text-xs text-muted">
            © {new Date().getFullYear()} PerformanceHub. All rights reserved.
          </div>
        </div>
      </footer>
    </ScrollReveal>
  );
}
