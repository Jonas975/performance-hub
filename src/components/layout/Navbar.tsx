"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react"; 
import SpringWrapper from "@/components/animations/SpringWrapper";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslations";

const navLinksBase = [
  { labelKey: "nav.shop", href: "/shop" },
  { labelKey: "nav.reviews", href: "/reviews" },
  { labelKey: "nav.blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const shop = useTranslation('nav.shop');
  const reviews = useTranslation('nav.reviews');
  const blog = useTranslation('nav.blog');
  
  const navLinks = [
    { label: shop, href: "/shop" },
    { label: reviews, href: "/reviews" },
    { label: blog, href: "/blog" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 32);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-surface bg-background/80 backdrop-blur-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-bold uppercase tracking-wider text-foreground group"
        >
          Performance<span className="text-accent-hover transition-all group-hover:brightness-110">Hub</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium uppercase tracking-wide transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent-hover after:transition-all hover:after:w-full ${
                    isActive ? "text-accent-hover after:w-full shadow-[0_4px_10px_-2px_rgba(20,184,166,0.3)]" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Icons (Ohne Badges/Zahlen) */}
        <div className="hidden md:flex items-center gap-4">
          <SpringWrapper hoverScale={1.1} tapScale={0.9}>
            <Link href="/wishlist" className={`transition-colors ${pathname === '/wishlist' ? 'text-accent-hover' : 'text-muted hover:text-foreground'}`} title="Wunschliste">
              <Heart size={22} strokeWidth={1.5} />
            </Link>
          </SpringWrapper>
          <LanguageSwitcher />
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-0 top-full border-b border-surface bg-background/95 backdrop-blur-lg md:hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-base font-medium uppercase tracking-wide transition-colors ${
                      pathname === link.href ? "text-accent-hover" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <hr className="border-surface my-2" />
              <li className="flex justify-around py-2">
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className={pathname === '/wishlist' ? "text-accent-hover" : "text-muted"}><Heart size={24} /></Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}