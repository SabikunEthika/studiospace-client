"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function BookingModal({ studio, open, onClose }) {
  const router = useRouter();
  const [form, setForm] = useState({ date: "", startTime: "", endTime: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  if (!open) return null;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const hours = form.startTime && form.endTime && toMin(form.endTime) > toMin(form.startTime) ? (toMin(form.endTime) - toMin(form.startTime)) / 60 : 0;
  const today = new Date().toISOString().split("T")[0];

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api("/bookings", { method: "POST", body: { studioId: studio._id, ...form } });
      toast.success("Booking request sent! Status: Pending");
      onClose();
      router.push("/my-bookings");
    } catch (err) { setError(err.message); toast.error(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="modal modal-open">
      <form onSubmit={submit} className="modal-box space-y-3">
        <h3 className="font-bold text-xl">Book {studio.title}</h3>
        {error && <div className="alert alert-error text-sm">{error}</div>}
        <input type="date" min={today} required value={form.date} onChange={set("date")} className="input input-bordered w-full" />
        <div className="grid grid-cols-2 gap-3">
          <input type="time" required value={form.startTime} onChange={set("startTime")} className="input input-bordered w-full" />
          <input type="time" required value={form.endTime} onChange={set("endTime")} className="input input-bordered w-full" />
        </div>
        <textarea placeholder="Notes for the host (optional)" value={form.notes} onChange={set("notes")} className="textarea textarea-bordered w-full" />
        <div className="bg-base-200 rounded-lg p-3 text-sm space-y-1">
          <p>Duration: <b>{hours} hr</b></p>
          <p>Estimated total: <b>${hours * studio.hourlyRate}</b></p>
          <p>Refundable deposit: <b>${studio.securityDeposit}</b></p>
        </div>
        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>Close</button>
          <button className="btn btn-primary" disabled={saving}>{saving && <span className="loading loading-spinner loading-xs" />} Confirm Booking</button>
        </div>
      </form>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}