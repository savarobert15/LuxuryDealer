import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { Award, Users, Car, Shield, CheckCircle } from "lucide-react";
import StatsCounter from "@/components/despre-noi/StatsCounter";

export const metadata: Metadata = {
  title: "Despre Noi",
  description:
    "Aflați mai multe despre LuxuryDealer — dealer auto premium din București cu peste 10 ani de experiență în vânzarea vehiculelor de lux.",
};

const values = [
  {
    icon: Award,
    title: "Excelență",
    description:
      "Oferim doar vehicule certificate și verificate riguros, garantând calitatea fiecărei mașini din showroom-ul nostru.",
  },
  {
    icon: Users,
    title: "Experiență Personalizată",
    description:
      "Fiecare client primește atenție individuală. Echipa noastră de experți te ghidează pas cu pas în alegerea vehiculului ideal.",
  },
  {
    icon: Shield,
    title: "Transparență Totală",
    description:
      "Nu există costuri ascunse. Îți oferim toate detaliile despre istoricul vehiculului, starea tehnică și prețul corect.",
  },
  {
    icon: Car,
    title: "Colecție Exclusivă",
    description:
      "Stocul nostru cuprinde cele mai căutate modele premium — de la sedan-uri elegante la supercaruri de performanță.",
  },
];

const team = [
  {
    name: "Alexandru Popescu",
    role: "Director General",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Maria Ionescu",
    role: "Consultant Auto Senior",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Andrei Constantin",
    role: "Specialist Finanțare",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

export default function DespreNoiPage() {
  return (
    <main className="bg-[#F8F9FA] min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#0A0A0A] py-20 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 to-[#0A0A0A]" />
        <Container className="relative z-10 text-center">
          <span className="text-[#D90429] font-semibold text-sm uppercase tracking-widest">
            Cine Suntem
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white mt-4 leading-none">
            DESPRE <span className="text-[#D90429]">NOI</span>
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Pasiunea pentru automobile de lux transformată într-o experiență de
            neegalat pentru fiecare client.
          </p>
        </Container>
      </section>

      {/* Stats */}
      <StatsCounter />

      {/* Povestea noastră */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#D90429] font-semibold text-sm uppercase tracking-widest">
                Povestea Noastră
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mt-3 mb-6">
                Peste un Deceniu de Pasiune pentru Excelență
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                LuxuryDealer a luat naștere în 2014 din dorința de a oferi
                clienților din România acces la cele mai exclusiviste vehicule
                din lume, însoțit de un serviciu impecabil.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                De-a lungul anilor, am construit relații de lungă durată cu
                importatori și dealeri din întreaga Europă, asigurând astfel o
                selecție diversă și autentică de automobile premium.
              </p>
              <ul className="space-y-3">
                {[
                  "Verificare tehnică completă pentru fiecare vehicul",
                  "Finanțare personalizată cu rate avantajoase",
                  "Service autorizat post-vânzare",
                  "Garanție extinsă disponibilă",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#1F2937] font-medium">
                    <CheckCircle className="w-5 h-5 text-[#D90429] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
                alt="Showroom LuxuryDealer"
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Valori */}
      <section className="py-12 md:py-24 bg-white border-t border-[#E5E7EB]">
        <Container>
          <div className="text-center mb-16">
            <span className="text-[#D90429] font-semibold text-sm uppercase tracking-widest">
              Valorile Noastre
            </span>
            <h2 className="text-4xl font-bold text-[#0A0A0A] mt-3">
              De Ce Să Alegi LuxuryDealer
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-[#F8F9FA] rounded-2xl p-8 border border-[#E5E7EB] hover:border-[#D90429] hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-[#D90429]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#D90429] transition-colors">
                  <v.icon className="w-6 h-6 text-[#D90429] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Echipa */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <span className="text-[#D90429] font-semibold text-sm uppercase tracking-widest">
              Echipa Noastră
            </span>
            <h2 className="text-4xl font-bold text-[#0A0A0A] mt-3">
              Experții Tăi Auto
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-transparent group-hover:border-[#D90429] transition-all shadow-lg"
                />
                <h3 className="font-bold text-[#0A0A0A] text-lg">
                  {member.name}
                </h3>
                <p className="text-[#D90429] text-sm font-semibold uppercase tracking-wider mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
