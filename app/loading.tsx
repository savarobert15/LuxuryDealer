import CarCardSkeleton from "@/components/CarCardSkeleton";
import Container from "@/components/ui/Container";

export default function HomeLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="min-h-[90vh] bg-[#0A0A0A] animate-pulse" />

      {/* Stats skeleton */}
      <div className="py-20 bg-[#1F2937]">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center space-y-3 animate-pulse">
                <div className="w-10 h-10 bg-gray-600 rounded-full mx-auto" />
                <div className="h-8 bg-gray-600 rounded w-20 mx-auto" />
                <div className="h-4 bg-gray-600 rounded w-24 mx-auto" />
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Cars skeleton */}
      <div className="py-24 bg-[#F8F9FA]">
        <Container>
          <div className="text-center mb-16 space-y-3 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
