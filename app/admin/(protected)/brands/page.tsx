import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import BrandsList from "@/components/admin/BrandsList";
import { Tag } from "lucide-react";

export const metadata: Metadata = { title: "Admin - Branduri" };

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-[#D90429]/10 rounded-xl flex items-center justify-center">
            <Tag className="w-5 h-5 text-[#D90429]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0A0A0A]">Gestionare Branduri</h1>
        </div>
        <p className="text-gray-500 text-sm ml-13">Adaugă, editează sau șterge branduri auto.</p>
      </div>
      <BrandsList brands={brands} />
    </div>
  );
}
