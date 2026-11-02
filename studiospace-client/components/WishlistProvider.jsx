"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useAuth } from "./AuthProvider";

const Ctx = createContext({ ids: [], toggle: () => {} });
export const useWishlist = () => useContext(Ctx);

export default function WishlistProvider({ children }) {
  const { user, loading } = useAuth();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) { setIds([]); return; }
    api("/wishlist").then(setIds).catch(() => {});
  }, [user?.id, loading]);

  const toggle = async (id) => {
    if (!user) return toast.error("Please log in to save studios");
    try {
      const { saved } = await api(`/wishlist/${id}`, { method: "POST" });
      setIds((p) => (saved ? [...p, id] : p.filter((x) => x !== id)));
      toast.success(saved ? "Added to saved studios" : "Removed from saved studios");
    } catch (e) { toast.error(e.message); }
  };
  return <Ctx.Provider value={{ ids, toggle }}>{children}</Ctx.Provider>;
}