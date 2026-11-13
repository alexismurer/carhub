import { cookies } from "next/headers";
import { LOCALE_COOKIE, Locale, defaultLocale, dictionaries, isLocale } from "./dictionaries";

export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export function getDictionary() {
  return dictionaries[getLocale()];
}
