"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";

import { CarProps } from "@/types";
import {
  MODAL_ANGLES,
  formatNumber,
  formatPrice,
  generateCarImageUrl,
} from "@/utils";
import CarImage from "./CarImage";
import { useDictionary, useLocale } from "./LanguageProvider";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const t = useDictionary();
  const locale = useLocale();
  const num = (value: number) => formatNumber(value, locale);
  const name = `${car.make} ${car.model}`;

  const specs: [string, string | null][] = [
    [t.details.make, car.make],
    [t.details.model, car.model],
    [t.details.version, car.version],
    [t.details.fuel, t.fuel[car.fuel]],
    [t.details.body, t.body[car.body]],
    [t.details.transmission, t.transmission[car.transmission]],
    [t.details.power, `${car.power_hp} ch`],
    [t.details.consumption, car.consumption != null ? `${num(car.consumption)} L/100 km` : null],
    [t.details.electric_consumption, car.electric_consumption != null ? `${num(car.electric_consumption)} kWh/100 km` : null],
    [t.details.electric_range, car.electric_range != null ? `${num(car.electric_range)} km` : null],
    [t.details.co2, `${car.co2} g/km`],
    [t.details.weight, car.weight != null ? `${num(car.weight)} kg` : null],
    [t.details.price, formatPrice(car.price, locale)],
  ];

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                    type="button"
                    onClick={closeModal}
                  >
                    <Image
                      src="/close.svg"
                      alt={t.details.close}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>

                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      {/* Same URL as the card image, so it is already cached. */}
                      <CarImage src={generateCarImageUrl(car)} alt={name} />
                    </div>
                    <div className="flex gap-3">
                      {MODAL_ANGLES.map((angle) => (
                        <div
                          key={angle}
                          className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg"
                        >
                          <CarImage
                            src={generateCarImageUrl(car, angle, 400)}
                            alt={name}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl">{name}</h2>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {specs.filter(([, value]) => value !== null).map(([label, value]) => (
                        <div
                          className="flex justify-between gap-5 w-full text-right"
                          key={label}
                        >
                          <h4 className="text-grey">{label}</h4>
                          <p className="text-black-100 font-semibold">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
