import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#F8F9FA]">
      <Container className="text-center">
        <h1 className="text-8xl font-bold text-[#D90429] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">
          Pagina Nu A Fost Găsită
        </h2>
        <p className="text-[#1F2937] mb-8 max-w-md mx-auto text-lg">
          Ne pare rău, pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button size="lg">
              <Home className="w-5 h-5 mr-2" />
              Acasă
            </Button>
          </Link>
          <Link href="/cars">
            <Button variant="outline" size="lg">
              <Search className="w-5 h-5 mr-2" />
              Caută Mașini
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
