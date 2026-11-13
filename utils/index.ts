import { CarProps } from "@/types";
import { Locale } from "@/i18n/dictionaries";

// Daily rental price in euros, derived from the car's catalogue price:
// €20 base + €1 per €1,000 of list price (e.g. a €30k car is €50/day).
export const calculateCarRent = (price: number) => Math.round(20 + price / 1000);

export const formatNumber = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    maximumFractionDigits: 1,
  }).format(value);

export const formatPrice = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

// IMAGIN renders a given angle on first request (can take ~2s), then serves it from its CDN.
export const MODAL_ANGLES = ["29", "33", "13"]; // front, top, rear

export const generateCarImageUrl = (
  car: CarProps,
  angle?: string,
  width = 800
) => {
  const { make, model } = car;

  const url = new URL("https://cdn.imagin.studio/getimage");

  // "img" is IMAGIN.studio's public demo key (watermarked). The old
  // "hrjavascript-mastery" key was revoked and only returns a placeholder.
  url.searchParams.append("customer", "img");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("width", `${width}`);
  if (angle) url.searchParams.append("angle", angle);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  if (value) {
    searchParams.set(type, value);
  } else {
    searchParams.delete(type);
  }

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
