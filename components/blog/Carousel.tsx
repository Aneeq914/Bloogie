"use client";

import { Children, useState } from "react";

const Carousel = ({ children }: { children: React.ReactNode }) => {
  const count = Children.count(children);
  const [index, setIndex] = useState(0);

  const arrow =
    "absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white px-3 py-2 text-lg leading-none text-gray-700 shadow-sm transition hover:border-brand-500 hover:text-brand-600 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-700";

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {children}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIndex(index - 1)}
        disabled={index === 0}
        aria-label="Previous"
        className={`${arrow} left-2`}
      >
        ‹
      </button>

      <button
        type="button"
        onClick={() => setIndex(index + 1)}
        disabled={index === count - 1}
        aria-label="Next"
        className={`${arrow} right-2`}
      >
        ›
      </button>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-brand-600" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
