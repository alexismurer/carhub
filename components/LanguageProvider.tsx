"use client";

import { createContext, useContext } from "react";
import { Locale, dictionaries } from "@/i18n/dictionaries";

const LocaleContext = createContext<Locale>("fr");

export const LanguageProvider = ({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) => <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;

export const useLocale = () => useContext(LocaleContext);

export const useDictionary = () => dictionaries[useLocale()];
