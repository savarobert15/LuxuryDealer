"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alexandru Popescu",
    role: "Proprietar BMW M5",
    content:
      "Experiență extraordinară! Echipa LuxuryDealer m-a ajutat să găsesc mașina perfectă. Profesionalism de top și servicii impecabile.",
    rating: 5,
  },
  {
    name: "Maria Ionescu",
    role: "Proprietar Mercedes GLE",
    content:
      "Am cumpărat deja 3 mașini de la LuxuryDealer. Întotdeauna oferă cele mai bune prețuri și condiții de garanție excelente.",
    rating: 5,
  },
  {
    name: "Andrei Vasile",
    role: "Proprietar Porsche 911",
    content:
      "De la primul contact până la livrare, totul a fost perfect. Recomand cu încredere oricui caută un dealer de încredere.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D90429] font-semibold text-sm uppercase tracking-widest">
            Testimoniale
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Ce Spun Clienții
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Peste 500+ clienți mulțumiți ne recomandă
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1F2937] rounded-2xl p-8 relative"
            >
              <Quote className="w-10 h-10 text-[#D90429] mb-4 opacity-50" />
              <p className="text-gray-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#D90429] text-[#D90429]"
                  />
                ))}
              </div>
              <div>
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
