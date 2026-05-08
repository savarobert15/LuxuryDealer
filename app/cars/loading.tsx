import CarCardSkeleton from "@/components/CarCardSkeleton";
import Container from "@/components/ui/Container";

export default function CarsLoading() {
  return (
    <section className="py-12 bg-[#F8F9FA] min-h-screen">
      <Container>
        <div className="mb-10">
          <div className="h-10 bg-gray-200 rounded w-64 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-48 mt-3 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded" />
              ))}
            </div>
          </aside>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CarCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
