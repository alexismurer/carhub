"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, locales } from "@/i18n/dictionaries";
import { useLocale } from "./LanguageProvider";

const LanguageSwitcher = () => {
  const current = useLocale();
  const router = useRouter();

  const switchTo = (locale: string) => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  return (
    <div className="flex rounded-full bg-white p-1 text-sm font-bold">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchTo(locale)}
          aria-pressed={locale === current}
          className={`rounded-full px-3 py-1 uppercase ${
            locale === current ? "bg-primary-blue text-white" : "text-primary-blue"
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
