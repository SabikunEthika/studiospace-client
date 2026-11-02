import Link from "next/link";
import { FiMapPin, FiStar } from "react-icons/fi";
import HeartButton from "./HeartButton";

export default function StudioCard({ studio }) {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-md h-full overflow-hidden hover:shadow-xl transition">
      <figure className="relative h-52 w-full">
        <img src={studio.image} alt={studio.title} className="w-full h-full object-cover" />
        <span className="badge badge-primary absolute top-3 left-3">{studio.category}</span>
        <HeartButton studioId={studio._id} />
      </figure>
      <div className="card-body p-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="card-title text-lg line-clamp-1">{studio.title}</h3>
          <span className="badge badge-warning gap-1 shrink-0"><FiStar />{studio.rating > 0 ? studio.rating : "New"}</span>
        </div>
        <p className="flex items-center gap-1 text-sm opacity-70 line-clamp-1"><FiMapPin className="shrink-0" />{studio.location}</p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${studio.hourlyRate}<span className="text-sm font-normal opacity-70"> / hr</span></span>
          <Link href={`/studios/${studio._id}`} className="btn btn-primary btn-sm">View Details</Link>
        </div>
      </div>
    </div>
  );
}