"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import { api } from "@/lib/api";

function Inner() {
  const [items, setItems] = useState(null);
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { api("/studios/mine").then(setItems).catch((e) => { toast.error(e.message); setItems([]); }); }, []);

  const remove = async () => {
    setBusy(true);
    try {
      await api(`/studios/${target._id}`, { method: "DELETE" });
      setItems((p) => p.filter((s) => s._id !== target._id));
      toast.success("Studio deleted successfully");
      setTarget(null);
    } catch (e) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">My Studio Listings</h1>
      {items === null ? <div className="skeleton h-64 w-full" /> : items.length === 0 ? (
        <EmptyState title="You have no listings" text="List your first creative space and start earning." href="/add-studio" cta="Add New Studio" />
      ) : (
        <div className="overflow-x-auto border border-base-300 rounded-xl">
          <table className="table">
            <thead><tr><th>Studio</th><th>Category</th><th>Rate</th><th>Location</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((s) => (
                <tr key={s._id}>
                  <td><div className="flex items-center gap-3"><img src={s.image} alt={s.title} className="w-16 h-12 rounded object-cover" /><span className="font-semibold">{s.title}</span></div></td>
                  <td><span className="badge badge-primary">{s.category}</span></td>
                  <td>${s.hourlyRate}/hr</td>
                  <td>{s.location}</td>
                  <td className="space-x-2">
                    <Link href={`/studios/edit/${s._id}`} className="btn btn-outline btn-primary btn-xs">Update</Link>
                    <button onClick={() => setTarget(s)} className="btn btn-error btn-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmModal open={!!target} title="Delete this studio?" message={`"${target?.title}" will be permanently removed. This cannot be undone.`} confirmText="Delete" loading={busy} onConfirm={remove} onCancel={() => setTarget(null)} />
    </div>
  );
}
export default function MyListingsPage() { return <PrivateRoute><Inner /></PrivateRoute>; }