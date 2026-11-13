import { BodyType, FuelType } from "@/types";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";
export const LOCALE_COOKIE = "carhub-lang";

const fr = {
  meta: {
    title: "CarHub",
    description: "Trouvez et louez la voiture idéale",
  },
  nav: { signIn: "Connexion" },
  hero: {
    // \u00a0 (non-breaking space): French puts a space before "!", it must not break onto its own line.
    title: "Louez la voiture idéale, simplement\u00a0!",
    subtitle:
      "Simplifiez votre location de voiture grâce à notre réservation sans effort.",
    cta: "Voir les voitures",
  },
  home: {
    title: "Catalogue",
    subtitle: "Découvrez les voitures qui pourraient vous plaire",
    noResults: "Oups, aucun résultat",
    noResultsHint: "Essayez une autre marque, un autre modèle ou d'autres filtres.",
    showMore: "Voir plus",
  },
  search: {
    manufacturerPlaceholder: "Peugeot",
    modelPlaceholder: "208",
    emptyAlert: "Veuillez saisir une marque ou un modèle",
  },
  filters: { fuel: "Énergie", body: "Carrosserie" },
  card: { perDay: "/jour", viewMore: "Voir plus" },
  details: {
    make: "Marque",
    model: "Modèle",
    version: "Version",
    fuel: "Énergie",
    body: "Carrosserie",
    transmission: "Boîte de vitesses",
    power: "Puissance",
    consumption: "Consommation mixte",
    electric_consumption: "Consommation électrique",
    electric_range: "Autonomie électrique",
    co2: "Émissions de CO₂",
    weight: "Poids à vide",
    price: "Prix catalogue",
    close: "Fermer",
  },
  transmission: { automatic: "Automatique", manual: "Manuelle" },
  fuel: {
    petrol: "Essence",
    diesel: "Diesel",
    hybrid: "Hybride",
    plugin_hybrid: "Hybride rechargeable",
    electric: "Électrique",
    alternative: "E85 / GPL",
  } satisfies Record<FuelType, string>,
  body: {
    suv: "SUV / 4x4",
    sedan: "Berline",
    estate: "Break",
    coupe: "Coupé",
    convertible: "Cabriolet",
    mpv: "Monospace",
    van: "Ludospace / Minibus",
  } satisfies Record<BodyType, string>,
  footer: {
    rights: "Tous droits réservés",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    links: [
      {
        title: "À propos",
        links: ["Comment ça marche", "À la une", "Partenariats", "Relations entreprises"],
      },
      {
        title: "Entreprise",
        links: ["Événements", "Blog", "Podcast", "Inviter un ami"],
      },
      {
        title: "Réseaux",
        links: ["Discord", "Instagram", "Twitter", "Facebook"],
      },
    ],
  },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  meta: {
    title: "CarHub",
    description: "Find and rent the right car",
  },
  nav: { signIn: "Sign in" },
  hero: {
    title: "Find, book, or rent a car — quickly and easily!",
    subtitle:
      "Streamline your car rental experience with our effortless booking process.",
    cta: "Explore cars",
  },
  home: {
    title: "Car Catalogue",
    subtitle: "Explore the cars you might like",
    noResults: "Oops, no results",
    noResultsHint: "Try another manufacturer, model or filters.",
    showMore: "Show more",
  },
  search: {
    manufacturerPlaceholder: "Peugeot",
    modelPlaceholder: "208",
    emptyAlert: "Please enter a manufacturer or a model",
  },
  filters: { fuel: "Fuel", body: "Body type" },
  card: { perDay: "/day", viewMore: "View more" },
  details: {
    make: "Make",
    model: "Model",
    version: "Version",
    fuel: "Fuel",
    body: "Body type",
    transmission: "Gearbox",
    power: "Power",
    consumption: "Combined consumption",
    electric_consumption: "Electric consumption",
    electric_range: "Electric range",
    co2: "CO₂ emissions",
    weight: "Kerb weight",
    price: "List price",
    close: "Close",
  },
  transmission: { automatic: "Automatic", manual: "Manual" },
  fuel: {
    petrol: "Petrol",
    diesel: "Diesel",
    hybrid: "Hybrid",
    plugin_hybrid: "Plug-in hybrid",
    electric: "Electric",
    alternative: "E85 / LPG",
  },
  body: {
    suv: "SUV / 4x4",
    sedan: "Hatchback / Sedan",
    estate: "Estate",
    coupe: "Coupé",
    convertible: "Convertible",
    mpv: "MPV",
    van: "Van / Minibus",
  },
  footer: {
    rights: "All rights reserved",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    links: [
      {
        title: "About",
        links: ["How it works", "Featured", "Partnership", "Business Relations"],
      },
      {
        title: "Company",
        links: ["Events", "Blog", "Podcast", "Invite a friend"],
      },
      {
        title: "Socials",
        links: ["Discord", "Instagram", "Twitter", "Facebook"],
      },
    ],
  },
};

export const dictionaries: Record<Locale, Dictionary> = { fr, en };

export const isLocale = (value: unknown): value is Locale =>
  locales.includes(value as Locale);
