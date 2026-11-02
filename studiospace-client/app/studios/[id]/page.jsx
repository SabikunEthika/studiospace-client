"use client";
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiMapPin, FiUsers, FiStar, FiCheck } from "react-icons/fi";
import { api } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import Spinner from "@/components/Spinner";
import ReviewSection from "@/components/ReviewSection";
import BookingModal from "@/components/BookingModal";

export default function StudioDetails() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [studio, setStudio] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [missing, setMissing] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const load = () => {
    api(`/studios/${id}`).then(setStudio).catch(() => setMissing(true));
    api(`/studios/${id}/reviews`).then(setReviews).catch(() => {});
  };
  useEffect(() => { load(); }, [id]);

  const book = () => {
    if (!user) { toast.error("Please log in to book a workspace"); router.push(`/login?redirect=${encodeURIComponent(pathname)}`); return; }
    if (user.email === studio.ownerEmail) return toast.error("You cannot book your own studio");
    setShowBooking(true);
  };

  if (missing) return (
    <div className="text-center py-24">
      <h1 className="text-3xl font-bold">Studio not found</h1>
      <Link href="/studios" className="btn btn-primary mt-6">Back to Studios</Link>
    </div>
  );
  if (!studio) return <Spinner />;

  const images = [studio.image, ...(studio.gallery || [])];

  return (
    <div className="container mx-auto px-4 py-10 grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="rounded-xl h-72 md:h-[420px]">
          {images.map((src, i) => (
            <SwiperSlide key={i}><img src={src} alt={`${studio.title} ${i + 1}`} className="w-full h-full object-cover" /></SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="badge badge-primary">{studio.category}</span>
          <span className="badge badge-warning gap-1"><FiStar />{studio.rating > 0 ? `${studio.rating} (${studio.reviewCount})` : "New"}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-3">{studio.title}</h1>
        <p className="flex items-center gap-2 mt-2 opacity-70"><FiMapPin />{studio.location}</p>
        <h2 className="text-2xl font-bold mt-8 mb-2">Overview</h2>
        <p className="whitespace-pre-line opacity-80">{studio.overview}</p>
        <h2 className="text-2xl font-bold mt-8 mb-3">Amenities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {studio.amenities?.map((a) => <p key={a} className="flex items-center gap-2"><FiCheck className="text-primary" />{a}</p>)}
        </div>
        <ReviewSection studioId={id} reviews={reviews} onAdded={load} />
      </div>

      <aside className="lg:sticky lg:top-24 h-fit">
        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body gap-3">
            <p className="text-3xl font-bold text-primary">${studio.hourlyRate}<span className="text-base font-normal opacity-70"> / hr</span></p>
            <p className="text-sm">Security deposit: <b>${studio.securityDeposit}</b></p>
            <p className="flex items-center gap-2 text-sm"><FiUsers /> Up to {studio.capacity} people</p>
            <div className="divider my-1" />
            <div className="flex items-center gap-3">
              <img src={studio.ownerPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(studio.ownerName)}`} alt={studio.ownerName} className="w-12 h-12 rounded-full object-cover" />
              <div><p className="font-semibold">{studio.ownerName}</p><p className="text-xs opacity-70">{studio.ownerEmail}</p></div>
            </div>
            <button onClick={book} className="btn btn-primary mt-2">Book Workspace Now</button>
          </div>
        </div>
      </aside>

      <BookingModal studio={studio} open={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}