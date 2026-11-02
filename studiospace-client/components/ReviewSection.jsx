"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiStar } from "react-icons/fi";
import { api } from "@/lib/api";
import { useAuth } from "./AuthProvider";

export default function ReviewSection({ studioId, reviews, onAdded }) {
  const { user, loading } = useAuth();
  const [rating, setRating] = useState(5);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const comment = new FormData(e.target).get("comment");
    setSaving(true);
    try {
      await api(`/studios/${studioId}/reviews`, { method: "POST", body: { rating, comment } });
      toast.success("Thanks for your review!");
      e.target.reset();
      onAdded();
    } catch (err) { toast.error(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>
      {user && (
        <form onSubmit={submit} className="card bg-base-200 p-4 mb-6 gap-3">
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="select select-bordered w-40">
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
          </select>
          <textarea name="comment" required placeholder="Share your experience" className="textarea textarea-bordered" />
          <button className="btn btn-primary w-fit" disabled={saving || loading}>Submit Review</button>
        </form>
      )}
      {reviews.length === 0 ? <p className="opacity-70">No reviews yet. Book this studio and be the first to review it.</p> : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="border border-base-300 rounded-lg p-4">
              <div className="flex justify-between">
                <p className="font-semibold">{r.userName}</p>
                <span className="badge badge-warning gap-1"><FiStar />{r.rating}</span>
              </div>
              <p className="mt-2 text-sm">{r.comment}</p>
              <p className="text-xs opacity-60 mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}