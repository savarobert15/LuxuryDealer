import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Niciun fișier trimis" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Tip de fișier invalid. Sunt acceptate: JPEG, PNG, WebP, AVIF" },
      { status: 400 }
    );
  }

  const maxSize = 10 * 1024 * 1024; // 10 MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: "Fișierul depășește limita de 10 MB" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `cars/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const blob = await put(filename, file, { access: "public" });

  return NextResponse.json({ url: blob.url });
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { url } = await request.json();
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "URL lipsă" }, { status: 400 });
  }

  // Only allow deleting blobs from our own store
  if (!url.includes("vercel-storage.com") && !url.includes("blob.vercel-storage.com")) {
    return NextResponse.json({ error: "URL invalid" }, { status: 400 });
  }

  await del(url);
  return NextResponse.json({ success: true });
}
