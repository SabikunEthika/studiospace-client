"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import StudioCard from "./StudioCard";
import SectionTitle from "./SectionTitle";
import EmptyState from "./EmptyState";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState(null);
  useEffect(() => { api("/studios/featured").then(setStudios).catch(() => setStudios([])); }, []);
  return (
    <section className="container mx-auto px-4 py-16">
      <SectionTitle title="Featured Studios" subtitle="Top-rated and newly listed creative spaces, ready to book." />
      {studios === null ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-80 w-full" />)}
        </div>
      ) : studios.length === 0 ? (
        <EmptyState title="No studios yet" text="Be the first to list a creative space." href="/add-studio" cta="Host Your Space" />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{studios.map((s) => <StudioCard key={s._id} studio={s} />)}</div>
          <div className="text-center mt-10"><Link href="/studios" className="btn btn-primary">View All Studios</Link></div>
        </>
      )}
    </section>
  );
}