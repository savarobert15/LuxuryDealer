"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-r from-[#D90429] to-[#b80324] relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Pregătit pentru Mașina Visurilor Tale?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-lg mb-10 max-w-xl mx-auto"
          >
            Contactează-ne astăzi și descoperă ofertele noastre exclusive.
            Echipa noastră te așteaptă!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="!bg-white !text-[#D90429] hover:!bg-gray-100 shadow-xl"
              >
                Contactează-ne
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="tel:+40721000000">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#D90429]"
              >
                <Phone className="w-5 h-5 mr-2" />
                +40 721 000 000
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
