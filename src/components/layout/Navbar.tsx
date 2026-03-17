"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import SpringWrapper from "@/components/animations/SpringWrapper";

const navLinks = [
  { label: "Reviews", href: "/products" },
  { label: "Software", href: "/blog" },
  { label: "Community", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 32);
  });

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-surface bg-background/80 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-bold uppercase tracking-wider text-foreground"
        >
          Performance<span className="text-accent-hover">Hub</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent-hover after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <SpringWrapper hoverScale={1.06} tapScale={0.96}>
            <Link
              href="/products"
              className="inline-flex items-center rounded-full bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-accent-hover"
            >
              Top Picks
            </Link>
          </SpringWrapper>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-x-0 top-full border-b border-surface bg-background/95 backdrop-blur-lg md:hidden"
        >
          <ul className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium uppercase tracking-wide text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-accent-hover"
              >
                Top Picks
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
