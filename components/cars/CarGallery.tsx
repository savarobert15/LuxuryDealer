"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarGalleryProps {
  images: string[];
  title: string;
}

export default function CarGallery({ images, title }: CarGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayImages = images.length > 0 ? images : ["/placeholder-car.svg"];

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? displayImages.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === displayImages.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={displayImages[activeIndex]}
              alt={`${title} - imagine ${activeIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {displayImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-[#0A0A0A]" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-5 h-5 text-[#0A0A0A]" />
            </button>
          </>
        )}
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                idx === activeIndex
                  ? "border-[#D90429] shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
