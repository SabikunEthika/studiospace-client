"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

const validate = (p) =>
  !/[A-Z]/.test(p) ? "Password must contain an uppercase letter"
  : !/[a-z]/.test(p) ? "Password must contain a lowercase letter"
  : p.length < 6 ? "Password must be at least 6 characters"
  : "";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pwError, setPwError] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const f = new FormData(e.target);
    const password = f.get("password");
    const msg = validate(password);
    setPwError(msg);
    if (msg) { toast.error(msg); return; }
    setLoading(true);
    const { error: err } = await authClient.signUp.email({
      name: f.get("name"), email: f.get("email"), password, image: f.get("photo"),
    });
    setLoading(false);
    if (err) { const m = err.message || "Registration failed"; setError(m); toast.error(m); return; }
    toast.success("Account created! Please log in.");
    router.push("/login");
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4 py-10">
      <div className="card bg-base-100 shadow-xl border border-base-300 w-full max-w-md">
        <form onSubmit={onSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-center">Create your account</h1>
          {error && <div className="alert alert-error text-sm">{error}</div>}
          <input name="name" required placeholder="Full name" className="input input-bordered w-full" />
          <input name="email" type="email" required placeholder="Email" className="input input-bordered w-full" />
          <input name="photo" type="url" required placeholder="Photo URL" className="input input-bordered w-full" />
          <div>
            <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full" />
            {pwError && <p className="text-error text-sm mt-1">{pwError}</p>}
          </div>
          <button className="btn btn-primary" disabled={loading}>
            {loading && <span className="loading loading-spinner loading-sm" />} Register
          </button>
          <div className="divider">OR</div>
          <button type="button" className="btn btn-outline" onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })}>
            <FcGoogle size={22} /> Continue with Google
          </button>
          <p className="text-center text-sm">Already have an account? <Link href="/login" className="link link-primary">Login</Link></p>
        </form>
      </div>
    </div>
  );
}