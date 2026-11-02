"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import StudioCard from "@/components/StudioCard";
import EmptyState from "@/components/EmptyState";
import { useWishlist } from "@/components/WishlistProvider";
import { api } from "@/lib/api";

function Inner() {
  const [items, setItems] = useState(null);
  const { ids } = useWishlist();
  useEffect(() => { api("/wishlist/studios").then(setItems).catch((e) => { toast.error(e.message); setItems([]); }); }, [ids.length]);
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Saved Studios</h1>
      {items === null ? <div className="skeleton h-64 w-full" /> : items.length === 0 ? (
        <EmptyState title="Nothing saved yet" text="Tap the heart on any studio to save it here." href="/studios" cta="Explore Studios" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((s) => <StudioCard key={s._id} studio={s} />)}</div>
      )}
    </div>
  );
}
export default function WishlistPage() { return <PrivateRoute><Inner /></PrivateRoute>; }