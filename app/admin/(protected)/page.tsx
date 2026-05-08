import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import Container from "@/components/ui/Container";
import AdminCarsList from "@/components/admin/AdminCarsList";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboard() {
  const [cars, totalCars, totalContacts, totalBrands] = await Promise.all([
    prisma.car.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.car.count(),
    prisma.contact.count(),
    prisma.brand.count(),
  ]);

  return (
    <div className="p-8">
      <AdminHeader totalCars={totalCars} totalContacts={totalContacts} totalBrands={totalBrands} />
      <AdminCarsList cars={cars} />
    </div>
  );
}
