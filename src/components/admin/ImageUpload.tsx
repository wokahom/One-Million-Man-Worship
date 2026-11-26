"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImagePlus, Check } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  folder = "blog",
  label = "Cover Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file format", {
        description: "Please select an image file (PNG, JPG, WEBP).",
      });
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Image size must be under 8MB.",
      });
      return;
    }

    setUploading(true);
    try {
      if (!storage) {
        throw new Error("Firebase Storage is not initialized.");
      }

      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const storageRef = ref(storage, `${folder}/${Date.now()}_${cleanFileName}`);

      await uploadBytes(storageRef, file, {
        contentType: file.type,
      });

      const downloadURL = await getDownloadURL(storageRef);
      onChange(downloadURL);
      toast.success("Image uploaded to Firebase successfully!");
    } catch (err: unknown) {
      console.error("Firebase upload error:", err);
      toast.error("Upload failed", {
        description: (err as Error).message || "Could not upload image to Firebase Storage.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-400">{label}</label>

      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9] max-h-56 group">
          <Image src={value} alt="Uploaded image" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="bg-slate-900 border-slate-700 text-white text-xs"
            >
              Change Photo
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onChange("")}
              className="text-xs"
            >
              <X className="w-3.5 h-3.5 mr-1" /> Remove
            </Button>
          </div>
          <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-emerald-400 flex items-center gap-1 border border-emerald-500/30">
            <Check className="w-3 h-3" /> Uploaded to Firebase
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            dragActive
              ? "border-amber-400 bg-amber-500/10"
              : "border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
              <p className="text-xs text-amber-400 font-semibold">
                Uploading to Firebase Storage...
              </p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ImagePlus className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">
                  Click or drag an image here to upload
                </p>
                <p className="text-xs text-slate-500">
                  Uploads directly to Firebase Storage (PNG, JPG, WEBP up to 8MB)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
