"use client";

import { formatPrice, formatMileage } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Fuel, Gauge, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CarCardProps {
  car: {
    id: string;
    title: string;
    brand: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
    fuelType: string;
    transmission: string;
    images: string[];
    isNew?: boolean;
  };
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/cars/${car.id}`} className="group block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#E5E7EB]">
          <div className="relative h-56 overflow-hidden">
            <Image
              src={car.images[0] || "/placeholder-car.svg"}
              alt={car.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {car.isNew && (
              <span className="absolute top-4 left-4 bg-[#D90429] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                Nou
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-semibold text-[#D90429] uppercase tracking-wider">
                  {car.brand}
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mt-1 group-hover:text-[#D90429] transition-colors">
                  {car.title}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-[#1F2937]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#D90429]" />
                <span>{car.year}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-[#D90429]" />
                <span>{formatMileage(car.mileage)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Fuel className="w-4 h-4 text-[#D90429]" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-[#D90429]" />
                <span>{car.transmission}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
              <p className="text-2xl font-bold text-[#D90429]">
                {formatPrice(car.price)}
              </p>
              <span className="text-sm font-medium text-[#1F2937] group-hover:text-[#D90429] transition-colors flex items-center gap-1">
                Detalii →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
