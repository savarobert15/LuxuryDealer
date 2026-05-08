import prisma from "@/lib/prisma";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCars from "@/components/home/FeaturedCars";
import NewArrivals from "@/components/home/NewArrivals";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BrandsSection from "@/components/home/BrandsSection";
import CTASection from "@/components/home/CTASection";

export default async function HomePage() {
  const featuredCars = await prisma.car.findMany({
    where: { featured: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  const newArrivals = await prisma.car.findMany({
    where: { isNew: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  const fallbackCars = await prisma.car.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedCars cars={featuredCars.length > 0 ? featuredCars : fallbackCars} />
      <NewArrivals cars={newArrivals.length > 0 ? newArrivals : fallbackCars} />
      <TestimonialsSection />
      <BrandsSection />
      <CTASection />
    </>
  );
}
