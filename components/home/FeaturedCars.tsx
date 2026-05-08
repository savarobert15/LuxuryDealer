"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import CarCard from "@/components/CarCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export default function FeaturedCars({ cars }: { cars: Car[] }) {
  return (
    <section className="py-12 md:py-24 bg-[#F8F9FA]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-[#D90429] font-semibold text-sm uppercase tracking-widest">
            Colecția Noastră
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mt-3">
            Best Sellers
          </h2>
          <p className="text-[#1F2937] mt-4 max-w-2xl mx-auto text-lg">
            Cele mai populare automobile din showroom-ul nostru
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/cars">
            <Button variant="secondary" size="lg">
              Vezi Toate Mașinile
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
