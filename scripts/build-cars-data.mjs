// Builds data/cars.json from ADEME "Car Labelling": the official list of new
// cars sold in France (consumption, CO2, catalogue price...). No API key needed.
// Run: node scripts/build-cars-data.mjs
import { writeFileSync, mkdirSync } from "node:fs";

const URL =
  "https://data.ademe.fr/data-fair/api/v1/datasets/ademe-car-labelling/lines?size=10000";

const MAKE_NAMES = {
  "B.M.W.": "BMW",
  "M.G.": "MG",
  DS: "DS",
  MINI: "MINI",
  LAMBORGHIN: "Lamborghini",
  "ROLLS ROYC": "Rolls-Royce",
};

const FUEL = {
  ESSENCE: "petrol",
  GAZOLE: "diesel",
  "ESS+ELEC HNR": "hybrid",
  "GAZ+ELEC HNR": "hybrid",
  "ELEC+ESSENC HR": "plugin_hybrid",
  "ELEC+GAZOLE HR": "plugin_hybrid",
  ELECTRIC: "electric",
  SUPERETHANOL: "alternative",
  "ESS+G.P.L.": "alternative",
};

const BODY = {
  "TS TERRAINS/CHEMINS": "suv",
  BERLINE: "sedan",
  BREAK: "estate",
  COUPE: "coupe",
  CABRIOLET: "convertible",
  MONOSPACE: "mpv",
  "MONOSPACE COMPACT": "mpv",
  MINISPACE: "mpv",
  COMBISPACE: "van",
  MINIBUS: "van",
};

const titleCase = (s) =>
  s.toLowerCase().replace(/(^|[\s-])([a-zà-ÿ])/g, (m) => m.toUpperCase());

// "KANGOO" -> "Kangoo", but keep codes like "MX-30", "RX", "E-208" as-is.
const modelName = (s) =>
  s.replace(/\b[A-Z]{4,}\b/g, (w) => w[0] + w.slice(1).toLowerCase());

const round1 = (n) => Math.round(n * 10) / 10;

// Some ADEME labels are double-encoded UTF-8 ("SystÃ¨me" -> "Système").
// In a few, the second byte of "à" (a non-breaking space) became a plain space.
const fixEncoding = (s) =>
  s
    .replace(/[ÂÃ][\u0080-¿]/g, (m) => Buffer.from(m, "latin1").toString("utf8"))
    .replace(/Ã /g, "à ")
    .replace(/Â(\s|$)/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const res = await fetch(URL);
if (!res.ok) throw new Error(`ADEME API: HTTP ${res.status}`);
const { results } = await res.json();

const byKey = new Map();
for (const r of results) {
  const fuel = FUEL[r.Energie];
  const body = BODY[r.Carrosserie];
  if (!fuel || !body) continue;

  const version = fixEncoding(r.Description_Commerciale.trim());
  const hpFromName = version.match(/\((\d+)\s*ch\)/i);
  const kw = r.Puissance_maximale || r["Puissance_nominale_électrique"] || 0;

  const car = {
    id: r._id,
    make: MAKE_NAMES[r.Marque] ?? titleCase(r.Marque),
    model: modelName(r["Modèle"]),
    version,
    fuel,
    body,
    transmission: r.Type_de_boite === "MECANIQUE" ? "manual" : "automatic",
    power_hp: hpFromName ? Number(hpFromName[1]) : Math.round(kw * 1.36),
    consumption: r.Conso_vitesse_mixte_Min ? round1(r.Conso_vitesse_mixte_Min) : null,
    // Electric figures are sometimes only filled in the "Max" column.
    electric_consumption:
      r.Conso_elec_Min || r.Conso_elec_Max
        ? round1((r.Conso_elec_Min || r.Conso_elec_Max) / 10)
        : null,
    electric_range: Math.round(r.Autonomie_elec_Max || r.Autonomie_elec_Min || 0) || null,
    co2: Math.round(r.CO2_vitesse_mixte_Min || 0),
    weight: r["Poids_à_vide"] || r.Masse_OM_Min || null,
    price: r["Prix_véhicule"],
  };

  // ADEME lists one row per trim level; keep the cheapest per version.
  const key = [car.make, car.model, version, fuel, car.transmission].join("|");
  const existing = byKey.get(key);
  if (!existing || car.price < existing.price) byKey.set(key, car);
}

const cars = [...byKey.values()];

// Deterministic shuffle so unfiltered pages show a mix of brands.
let seed = 42;
const random = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
for (let i = cars.length - 1; i > 0; i--) {
  const j = Math.floor(random() * (i + 1));
  [cars[i], cars[j]] = [cars[j], cars[i]];
}

mkdirSync("data", { recursive: true });
writeFileSync("data/cars.json", JSON.stringify(cars));

const count = (field) =>
  cars.reduce((acc, c) => ((acc[c[field]] = (acc[c[field]] || 0) + 1), acc), {});
console.log(`${cars.length} cars written to data/cars.json`);
console.log("fuel:", count("fuel"));
console.log("body:", count("body"));
console.log("makes:", Object.keys(count("make")).sort().join(", "));
