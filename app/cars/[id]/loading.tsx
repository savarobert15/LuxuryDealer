import Container from "@/components/ui/Container";

export default function CarDetailLoading() {
  return (
    <section className="py-12 bg-[#F8F9FA] min-h-screen">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
          <div className="h-96 bg-gray-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-10 bg-gray-200 rounded w-1/3" />
            <div className="grid grid-cols-2 gap-4 mt-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-lg" />
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <div className="h-12 bg-gray-200 rounded-lg flex-1" />
              <div className="h-12 bg-gray-200 rounded-lg flex-1" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
