"use client";

import { useState } from "react";
import { createBrand, updateBrand, deleteBrand } from "@/lib/actions/brands";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  logo: string;
  country: string;
}

export default function BrandsList({ brands }: { brands: Brand[] }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest brand?")) return;
    setDeleting(id);
    await deleteBrand(id);
    setDeleting(null);
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const res = await createBrand(new FormData(form));
    if (res?.error) { setError(res.error); return; }
    setAdding(false);
    setError("");
    form.reset();
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const res = await updateBrand(id, new FormData(e.currentTarget));
    if (res?.error) { setError(res.error); return; }
    setEditing(null);
    setError("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#E5E7EB] overflow-hidden">
      <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0A0A0A]">Branduri ({brands.length})</h2>
        <button
          onClick={() => { setAdding(true); setError(""); }}
          className="flex items-center gap-2 bg-[#D90429] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#b80324] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Brand Nou
        </button>
      </div>

      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Add form */}
      {adding && (
        <div className="p-6 border-b border-[#E5E7EB] bg-[#F8F9FA]">
          <form onSubmit={handleCreate} className="flex flex-wrap gap-3 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Nume *</label>
              <input name="name" required placeholder="ex: Audi" className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D90429]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Logo URL</label>
              <input name="logo" placeholder="https://..." className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D90429] w-64" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Țara</label>
              <input name="country" placeholder="ex: Germania" className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D90429]" />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex items-center gap-1.5 bg-[#D90429] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#b80324] transition-colors">
                <Check className="w-4 h-4" /> Salvează
              </button>
              <button type="button" onClick={() => { setAdding(false); setError(""); }} className="flex items-center gap-1.5 border border-[#E5E7EB] text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                <X className="w-4 h-4" /> Anulează
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8F9FA]">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Brand</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Țara</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Logo</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Acțiuni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {brands.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">Nu există branduri. Adaugă primul brand.</td>
              </tr>
            )}
            {brands.map((brand) => (
              <tr key={brand.id} className="hover:bg-[#F8F9FA] transition-colors">
                {editing === brand.id ? (
                  <td colSpan={4} className="px-6 py-4">
                    <form onSubmit={(e) => handleUpdate(e, brand.id)} className="flex flex-wrap gap-3 items-end">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Nume *</label>
                        <input name="name" defaultValue={brand.name} required className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D90429]" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Logo URL</label>
                        <input name="logo" defaultValue={brand.logo} placeholder="https://..." className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D90429] w-64" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Țara</label>
                        <input name="country" defaultValue={brand.country} placeholder="ex: Germania" className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D90429]" />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="flex items-center gap-1.5 bg-[#D90429] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#b80324] transition-colors">
                          <Check className="w-4 h-4" /> Salvează
                        </button>
                        <button type="button" onClick={() => { setEditing(null); setError(""); }} className="flex items-center gap-1.5 border border-[#E5E7EB] text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                          <X className="w-4 h-4" /> Anulează
                        </button>
                      </div>
                    </form>
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {brand.logo && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={brand.logo} alt={brand.name} className="w-8 h-8 object-contain rounded bg-gray-50 p-1" />
                        )}
                        <span className="font-semibold text-[#0A0A0A]">{brand.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{brand.country || "—"}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs truncate max-w-[200px]">{brand.logo || "—"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditing(brand.id); setError(""); }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id)}
                          disabled={deleting === brand.id}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
