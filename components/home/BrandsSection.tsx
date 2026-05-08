"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const brandsList = [
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Porsche",
  "Ferrari",
  "Lamborghini",
  "Bentley",
  "Rolls-Royce",
  "Maserati",
  "Tesla",
];

export default function BrandsSection() {
  return (
    <section className="py-20 bg-white border-t border-[#E5E7EB]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#D90429] font-semibold text-sm uppercase tracking-widest">
            Parteneri
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mt-3">
            Branduri Premium
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brandsList.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="px-6 py-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] hover:border-[#D90429] hover:shadow-lg transition-all cursor-pointer"
            >
              <span className="text-[#1F2937] font-semibold text-lg">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
