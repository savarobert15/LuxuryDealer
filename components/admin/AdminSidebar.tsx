"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Tag, LayoutDashboard, LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/add", label: "Adaugă Mașină", icon: Car },
  { href: "/admin/brands", label: "Branduri", icon: Tag },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-[#0A0A0A] min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <p className="text-white font-black text-lg tracking-tight">LUXURY<span className="text-[#D90429]">DEALER</span></p>
        <p className="text-white/40 text-xs mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? "bg-[#D90429] text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <link.icon className="w-4 h-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/50 hover:text-white hover:bg-white/5 transition-all w-full"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Deconectare
          </button>
        </form>
      </div>
    </aside>
  );
}
