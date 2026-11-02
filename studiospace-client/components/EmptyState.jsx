// EmptyState.jsx
import Link from "next/link";
import { FiInbox } from "react-icons/fi";
export default function EmptyState({ title, text, href, cta }) {
  return (
    <div className="text-center py-20 border border-dashed border-base-300 rounded-xl">
      <FiInbox size={48} className="mx-auto opacity-40" />
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="opacity-70 mt-2">{text}</p>
      {href && <Link href={href} className="btn btn-primary mt-5">{cta}</Link>}
    </div>
  );
}