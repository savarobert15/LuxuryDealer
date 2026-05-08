"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import Container from "./ui/Container";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Acasă" },
  { href: "/cars", label: "Mașini" },
  { href: "/despre-noi", label: "Despre Noi" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (phoneRef.current && !phoneRef.current.contains(e.target as Node)) {
        setPhoneOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top strip */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#D90429] h-8 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center sm:justify-between">
            {/* Email — hidden on mobile */}
            <a
              href="mailto:contact@luxurydealer.ro"
              className="hidden sm:flex items-center gap-1.5 text-white text-xs font-semibold tracking-wider hover:text-white/80 transition-colors"
            >
              <Mail className="w-3 h-3" />
              contact@luxurydealer.ro
            </a>
            {/* Phone — always visible, centered on mobile */}
            <div ref={phoneRef} className="relative">
              <button
                onClick={() => setPhoneOpen((o) => !o)}
                className="flex items-center gap-1.5 text-white text-xs font-semibold tracking-wider hover:text-white/80 transition-colors"
              >
                <Phone className="w-3 h-3" />
                +40 721 000 000
              </button>
              {phoneOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50 min-w-[180px]">
                  <a
                    href="tel:+40721000000"
                    onClick={() => setPhoneOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[#0A0A0A] text-xs font-semibold hover:bg-[#F8F9FA] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#D90429]" />
                    Apel Telefonic
                  </a>
                  <a
                    href="https://wa.me/40721000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setPhoneOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[#0A0A0A] text-xs font-semibold hover:bg-[#F8F9FA] transition-colors border-t border-gray-100"
                  >
                    <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
            {/* Address — hidden on mobile */}
            <span className="hidden sm:flex items-center gap-1.5 text-white text-xs font-medium tracking-wider">
              <MapPin className="w-3 h-3 shrink-0" />
              Str. Automobilului Nr. 1, București
            </span>
          </div>
      </div>

      {/* Main nav */}
      <nav
        className="fixed left-0 right-0 z-40 border-b border-white/10 bg-[#0A0A0A]"
        style={{ top: "2rem" }}
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <Image
                src="/logo luxury.png"
                alt="LuxuryDealer"
                width={180}
                height={64}
                className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>

            {/* Desktop links — centered */}
            <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-200 group"
                    style={{ color: active ? "#D90429" : "rgba(255,255,255,0.75)" }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] bg-[#D90429] transition-all duration-300"
                      style={{ width: active ? "100%" : "0%" }}
                    />
                    {/* hover underline via CSS group */}
                    <span className="absolute -bottom-1 left-0 h-[2px] bg-[#D90429] w-0 group-hover:w-full transition-all duration-300" />
                  </Link>
                );
              })}
            </div>

            {/* CTA right */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/cars"
                className="relative overflow-hidden group bg-transparent border border-[#D90429] text-[#D90429] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:text-white"
              >
                <span className="absolute inset-0 bg-[#D90429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative">Vezi Oferte</span>
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden text-white p-2 ml-auto"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed left-0 right-0 z-30 bg-[#0A0A0A] border-b border-white/10"
            style={{ top: "calc(2rem + 5rem)" }}
          >
            <Container className="py-8">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-4 border-b border-white/5 text-sm font-bold uppercase tracking-widest transition-colors"
                      style={{ color: active ? "#D90429" : "rgba(255,255,255,0.7)" }}
                    >
                      {link.label}
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-[#D90429]" />}
                    </Link>
                  );
                })}
                <Link
                  href="/cars"
                  onClick={() => setMobileOpen(false)}
                  className="mt-6 bg-[#D90429] text-white px-6 py-4 text-center font-bold text-sm uppercase tracking-widest hover:bg-[#b80324] transition-colors"
                >
                  Vezi Oferte
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
