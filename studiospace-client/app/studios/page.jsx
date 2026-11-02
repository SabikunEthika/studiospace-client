"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import StudioCard from "@/components/StudioCard";
import EmptyState from "@/components/EmptyState";

const CATS = ["Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite", "Workshop"];

function Explore() {
  const initialCat = useSearchParams().get("category") || "";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCat);
  const [sort, setSort] = useState("newest");
  const [studios, setStudios] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setStudios(null);
      const q = new URLSearchParams();
      if (search) q.set("search", search);
      if (category) q.set("category", category);
      q.set("sort", sort);
      api(`/studios?${q}`).then(setStudios).catch(() => setStudios([]));
    }, 350);
    return () => clearTimeout(t);
  }, [search, category, sort]);

  const clear = () => { setSearch(""); setCategory(""); setSort("newest"); };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Explore Studios</h1>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or location" className="input input-bordered w-full md:col-span-1" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered w-full">
          <option value="">All categories</option>
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered w-full">
          <option value="newest">Newest</option>
          <option value="rating">Top rated</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
      </div>
      <div className="mt-8">
        {studios === null ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[...Array(6)].map((_, i) => <div key={i} className="skeleton h-80 w-full" />)}</div>
        ) : studios.length === 0 ? (
          <div>
            <EmptyState title="No studios match your search" text="Try different keywords or clear the filters." />
            <div className="text-center mt-4"><button onClick={clear} className="btn btn-primary">Clear Filters</button></div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{studios.map((s) => <StudioCard key={s._id} studio={s} />)}</div>
        )}
      </div>
    </div>
  );
}

export default function StudiosPage() { return <Suspense><Explore /></Suspense>; }
