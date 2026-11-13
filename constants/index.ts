import { BodyType, FuelType } from "@/types";

// Brands present in data/cars.json (ADEME Car Labelling).
export const manufacturers = [
  "Alfa Romeo",
  "Alpine",
  "Audi",
  "BMW",
  "Citroen",
  "Cupra",
  "Dacia",
  "DS",
  "Ferrari",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Maserati",
  "Mazda",
  "Mercedes",
  "MG",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "Skoda",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

export const fuels: FuelType[] = [
  "petrol",
  "diesel",
  "hybrid",
  "plugin_hybrid",
  "electric",
  "alternative",
];

export const bodies: BodyType[] = [
  "suv",
  "sedan",
  "estate",
  "coupe",
  "convertible",
  "mpv",
  "van",
];

export const PAGE_SIZE = 12;
