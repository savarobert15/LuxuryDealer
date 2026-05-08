"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/cars?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) =>
      p === 1 ||
      p === totalPages ||
      (p >= currentPage - 1 && p <= currentPage + 1)
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 rounded-lg border border-[#E5E7EB] hover:bg-[#D90429] hover:text-white hover:border-[#D90429] transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-[#E5E7EB]"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {visiblePages.map((page, idx) => {
        const prevPage = visiblePages[idx - 1];
        const showEllipsis = prevPage && page - prevPage > 1;

        return (
          <span key={page} className="flex items-center gap-2">
            {showEllipsis && <span className="px-1 text-gray-400">...</span>}
            <button
              onClick={() => goToPage(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                page === currentPage
                  ? "bg-[#D90429] text-white shadow-lg"
                  : "border border-[#E5E7EB] hover:bg-[#D90429] hover:text-white hover:border-[#D90429]"
              }`}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-lg border border-[#E5E7EB] hover:bg-[#D90429] hover:text-white hover:border-[#D90429] transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-[#E5E7EB]"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
