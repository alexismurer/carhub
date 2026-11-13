"use client";

import { useState } from "react";
import Image from "next/image";

interface CarImageProps {
  src: string;
  alt: string;
}

// Car render with a pulsing placeholder until the image arrives.
// Must be placed inside a `relative` container with a fixed height.
const CarImage = ({ src, alt }: CarImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div
          className="absolute inset-0 flex-center animate-pulse"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 64 32"
            className="h-1/2 max-h-20 text-primary-blue opacity-20"
            fill="currentColor"
          >
            <path d="M10 20c0-1 1-2 2-3l6-6c2-2 4-3 7-3h12c3 0 5 1 7 3l5 5 7 1c3 1 4 3 4 5v3c0 1-1 2-2 2h-4a6 6 0 0 0-12 0H22a6 6 0 0 0-12 0H6c-1 0-2-1-2-2v-2c0-2 2-3 6-3Zm11-8-4 5h12v-6h-5c-1 0-2 0-3 1Zm11-1v6h12l-3-4c-1-1-2-2-4-2h-5Z" />
            <circle cx="16" cy="26" r="4" />
            <circle cx="48" cy="26" r="4" />
          </svg>
        </div>
      )}
      {/* IMAGIN serves WebP at the requested width, so skip Next's optimizer
          (it would download the full-size image and re-encode it). */}
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`object-contain transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
};

export default CarImage;
