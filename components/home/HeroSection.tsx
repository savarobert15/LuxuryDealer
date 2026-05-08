"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SKEW = 80; // px — diagonal cut width

const panels = [
  {
    img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1000&q=90",
    label: "SUPERCAR",
    // starts at 0, extends to 33.33% + SKEW
    // clip: top-right corner pushed left by SKEW at bottom
    style: {
      left: 0,
      width: `calc(33.33% + ${SKEW}px)`,
      clipPath: `polygon(0 0, 100% 0, calc(100% - ${SKEW}px) 100%, 0 100%)`,
    },
    labelPos: "16%",
  },
  {
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1000&q=90",
    label: "PERFORMANCE",
    // starts at 33.33%, extends to 66.66% + SKEW, left SKEW offset at top
    style: {
      left: "33.33%",
      width: `calc(33.34% + ${SKEW}px)`,
      clipPath: `polygon(${SKEW}px 0, 100% 0, calc(100% - ${SKEW}px) 100%, 0 100%)`,
    },
    labelPos: "50%",
  },
  {
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=90",
    label: "LUXURY",
    // starts at 66.66%, extends to 100%, left SKEW offset at top
    style: {
      left: "66.66%",
      right: 0,
      width: "auto",
      clipPath: `polygon(${SKEW}px 0, 100% 0, 100% 100%, 0 100%)`,
    },
    labelPos: "83%",
  },
];

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#0A0A0A]">
      {/* Panels — each sized to its own region so image fills it properly */}
      {panels.map((panel, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: i * 0.15, ease: "easeOut" }}
          className="absolute top-0 bottom-0"
          style={panel.style}
        >
          {/* Image fills only this panel */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${panel.img}')` }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0A0A0A]/45" />
          {/* Panel label */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 + i * 0.1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/25 text-xs font-bold tracking-[0.4em] uppercase whitespace-nowrap pointer-events-none select-none"
          >
            {panel.label}
          </motion.span>
        </motion.div>
      ))}

      {/* Lightning-edge glows at cut lines — diagonal to match panel cuts */}
      {["33.33%", "66.66%"].map((base, i) => (
        <div
          key={i}
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            clipPath: `polygon(
              calc(${base} + ${SKEW}px) 0%,
              calc(${base} + ${SKEW + 2}px) 0%,
              calc(${base} + 2px) 100%,
              ${base} 100%
            )`,
            background:
              "linear-gradient(to bottom, transparent 0%, #D90429 50%, transparent 100%)",
          }}
        />
      ))}

      {/* Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-transparent to-[#0A0A0A]/65 pointer-events-none" />

      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-[#D90429] text-xs font-bold tracking-[0.5em] uppercase mb-6"
        >
          Dealer Auto Premium
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="text-5xl md:text-8xl font-black text-white leading-none tracking-tight"
        >
          LUXURY
          <br />
          <span className="text-[#D90429]">DEALER</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-gray-400 text-sm md:text-base mt-6 max-w-xs"
        >
          Performanță. Eleganță. Exclusivitate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex gap-4 mt-10"
        >
          <Link
            href="/cars"
            className="flex items-center gap-2 bg-[#D90429] text-white px-8 py-3.5 font-bold text-sm uppercase tracking-widest hover:bg-[#b80324] transition-colors"
          >
            Vezi Colecția
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 font-bold text-sm uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all"
          >
            Test Drive
          </Link>
        </motion.div>
      </div>

      {/* Bottom red line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D90429] to-transparent pointer-events-none"
      />
    </section>
  );
}

