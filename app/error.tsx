"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#F8F9FA]">
      <Container className="text-center">
        <h1 className="text-6xl font-bold text-[#D90429] mb-4">Oops!</h1>
        <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">
          Ceva Nu A Mers Bine
        </h2>
        <p className="text-[#1F2937] mb-8 max-w-md mx-auto text-lg">
          {error.message || "A apărut o eroare neașteptată. Te rugăm să încerci din nou."}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={reset} size="lg">
            <RefreshCw className="w-5 h-5 mr-2" />
            Încearcă Din Nou
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              <Home className="w-5 h-5 mr-2" />
              Acasă
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
