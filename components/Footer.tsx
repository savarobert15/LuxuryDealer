import Link from "next/link";
import Image from "next/image";
import Container from "./ui/Container";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-gray-400 border-t border-white/10">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo luxury.png"
                alt="LuxuryDealer"
                width={160}
                height={60}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              Dealer auto premium cu cele mai exclusiviste mașini. Experiență de
              lux la fiecare pas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Navigare</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Acasă" },
                { href: "/cars", label: "Mașini" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Branduri</h3>
            <ul className="space-y-3">
              {["BMW", "Mercedes-Benz", "Audi", "Porsche", "Ferrari"].map(
                (brand) => (
                  <li key={brand}>
                    <Link
                      href={`/cars?brand=${encodeURIComponent(brand)}`}
                      className="hover:text-white transition-colors text-sm"
                    >
                      {brand}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D90429] mt-0.5 shrink-0" />
                <span className="text-sm">
                  Str. Automobilului Nr. 1, București, România
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D90429] shrink-0" />
                <span className="text-sm">+40 721 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D90429] shrink-0" />
                <span className="text-sm">contact@luxurydealer.ro</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} LuxuryDealer. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Politica de Confidențialitate
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Termeni și Condiții
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
