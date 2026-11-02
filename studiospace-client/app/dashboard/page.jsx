"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import EmptyState from "@/components/EmptyState";
import { useAuth } from "@/components/AuthProvider";
import { api } from "@/lib/api";

const badge = { Pending: "badge-warning", Confirmed: "badge-success", Completed: "badge-info", Cancelled: "badge-error" };

function Inner() {
  const { user } = useAuth();
  const [listings, setListings] = useState(null);
  const [mine, setMine] = useState([]);
  const [requests, setRequests] = useState([]);

  const load = () => {
    api("/studios/mine").then(setListings).catch(() => setListings([]));
    api("/bookings/my").then(setMine).catch(() => {});
    api("/bookings/host").then(setRequests).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const update = async (id, status) => {
    try { await api(`/bookings/${id}/status`, { method: "PATCH", body: { status } }); toast.success(`Booking ${status.toLowerCase()}`); load(); }
    catch (e) { toast.error(e.message); }
  };

  const stats = [
    ["My Listings", listings?.length ?? "-"],
    ["My Bookings", mine.length],
    ["Booking Requests", requests.length],
    ["Pending Requests", requests.filter((r) => r.status === "Pending").length],
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">Welcome, {user.name}</h1>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mt-8">
        {stats.map(([l, v]) => (
          <div key={l} className="stat bg-base-200 rounded-xl"><div className="stat-title">{l}</div><div className="stat-value text-primary">{v}</div></div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-12 mb-4">Booking Requests for Your Studios</h2>
      {requests.length === 0 ? <EmptyState title="No requests yet" text="Requests for your studios will appear here." /> : (
        <div className="overflow-x-auto border border-base-300 rounded-xl">
          <table className="table">
            <thead><tr><th>Studio</th><th>Guest</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id}>
                  <td>{r.studioTitle}</td><td>{r.userName}</td><td>{r.date}</td><td>{r.startTime} - {r.endTime}</td>
                  <td><span className={`badge ${badge[r.status]}`}>{r.status}</span></td>
                  <td className="space-x-1">
                    {r.status === "Pending" && <><button className="btn btn-success btn-xs" onClick={() => update(r._id, "Confirmed")}>Confirm</button><button className="btn btn-error btn-xs" onClick={() => update(r._id, "Cancelled")}>Reject</button></>}
                    {r.status === "Confirmed" && <button className="btn btn-info btn-xs" onClick={() => update(r._id, "Completed")}>Mark Completed</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default function DashboardPage() { return <PrivateRoute><Inner /></PrivateRoute>; }