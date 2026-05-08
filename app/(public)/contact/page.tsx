import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează-ne pentru orice informație. Echipa noastră de experți auto te așteaptă.",
};

export default function ContactPage() {
  return (
    <section className="py-8 md:py-12 bg-[#F8F9FA] min-h-screen">
      <Container>
        <div className="text-center mb-8 md:mb-16">
          <span className="text-[#D90429] font-semibold text-sm uppercase tracking-widest">
            Contactează-ne
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0A0A0A] mt-3">
            Suntem Aici pentru Tine
          </h1>
          <p className="text-[#1F2937] mt-4 max-w-2xl mx-auto text-lg">
            Completează formularul și echipa noastră te va contacta în cel mai
            scurt timp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E5E7EB]">
              <h3 className="font-bold text-lg text-[#0A0A0A] mb-6">
                Informații Contact
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#D90429]/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#D90429]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A0A0A] text-sm">
                      Adresă
                    </p>
                    <p className="text-sm text-gray-500">
                      Str. Automobilului Nr. 1, București, România
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#D90429]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#D90429]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A0A0A] text-sm">
                      Telefon
                    </p>
                    <p className="text-sm text-gray-500">+40 721 000 000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#D90429]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#D90429]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A0A0A] text-sm">
                      Email
                    </p>
                    <p className="text-sm text-gray-500">
                      contact@luxurydealer.ro
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#D90429]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#D90429]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A0A0A] text-sm">
                      Program
                    </p>
                    <p className="text-sm text-gray-500">Luni - Vineri: 9:00 - 19:00</p>
                    <p className="text-sm text-gray-500">Sâmbătă: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-[#1F2937] rounded-2xl h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MapPin className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
