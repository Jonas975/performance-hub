"use client";

import { useState } from "react";
import { useLocaleContext, type Locale } from "@/contexts/LocaleContext";
import { motion, AnimatePresence } from "framer-motion";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale, isReady } = useLocaleContext();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((lang) => lang.code === locale) || languages[0];

  if (!isReady) {
    return null; // Don't render until client-side is ready
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-bold text-xs sm:text-sm uppercase tracking-widest active:scale-95"
        aria-label="Change language"
      >
        <span className="text-base sm:text-lg">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-surface/95 backdrop-blur-lg border border-surface-light rounded-xl sm:rounded-2xl shadow-xl overflow-hidden z-50 min-w-max"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors active:scale-95 ${
                  locale === lang.code
                    ? "bg-accent-hover text-background"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <span className="text-lg sm:text-xl">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
