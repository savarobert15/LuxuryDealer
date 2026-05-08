"use client";

import { formatPrice, formatMileage } from "@/lib/utils";
import Button from "@/components/ui/Button";
import {
  Calendar,
  Fuel,
  Gauge,
  Settings,
  Tag,
  Car,
  Phone,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CarInfoProps {
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
    category: string;
  };
}

export default function CarInfo({ car }: CarInfoProps) {
  const specs = [
    { icon: Calendar, label: "An fabricație", value: String(car.year) },
    { icon: Gauge, label: "Rulaj", value: formatMileage(car.mileage) },
    { icon: Fuel, label: "Combustibil", value: car.fuelType },
    { icon: Settings, label: "Transmisie", value: car.transmission },
    { icon: Tag, label: "Categorie", value: car.category },
    { icon: Car, label: "Model", value: `${car.brand} ${car.model}` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-semibold text-[#D90429] uppercase tracking-widest mb-2">
        {car.brand}
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
        {car.title}
      </h1>
      <p className="text-4xl font-bold text-[#D90429] mb-8">
        {formatPrice(car.price)}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="bg-white rounded-xl p-4 border border-[#E5E7EB] flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-[#D90429]/10 rounded-lg flex items-center justify-center shrink-0">
              <spec.icon className="w-5 h-5 text-[#D90429]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{spec.label}</p>
              <p className="text-sm font-semibold text-[#0A0A0A]">
                {spec.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href={`/contact?car=${car.id}`} className="flex-1">
          <Button className="w-full" size="lg">
            <Phone className="w-5 h-5 mr-2" />
            Contactează-ne
          </Button>
        </Link>
        <Link href={`/contact?car=${car.id}&subject=Test Drive`} className="flex-1">
          <Button variant="outline" className="w-full" size="lg">
            <CalendarCheck className="w-5 h-5 mr-2" />
            Test Drive
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
