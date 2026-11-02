// Spinner.jsx
import { FiAperture } from "react-icons/fi";
export default function Spinner() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="flex flex-col items-center gap-3">
        <FiAperture className="animate-spin text-primary" size={48} />
        <p className="text-sm opacity-70">Loading StudioSpace...</p>
      </div>
    </div>
  );
}