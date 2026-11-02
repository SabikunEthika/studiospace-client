import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4 text-center">
      <div>
        <svg viewBox="0 0 200 140" className="w-64 mx-auto text-primary" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="30" y="50" width="110" height="70" rx="8" />
          <path d="M140 75 l40 -20 v60 l-40 -20" />
          <circle cx="70" cy="85" r="18" />
          <circle cx="70" cy="85" r="6" />
          <path d="M45 50 l12 -20 h30 l12 20" />
        </svg>
        <h1 className="text-6xl font-bold mt-6">404</h1>
        <p className="mt-2 text-xl">Cut! This scene is missing from the studio.</p>
        <Link href="/" className="btn btn-primary mt-6">Return to Home</Link>
      </div>
    </div>
  );
}