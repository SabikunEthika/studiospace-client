import Link from "next/link";
import { FiCamera, FiFilm, FiMic, FiMusic, FiTool } from "react-icons/fi";
import SectionTitle from "./SectionTitle";

const cats = [
  { label: "Photo Studios", value: "Photo Studio", icon: FiCamera },
  { label: "Sound Stages", value: "Film Stage", icon: FiFilm },
  { label: "Podcast Rooms", value: "Podcast Lounge", icon: FiMic },
  { label: "Music Suites", value: "Music Suite", icon: FiMusic },
  { label: "Art Workshops", value: "Workshop", icon: FiTool },
];

export default function Categories() {
  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <SectionTitle title="Browse by Studio Category" subtitle="Pick the kind of space your next project needs." />
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {cats.map(({ label, value, icon: Icon }) => (
            <Link key={value} href={`/studios?category=${encodeURIComponent(value)}`} className="card bg-base-100 border border-base-300 hover:border-primary hover:-translate-y-1 transition h-full">
              <div className="card-body items-center text-center">
                <Icon size={36} className="text-primary" />
                <h3 className="font-semibold">{label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}