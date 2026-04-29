"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "en" | "de" | "fr" | "es";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isReady: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const STORAGE_KEY = "performance-hub-locale";
const DEFAULT_LOCALE: Locale = "en";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [isReady, setIsReady] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && ["en", "de", "fr", "es"].includes(saved)) {
      setLocaleState(saved);
    }
    setIsReady(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    if (["en", "de", "fr", "es"].includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem(STORAGE_KEY, newLocale);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isReady }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return context;
}
