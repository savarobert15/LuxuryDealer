"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { brands, fuelTypes, transmissions, categories, sortOptions } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function CarsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const current = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value) {
          current.set(key, value);
        } else {
          current.delete(key);
        }
      }
      current.delete("page"); // Reset page on filter change
      return current.toString();
    },
    [searchParams]
  );

  const handleFilter = (key: string, value: string) => {
    router.push(`/cars?${createQueryString({ [key]: value })}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilter("search", search);
  };

  const clearFilters = () => {
    setSearch("");
    router.push("/cars");
  };

  const hasFilters = searchParams.toString().length > 0;

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            placeholder="Caută mașină..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D90429] text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </form>

      {/* Sort */}
      <div>
        <label className="text-sm font-semibold text-[#0A0A0A] block mb-2">
          Sortare
        </label>
        <select
          value={searchParams.get("sort") || ""}
          onChange={(e) => handleFilter("sort", e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#D90429] focus:outline-none"
        >
          <option value="">Implicit</option>
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="text-sm font-semibold text-[#0A0A0A] block mb-2">
          Brand
        </label>
        <select
          value={searchParams.get("brand") || ""}
          onChange={(e) => handleFilter("brand", e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#D90429] focus:outline-none"
        >
          <option value="">Toate brandurile</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="text-sm font-semibold text-[#0A0A0A] block mb-2">
          Combustibil
        </label>
        <select
          value={searchParams.get("fuelType") || ""}
          onChange={(e) => handleFilter("fuelType", e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#D90429] focus:outline-none"
        >
          <option value="">Toate tipurile</option>
          {fuelTypes.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label className="text-sm font-semibold text-[#0A0A0A] block mb-2">
          Transmisie
        </label>
        <select
          value={searchParams.get("transmission") || ""}
          onChange={(e) => handleFilter("transmission", e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#D90429] focus:outline-none"
        >
          <option value="">Toate tipurile</option>
          {transmissions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-semibold text-[#0A0A0A] block mb-2">
          Categorie
        </label>
        <select
          value={searchParams.get("category") || ""}
          onChange={(e) => handleFilter("category", e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#D90429] focus:outline-none"
        >
          <option value="">Toate categoriile</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-semibold text-[#0A0A0A] block mb-2">
          Preț minim (€)
        </label>
        <input
          type="number"
          placeholder="0"
          value={searchParams.get("minPrice") || ""}
          onChange={(e) => handleFilter("minPrice", e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#D90429] focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-[#0A0A0A] block mb-2">
          Preț maxim (€)
        </label>
        <input
          type="number"
          placeholder="500000"
          value={searchParams.get("maxPrice") || ""}
          onChange={(e) => handleFilter("maxPrice", e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#D90429] focus:outline-none"
        />
      </div>

      {hasFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="w-4 h-4 mr-2" />
          Resetează Filtrele
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="lg:hidden flex items-center gap-2 mb-4 text-sm font-medium text-[#1F2937] bg-white px-4 py-2.5 rounded-lg border border-[#E5E7EB] shadow-sm"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtre
      </button>

      {/* Mobile filters */}
      {showMobileFilters && (
        <div className="lg:hidden bg-white rounded-2xl p-6 shadow-md mb-6">
          {filterContent}
        </div>
      )}

      {/* Desktop filters */}
      <div className="hidden lg:block bg-white rounded-2xl p-6 shadow-md sticky top-28">
        <h3 className="font-bold text-lg text-[#0A0A0A] mb-6 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#D90429]" />
          Filtre
        </h3>
        {filterContent}
      </div>
    </>
  );
}
