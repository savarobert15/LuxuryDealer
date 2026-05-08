"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContact } from "@/lib/actions/contact";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Send, CheckCircle } from "lucide-react";

function contactAction(_prevState: unknown, formData: FormData) {
  return submitContact(formData);
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(contactAction, null);
  const searchParams = useSearchParams();
  const carId = searchParams.get("car") || "";
  const defaultSubject = searchParams.get("subject") || "";

  if (state && "success" in state && state.success) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-md border border-[#E5E7EB] text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">
          Mesaj Trimis!
        </h3>
        <p className="text-gray-500">
          Îți mulțumim! Echipa noastră te va contacta în curând.
        </p>
      </div>
    );
  }

  const errors = state && "details" in state ? (state.details as Record<string, string[]>) : {};

  return (
    <form
      action={formAction}
      className="bg-white rounded-2xl p-8 shadow-md border border-[#E5E7EB]"
    >
      <h3 className="font-bold text-xl text-[#0A0A0A] mb-6">
        Trimite un Mesaj
      </h3>

      {state && "error" in state && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {state.error as string}
        </div>
      )}

      <input type="hidden" name="carId" value={carId} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <Input
          id="name"
          name="name"
          label="Nume complet"
          placeholder="Ion Popescu"
          required
          error={errors.name?.[0]}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="ion@exemplu.ro"
          required
          error={errors.email?.[0]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Telefon"
          placeholder="+40 721 000 000"
          required
          error={errors.phone?.[0]}
        />
        <Input
          id="subject"
          name="subject"
          label="Subiect"
          placeholder="Interes mașină / Test Drive"
          defaultValue={defaultSubject}
          required
          error={errors.subject?.[0]}
        />
      </div>

      <div className="mb-6">
        <Textarea
          id="message"
          name="message"
          label="Mesaj"
          placeholder="Scrie mesajul tău aici..."
          required
          error={errors.message?.[0]}
        />
      </div>

      <Button type="submit" disabled={pending} size="lg" className="w-full">
        {pending ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Se trimite...
          </span>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Trimite Mesajul
          </>
        )}
      </Button>
    </form>
  );
}
