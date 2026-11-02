// SectionTitle.jsx  (use for EVERY section heading so styles stay consistent)
export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      {subtitle && <p className="mt-3 opacity-70 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}