"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import {
  MODAL_ANGLES,
  calculateCarRent,
  formatNumber,
  generateCarImageUrl,
} from "@/utils";
import CarDetails from "./CarDetails";
import CarImage from "./CarImage";
import { useDictionary, useLocale } from "./LanguageProvider";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useDictionary();
  const locale = useLocale();
  const { make, model, version, transmission, power_hp, consumption, electric_consumption } = car;

  const carRent = calculateCarRent(car.price);

  // Warm the browser cache with the modal's 3 views before it opens.
  const preloadedRef = useRef(false);
  const preloadDetails = () => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;
    for (const angle of MODAL_ANGLES) {
      new window.Image().src = generateCarImageUrl(car, angle, 400);
    }
  };
  const usage =
    consumption != null
      ? `${formatNumber(consumption, locale)} L/100km`
      : electric_consumption != null
        ? `${formatNumber(electric_consumption, locale)} kWh/100km`
        : "—";

  return (
    <div
      className="car-card group"
      onMouseEnter={preloadDetails}
      onFocus={preloadDetails}
      onTouchStart={preloadDetails}
    >
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="w-full truncate text-[14px] text-grey" title={version}>
        {version}
      </p>

      <p className="flex mt-6 text-[32px] font-extrabold">
        {locale === "en" && (
          <span className="self-start text-[14px] font-semibold">€</span>
        )}
        {carRent}
        <span className="self-end text-[14px] font-medium">
          {locale === "fr" && " €"}
          {t.card.perDay}
        </span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <CarImage src={generateCarImageUrl(car)} alt={`${make} ${model}`} />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt=""
            />
            <p className="text-[14px]">{t.transmission[transmission]}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="" />
            <p className="text-[14px]">{power_hp} ch</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="" />
            <p className="text-[14px]">{usage}</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title={t.card.viewMore}
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
