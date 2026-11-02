"use client";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "./WishlistProvider";

export default function HeartButton({ studioId }) {
  const { ids, toggle } = useWishlist();
  const saved = ids.includes(studioId);
  return (
    <button onClick={() => toggle(studioId)} aria-label="Save studio" className="absolute top-3 right-3 btn btn-circle btn-sm bg-base-100/90 border-0">
      {saved ? <FaHeart className="text-error" /> : <FaRegHeart />}
    </button>
  );
}