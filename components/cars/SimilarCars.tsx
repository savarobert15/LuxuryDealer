"use client";

import { motion } from "framer-motion";
import CarCard from "@/components/CarCard";

interface Car {
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
}

export default function SimilarCars({ cars }: { cars: Car[] }) {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-[#0A0A0A] mb-8"
      >
        Mașini Similare
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
