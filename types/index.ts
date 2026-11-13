import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export type FuelType =
  | "petrol"
  | "diesel"
  | "hybrid"
  | "plugin_hybrid"
  | "electric"
  | "alternative";

export type BodyType =
  | "suv"
  | "sedan"
  | "estate"
  | "coupe"
  | "convertible"
  | "mpv"
  | "van";

export interface CarProps {
  id: string;
  make: string;
  model: string;
  version: string;
  fuel: FuelType;
  body: BodyType;
  transmission: "automatic" | "manual";
  power_hp: number; // ch
  consumption: number | null; // L/100 km (WLTP mixed)
  electric_consumption: number | null; // kWh/100 km
  electric_range: number | null; // km
  co2: number; // g/km
  weight: number | null; // kg
  price: number; // catalogue price, €
}

export interface FilterProps {
  manufacturer: string;
  model: string;
  fuel: string;
  body: string;
  limit: number;
}

export interface HomeProps {
  searchParams: Partial<Record<keyof FilterProps, string>>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}
