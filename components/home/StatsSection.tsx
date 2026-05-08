"use client";

import Link from "next/link";

const brands = [
  { name: "BMW",          logo: "https://cdn.simpleicons.org/bmw" },
  { name: "Mercedes-Benz",logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
  { name: "Audi",         logo: "https://cdn.simpleicons.org/audi" },
  { name: "Porsche",      logo: "https://cdn.simpleicons.org/porsche" },
  { name: "Ferrari",      logo: "https://cdn.simpleicons.org/ferrari" },
  { name: "Lamborghini",  logo: "https://cdn.simpleicons.org/lamborghini" },
  { name: "Bentley",      logo: "https://cdn.simpleicons.org/bentley" },
  { name: "Rolls-Royce",  logo: "https://cdn.simpleicons.org/rollsroyce" },
  { name: "Maserati",     logo: "https://cdn.simpleicons.org/maserati" },
  { name: "Tesla",        logo: "https://cdn.simpleicons.org/tesla" },
  { name: "McLaren",      logo: "https://cdn.simpleicons.org/mclaren" },
  { name: "Aston Martin", logo: "https://cdn.simpleicons.org/astonmartin" },
];

export default function StatsSection() {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-12 bg-[#0A0A0A] border-t border-white/10 overflow-hidden">
      {/* Label */}
      <p className="text-center text-[#D90429] text-xs font-bold uppercase tracking-[0.4em] mb-8">
        Branduri Disponibile
      </p>

      {/* Marquee track */}
      <div className="animate-marquee-pause relative">
        {/* Left/right fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent" />

        <div className="flex animate-marquee gap-4">
          {doubled.map((brand, i) => (
            <Link
              key={i}
              href={`/cars?brand=${encodeURIComponent(brand.name)}`}
              className="group flex-shrink-0 flex flex-col items-center gap-3 px-8 py-5 border border-white/10 hover:border-[#D90429] hover:bg-white/5 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-lg flex items-center justify-center p-2 group-hover:shadow-lg group-hover:shadow-[#D90429]/20 transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-white/40 group-hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
