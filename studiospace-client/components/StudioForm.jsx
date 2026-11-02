"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "@/lib/upload";

export const CATEGORIES = ["Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite", "Workshop"];
export const AMENITIES = ["Wi-Fi", "Air Conditioning", "Parking", "Green Screen", "Lighting Kit", "Soundproofing", "Microphones", "Changing Room", "Props", "Kitchenette", "Backdrops", "Restroom"];

export default function StudioForm({ initial = {}, user, submitLabel, onSubmit }) {
  const [image, setImage] = useState(initial.image || "");
  const [amenities, setAmenities] = useState(initial.amenities || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try { setImage(await uploadImage(file)); toast.success("Image uploaded"); }
    catch (err) { toast.error(err.message); }
    finally { setUploading(false); }
  };

  const toggle = (a) => setAmenities((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]));

  const submit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please add a cover image");
    const f = new FormData(e.target);
    const payload = {
      title: f.get("title"), category: f.get("category"),
      hourlyRate: Number(f.get("hourlyRate")), securityDeposit: Number(f.get("securityDeposit")),
      capacity: Number(f.get("capacity")), location: f.get("location"), image,
      gallery: f.get("gallery").split("\n").map((s) => s.trim()).filter(Boolean),
      amenities, overview: f.get("overview"), ownerPhoto: user?.image || "",
    };
    setSaving(true);
    try { await onSubmit(payload); } catch (err) { toast.error(err.message); } finally { setSaving(false); }
  };

  return (
    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
      <input name="title" required defaultValue={initial.title} placeholder="Studio title" className="input input-bordered w-full md:col-span-2" />
      <select name="category" required defaultValue={initial.category || ""} className="select select-bordered w-full">
        <option value="" disabled>Select category</option>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <input name="location" required defaultValue={initial.location} placeholder="Location / address" className="input input-bordered w-full" />
      <input name="hourlyRate" type="number" min="1" required defaultValue={initial.hourlyRate} placeholder="Hourly rate ($)" className="input input-bordered w-full" />
      <input name="securityDeposit" type="number" min="0" required defaultValue={initial.securityDeposit} placeholder="Security deposit ($)" className="input input-bordered w-full" />
      <input name="capacity" type="number" min="1" required defaultValue={initial.capacity} placeholder="Max capacity" className="input input-bordered w-full" />
      <div className="md:col-span-2">
        <label className="label-text">Cover image (upload or paste URL)</label>
        <div className="flex flex-col sm:flex-row gap-2 mt-1">
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" className="input input-bordered w-full" />
          <input type="file" accept="image/*" onChange={handleFile} className="file-input file-input-bordered w-full sm:w-auto" />
        </div>
        {uploading && <span className="loading loading-dots loading-sm" />}
        {image && <img src={image} alt="Preview" className="mt-3 h-40 rounded-lg object-cover" />}
      </div>
      <textarea name="gallery" defaultValue={(initial.gallery || []).join("\n")} placeholder="Extra gallery image URLs (one per line, optional)" className="textarea textarea-bordered w-full md:col-span-2" rows={3} />
      <div className="md:col-span-2">
        <p className="label-text mb-2">Amenities</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {AMENITIES.map((a) => (
            <label key={a} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={amenities.includes(a)} onChange={() => toggle(a)} /> {a}
            </label>
          ))}
        </div>
      </div>
      <textarea name="overview" required defaultValue={initial.overview} placeholder="Detailed overview" className="textarea textarea-bordered w-full md:col-span-2" rows={5} />
      <input readOnly value={initial.ownerName || user?.name || ""} className="input input-bordered w-full bg-base-200" />
      <input readOnly value={initial.ownerEmail || user?.email || ""} className="input input-bordered w-full bg-base-200" />
      <button className="btn btn-primary md:col-span-2" disabled={saving || uploading}>
        {saving && <span className="loading loading-spinner loading-sm" />} {submitLabel}
      </button>
    </form>
  );
}