import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CarForm from "@/components/admin/CarForm";

export const metadata: Metadata = {
  title: "Adaugă Mașină",
};

export default function AddCarPage() {
  return (
    <section className="py-8 bg-[#F8F9FA] min-h-screen">
      <Container className="max-w-4xl">
        <h1 className="text-3xl font-bold text-[#0A0A0A] mb-8">
          Adaugă Mașină Nouă
        </h1>
        <CarForm />
      </Container>
    </section>
  );
}
