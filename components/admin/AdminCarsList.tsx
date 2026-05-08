"use client";

import { useState } from "react";
import { deleteCar } from "@/lib/actions/cars";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Edit, Trash2, Eye } from "lucide-react";

interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  fuelType: string;
  transmission: string;
  images: string[];
  featured: boolean;
  createdAt: Date;
}

export default function AdminCarsList({ cars }: { cars: Car[] }) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi această mașină?")) return;
    setDeleting(id);
    await deleteCar(id);
    setDeleting(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#E5E7EB] overflow-hidden">
      <div className="p-6 border-b border-[#E5E7EB]">
        <h2 className="text-xl font-bold text-[#0A0A0A]">
          Lista Mașini ({cars.length})
        </h2>
      </div>

      {cars.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-gray-500 text-lg">Nu există mașini încă.</p>
          <Link href="/admin/add">
            <Button className="mt-4">Adaugă Prima Mașină</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA]">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Mașină
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  An
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Preț
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Combustibil
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Acțiuni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {cars.map((car) => (
                <tr key={car.id} className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={car.images[0] || "/placeholder-car.svg"}
                          alt={car.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0A0A0A] text-sm">
                          {car.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {car.brand} {car.model}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#1F2937]">{car.year}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#D90429]">
                    {formatPrice(car.price)}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#1F2937]">
                    {car.fuelType}
                  </td>
                  <td className="px-6 py-4">
                    {car.featured ? (
                      <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-[#D90429]/10 text-[#D90429] rounded-full">
                        Featured
                      </span>
                    ) : (
                      <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/cars/${car.id}`}
                        className="p-2 text-gray-400 hover:text-[#D90429] transition-colors"
                        title="Vizualizează"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/edit/${car.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Editează"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(car.id)}
                        disabled={deleting === car.id}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Șterge"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
