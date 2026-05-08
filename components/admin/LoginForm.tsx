"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { LogIn } from "lucide-react";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form
      action={formAction}
      className="bg-[#1F2937] rounded-2xl p-8 shadow-2xl border border-white/10"
    >
      {state && "error" in state && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {state.error as string}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@luxurydealer.ro"
            required
            className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-gray-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
            Parolă
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      <Button type="submit" disabled={pending} size="lg" className="w-full mt-8">
        {pending ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Se autentifică...
          </span>
        ) : (
          <>
            <LogIn className="w-5 h-5 mr-2" />
            Autentificare
          </>
        )}
      </Button>
    </form>
  );
}
