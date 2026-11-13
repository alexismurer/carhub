// Server-only: imports the full dataset, so never import this from a client component.
import { CarProps, FilterProps } from "@/types";
import cars from "@/data/cars.json";

export async function fetchCars(filters: FilterProps): Promise<CarProps[]> {
  const manufacturer = filters.manufacturer.toLowerCase();
  const model = filters.model.toLowerCase();

  return (cars as CarProps[])
    .filter(
      (car) =>
        (!manufacturer || car.make.toLowerCase() === manufacturer) &&
        (!model || `${car.model} ${car.version}`.toLowerCase().includes(model)) &&
        (!filters.fuel || car.fuel === filters.fuel) &&
        (!filters.body || car.body === filters.body)
    )
    .slice(0, filters.limit);
}
