import { FiSearch, FiClock, FiCheckCircle, FiVideo } from "react-icons/fi";
import SectionTitle from "./SectionTitle";
const steps = [
  { icon: FiSearch, t: "Discover Spaces", d: "Browse and filter verified studios by category, price and location." },
  { icon: FiClock, t: "Select Shoot Hours", d: "Pick your date and time slot with transparent hourly pricing." },
  { icon: FiCheckCircle, t: "Book Instantly", d: "Send your reservation and get host confirmation fast." },
  { icon: FiVideo, t: "Create & Produce", d: "Show up, set up and make something great." },
];
export default function HowBookingWorks() {
  return (
    <section className="container mx-auto px-4 py-16">
      <SectionTitle title="How Booking Works" subtitle="From idea to production in four simple steps." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, t, d }, i) => (
          <div key={t} className="card bg-base-100 border border-base-300 h-full">
            <div className="card-body items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary grid place-items-center"><Icon size={26} /></div>
              <span className="badge badge-primary">Step {i + 1}</span>
              <h3 className="font-semibold text-lg">{t}</h3>
              <p className="text-sm opacity-70">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}