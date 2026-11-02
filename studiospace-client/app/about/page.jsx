import { FiHeart, FiShield, FiUsers } from "react-icons/fi";
import SectionTitle from "@/components/SectionTitle";

const values = [
  {
    icon: FiUsers,
    title: "Creators come first",
    description:
      "We make it simpler for photographers, filmmakers, and teams to find the right setting for their next idea.",
  },
  {
    icon: FiShield,
    title: "Trust in every booking",
    description:
      "Clear details, verified profiles, and responsive support help both hosts and creators book with confidence.",
  },
  {
    icon: FiHeart,
    title: "Space for every story",
    description:
      "From a first portfolio shoot to a full production day, we believe great work deserves an accessible place to happen.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1 className="text-4xl font-bold md:text-5xl">About StudioSpace</h1>
        <div className="mt-8 space-y-5 text-lg leading-8 opacity-80">
          <p>
            StudioSpace connects creators with inspiring, practical spaces for photography, film, podcasts, and every kind of production in between.
          </p>
          <p>
            Our mission is to take the friction out of finding a studio. By bringing transparent listings, flexible booking, and thoughtful host tools into one place, we help creators spend less time coordinating and more time making.
          </p>
          <p>
            We are building a creative marketplace where local spaces can thrive and every project, from a quick portrait session to a full campaign, can begin with confidence.
          </p>
        </div>
      </section>

      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our values"
            subtitle="The principles that guide every StudioSpace connection."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <article key={title} className="card border border-base-300 bg-base-100">
                <div className="card-body">
                  <Icon size={32} className="text-primary" />
                  <h3 className="card-title">{title}</h3>
                  <p className="opacity-70">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
