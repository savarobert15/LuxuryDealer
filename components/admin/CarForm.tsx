"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createCar, updateCar } from "@/lib/actions/cars";
import { brands, fuelTypes, transmissions, categories } from "@/lib/constants";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Save, ArrowLeft, Plus, X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  category: string;
  description: string;
  images: string[];
  featured: boolean;
  isNew: boolean;
}

interface CarFormProps {
  car?: Car;
}

export default function CarForm({ car }: CarFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(car?.images || []);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImage = () => {
    const url = imageUrl.trim();
    if (url) {
      setImages((prev) => [...prev, url]);
      setImageUrl("");
    }
  };

  const removeImage = async (index: number) => {
    const url = images[index];
    setImages((prev) => prev.filter((_, i) => i !== index));

    // If it's a Vercel Blob URL, delete it from storage
    if (url.includes("vercel-storage.com")) {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    }
  };

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    setUploadError("");
    setUploading(true);

    const fileArray = Array.from(files);
    const urls: string[] = [];

    for (const file of fileArray) {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Eroare la încărcarea imaginii");
        break;
      }
      urls.push(data.url);
    }

    if (urls.length) {
      setImages((prev) => [...prev, ...urls]);
    }

    setUploading(false);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      uploadFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    formData.set("images", JSON.stringify(images));

    const result = car
      ? await updateCar(car.id, formData)
      : await createCar(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#D90429] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Înapoi la Dashboard
      </Link>

      <form
        action={handleSubmit}
        className="bg-white rounded-2xl p-8 shadow-md border border-[#E5E7EB]"
      >
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Input
            id="title"
            name="title"
            label="Titlu"
            placeholder="BMW M5 Competition 2024"
            defaultValue={car?.title}
            required
          />
          <Select
            id="brand"
            name="brand"
            label="Brand"
            defaultValue={car?.brand}
            placeholder="Selectează brand"
            options={brands.map((b) => ({ label: b, value: b }))}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Input
            id="model"
            name="model"
            label="Model"
            placeholder="M5 Competition"
            defaultValue={car?.model}
            required
          />
          <Input
            id="year"
            name="year"
            type="number"
            label="An fabricație"
            placeholder="2024"
            defaultValue={car?.year}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <Input
            id="price"
            name="price"
            type="number"
            label="Preț (€)"
            placeholder="125000"
            defaultValue={car?.price}
            required
          />
          <Input
            id="mileage"
            name="mileage"
            type="number"
            label="Rulaj (km)"
            placeholder="15000"
            defaultValue={car?.mileage}
            required
          />
          <Select
            id="category"
            name="category"
            label="Categorie"
            defaultValue={car?.category}
            placeholder="Selectează categorie"
            options={categories.map((c) => ({ label: c, value: c }))}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Select
            id="fuelType"
            name="fuelType"
            label="Combustibil"
            defaultValue={car?.fuelType}
            placeholder="Selectează tip"
            options={fuelTypes.map((f) => ({ label: f, value: f }))}
            required
          />
          <Select
            id="transmission"
            name="transmission"
            label="Transmisie"
            defaultValue={car?.transmission}
            placeholder="Selectează tip"
            options={transmissions.map((t) => ({ label: t, value: t }))}
            required
          />
        </div>

        <div className="mb-6">
          <Textarea
            id="description"
            name="description"
            label="Descriere"
            placeholder="Descriere detaliată a mașinii..."
            defaultValue={car?.description}
          />
        </div>

        {/* Images */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#1F2937] mb-3">
            Imagini vehicul
          </label>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center gap-2 h-32 rounded-xl border-2 border-dashed cursor-pointer transition-colors mb-4 ${
              dragOver
                ? "border-[#D90429] bg-red-50"
                : "border-[#E5E7EB] hover:border-[#D90429] hover:bg-gray-50"
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-6 h-6 text-[#D90429] animate-spin" />
                <span className="text-sm text-gray-500">Se încarcă...</span>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Trage imaginile aici sau <span className="text-[#D90429] font-medium">alege fișiere</span>
                </span>
                <span className="text-xs text-gray-400">JPEG, PNG, WebP, AVIF — max 10 MB / fișier</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {uploadError && (
            <p className="text-sm text-red-600 mb-3">{uploadError}</p>
          )}

          {/* URL input */}
          <div className="flex gap-2 mb-4">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
              placeholder="Sau adaugă URL imagine extern..."
              className="flex-1 px-4 py-3 rounded-lg border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#D90429] focus:outline-none"
            />
            <Button type="button" onClick={addImage} variant="secondary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Image previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group aspect-video rounded-lg overflow-hidden border border-[#E5E7EB] bg-gray-100"
                >
                  {img ? (
                    <Image
                      src={img}
                      alt={`Imagine ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-1 left-1 bg-[#D90429] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                      Principală
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-6 mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              value="true"
              defaultChecked={car?.featured}
              className="w-4 h-4 rounded border-gray-300 text-[#D90429] focus:ring-[#D90429]"
            />
            <span className="text-sm font-medium text-[#1F2937]">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isNew"
              value="true"
              defaultChecked={car?.isNew ?? true}
              className="w-4 h-4 rounded border-gray-300 text-[#D90429] focus:ring-[#D90429]"
            />
            <span className="text-sm font-medium text-[#1F2937]">Marcaj Nou</span>
          </label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading || uploading} size="lg">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Se salvează...
              </span>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                {car ? "Actualizează" : "Adaugă Mașina"}
              </>
            )}
          </Button>
          <Link href="/admin">
            <Button variant="ghost" type="button" size="lg">
              Anulează
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}


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
  category: string;
  description: string;
  images: string[];
  featured: boolean;
  isNew: boolean;
}

interface CarFormProps {
  car?: Car;
}

export default function CarForm({ car }: CarFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(car?.images || []);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addImage = () => {
    if (imageUrl.trim()) {
      setImages([...images, imageUrl.trim()]);
      setImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    formData.set("images", JSON.stringify(images));

    const result = car
      ? await updateCar(car.id, formData)
      : await createCar(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#D90429] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Înapoi la Dashboard
      </Link>

      <form
        action={handleSubmit}
        className="bg-white rounded-2xl p-8 shadow-md border border-[#E5E7EB]"
      >
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Input
            id="title"
            name="title"
            label="Titlu"
            placeholder="BMW M5 Competition 2024"
            defaultValue={car?.title}
            required
          />
          <Select
            id="brand"
            name="brand"
            label="Brand"
            defaultValue={car?.brand}
            placeholder="Selectează brand"
            options={brands.map((b) => ({ label: b, value: b }))}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Input
            id="model"
            name="model"
            label="Model"
            placeholder="M5 Competition"
            defaultValue={car?.model}
            required
          />
          <Input
            id="year"
            name="year"
            type="number"
            label="An fabricație"
            placeholder="2024"
            defaultValue={car?.year}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <Input
            id="price"
            name="price"
            type="number"
            label="Preț (€)"
            placeholder="125000"
            defaultValue={car?.price}
            required
          />
          <Input
            id="mileage"
            name="mileage"
            type="number"
            label="Rulaj (km)"
            placeholder="15000"
            defaultValue={car?.mileage}
            required
          />
          <Select
            id="category"
            name="category"
            label="Categorie"
            defaultValue={car?.category}
            placeholder="Selectează categorie"
            options={categories.map((c) => ({ label: c, value: c }))}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Select
            id="fuelType"
            name="fuelType"
            label="Combustibil"
            defaultValue={car?.fuelType}
            placeholder="Selectează tip"
            options={fuelTypes.map((f) => ({ label: f, value: f }))}
            required
          />
          <Select
            id="transmission"
            name="transmission"
            label="Transmisie"
            defaultValue={car?.transmission}
            placeholder="Selectează tip"
            options={transmissions.map((t) => ({ label: t, value: t }))}
            required
          />
        </div>

        <div className="mb-6">
          <Textarea
            id="description"
            name="description"
            label="Descriere"
            placeholder="Descriere detaliată a mașinii..."
            defaultValue={car?.description}
          />
        </div>

        {/* Images */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Imagini (URL-uri)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplu.com/imagine.jpg"
              className="flex-1 px-4 py-3 rounded-lg border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#D90429] focus:outline-none"
            />
            <Button type="button" onClick={addImage} variant="secondary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-[#F8F9FA] px-3 py-2 rounded-lg text-sm border border-[#E5E7EB]"
                >
                  <span className="max-w-[200px] truncate">{img}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-6 mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              value="true"
              defaultChecked={car?.featured}
              className="w-4 h-4 rounded border-gray-300 text-[#D90429] focus:ring-[#D90429]"
            />
            <span className="text-sm font-medium text-[#1F2937]">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isNew"
              value="true"
              defaultChecked={car?.isNew ?? true}
              className="w-4 h-4 rounded border-gray-300 text-[#D90429] focus:ring-[#D90429]"
            />
            <span className="text-sm font-medium text-[#1F2937]">Marcaj Nou</span>
          </label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} size="lg">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Se salvează...
              </span>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                {car ? "Actualizează" : "Adaugă Mașina"}
              </>
            )}
          </Button>
          <Link href="/admin">
            <Button variant="ghost" type="button" size="lg">
              Anulează
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
