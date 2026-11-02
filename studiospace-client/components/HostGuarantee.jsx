import { FiShield, FiUserCheck, FiTool, FiHeadphones } from "react-icons/fi";
import SectionTitle from "./SectionTitle";
const items = [
  { icon: FiShield, t: "Liability Protection", d: "Every booking is covered by our host and creator protection policy." },
  { icon: FiUserCheck, t: "Verified Profiles", d: "Hosts and creators are identity-checked before booking." },
  { icon: FiTool, t: "Equipment Safety", d: "Gear is inspected and safety guidelines are enforced on every listing." },
  { icon: FiHeadphones, t: "24/7 Host Support", d: "Our support team is online round the clock for any issue." },
];
export default function HostGuarantee() {
  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <SectionTitle title="Host Guarantee & Creator Support" subtitle="Book and host with total confidence." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="card bg-base-100 border border-base-300 h-full">
              <div className="card-body">
                <Icon size={32} className="text-primary" />
                <h3 className="font-semibold text-lg">{t}</h3>
                <p className="text-sm opacity-70">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}