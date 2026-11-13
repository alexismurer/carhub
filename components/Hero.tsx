"use client";

import Image from "next/image";
import CustomButton from "./CustomButton";
import { useDictionary } from "./LanguageProvider";

const Hero = () => {
  const t = useDictionary();

  const handleScroll = () => {
    document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">{t.hero.title}</h1>
        <p className="hero__subtitle">{t.hero.subtitle}</p>

        <CustomButton
          title={t.hero.cta}
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image
            src="/hero.png"
            alt="hero"
            fill
            priority
            sizes="(min-width: 1280px) 60vw, 90vw"
            className="object-contain"
          />
        </div>
        <div className="hero__image-overlay" aria-hidden="true">
          {/* Fixed 3:5 ratio, so the chevron keeps its angles at any size. */}
          <svg
            viewBox="0 0 60 100"
            preserveAspectRatio="none"
            className="hero__image-overlay-point"
          >
            <path d="M57 0H60V100H17L0.6 46.6Q0 45 0.6 43.4Z" />
          </svg>
          <div className="hero__image-overlay-fill" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
