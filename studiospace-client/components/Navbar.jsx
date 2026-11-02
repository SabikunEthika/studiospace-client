"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiAperture, FiMenu } from "react-icons/fi";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "./AuthProvider";
import ThemeToggle from "./ThemeToggle";

const links = [
  ["Home", "/"],
  ["Explore Studios", "/studios"],
  ["How It Works", "/how-it-works"],
  ["About Us", "/about"],
];
const close = () => document.activeElement?.blur();

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const logout = async () => {
    await fetch("/api/token", { method: "DELETE" });
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navItems = links.map(([label, href]) => (
    <li key={href}>
      <Link href={href} onClick={close} className={isActive(href) ? "text-primary font-semibold border-b-2 border-primary rounded-none" : ""}>
        {label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-300">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle"><FiMenu size={22} /></div>
            <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow">{navItems}</ul>
          </div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <FiAperture size={28} /> StudioSpace
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">{navItems}</ul>
        </div>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {user ? (
            <div className="dropdown dropdown-end dropdown-hover">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" title={user.name}>
                <div className="w-10 rounded-full">
                  <img src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} alt={user.name} />
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 w-60 p-2 shadow border border-base-300">
                <li className="menu-title text-base-content">{user.name}</li>
                <li><Link href="/dashboard" onClick={close}>Dashboard</Link></li>
                <li><Link href="/add-studio" onClick={close}>Add New Studio</Link></li>
                <li><Link href="/my-listings" onClick={close}>My Studio Listings</Link></li>
                <li><Link href="/my-bookings" onClick={close}>My Bookings</Link></li>
                <li><Link href="/wishlist" onClick={close}>Saved Studios</Link></li>
                <li><button onClick={logout} className="text-error">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline btn-primary btn-sm md:btn-md">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm md:btn-md">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}