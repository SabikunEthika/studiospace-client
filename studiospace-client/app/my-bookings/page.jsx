"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import { api } from "@/lib/api";
import { downloadInvoice } from "@/lib/invoice";

const badge = { Pending: "badge-warning", Confirmed: "badge-success", Completed: "badge-info", Cancelled: "badge-error" };

function Inner() {
  const [items, setItems] = useState(null);
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = () => api("/bookings/my").then(setItems).catch((e) => { toast.error(e.message); setItems([]); });
  useEffect(() => { load(); }, []);

  const cancel = async () => {
    setBusy(true);
    try { await api(`/bookings/${target._id}/cancel`, { method: "PATCH" }); toast.success("Booking cancelled"); setTarget(null); load(); }
    catch (e) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">My Bookings</h1>
      {items === null ? <div className="skeleton h-64 w-full" /> : items.length === 0 ? (
        <EmptyState title="No bookings yet" text="Find a studio and make your first reservation." href="/studios" cta="Explore Studios" />
      ) : (
        <div className="overflow-x-auto border border-base-300 rounded-xl">
          <table className="table">
            <thead><tr><th>Studio</th><th>Date</th><th>Time</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((b) => (
                <tr key={b._id}>
                  <td className="font-semibold">{b.studioTitle}</td>
                  <td>{b.date}</td>
                  <td>{b.startTime} - {b.endTime}</td>
                  <td>${b.totalPrice}</td>
                  <td><span className={`badge ${badge[b.status]}`}>{b.status}</span></td>
                  <td className="space-x-2">
                    {b.status === "Pending" && <button className="btn btn-error btn-xs" onClick={() => setTarget(b)}>Cancel Booking</button>}
                    {b.status === "Confirmed" && <button className="btn btn-outline btn-xs" onClick={() => downloadInvoice(b)}>Invoice PDF</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmModal open={!!target} title="Cancel this booking?" message="This reservation request will be cancelled." confirmText="Yes, cancel" cancelText="Keep booking" loading={busy} onConfirm={cancel} onCancel={() => setTarget(null)} />
    </div>
  );
}
export default function MyBookingsPage() { return <PrivateRoute><Inner /></PrivateRoute>; }