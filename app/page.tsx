import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from "@/components";
import { fetchCars } from "@/utils/cars";
import { PAGE_SIZE, bodies, fuels } from "@/constants";
import { HomeProps } from "@/types";
import { getDictionary } from "@/i18n/server";

export default async function Home({ searchParams }: HomeProps) {
  const t = getDictionary();
  const limit = Number(searchParams.limit) || PAGE_SIZE;

  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    model: searchParams.model || "",
    fuel: searchParams.fuel || "",
    body: searchParams.body || "",
    limit: limit + 1, // one extra to know whether there is a next page
  });

  const hasMore = allCars.length > limit;
  const cars = allCars.slice(0, limit);

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">{t.home.title}</h1>
          <p>{t.home.subtitle}</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter
              title="fuel"
              options={[
                { title: t.filters.fuel, value: "" },
                ...fuels.map((fuel) => ({ title: t.fuel[fuel], value: fuel })),
              ]}
            />
            <CustomFilter
              title="body"
              options={[
                { title: t.filters.body, value: "" },
                ...bodies.map((body) => ({ title: t.body[body], value: body })),
              ]}
            />
          </div>
        </div>

        {cars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            <ShowMore pageNumber={limit / PAGE_SIZE} isNext={hasMore} />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">{t.home.noResults}</h2>
            <p>{t.home.noResultsHint}</p>
          </div>
        )}
      </div>
    </main>
  );
}
