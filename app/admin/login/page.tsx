import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 mt-2">
            Autentifică-te pentru acces la dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
