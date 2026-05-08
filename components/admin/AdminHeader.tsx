"use client";

import Link from "next/link";
import { Car, MessageSquare, Tag } from "lucide-react";

interface AdminHeaderProps {
  totalCars: number;
  totalContacts: number;
  totalBrands: number;
}

export default function AdminHeader({ totalCars, totalContacts, totalBrands }: AdminHeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0A0A0A]">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm">Bun venit în panoul de administrare.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#D90429]/10 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-[#D90429]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A0A0A]">{totalCars}</p>
              <p className="text-sm text-gray-500">Total Mașini</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A0A0A]">{totalContacts}</p>
              <p className="text-sm text-gray-500">Mesaje Contact</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A0A0A]">{totalBrands}</p>
              <p className="text-sm text-gray-500">Branduri</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
