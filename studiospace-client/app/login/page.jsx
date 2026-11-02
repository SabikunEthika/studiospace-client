"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") || "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const f = new FormData(e.target);
    setLoading(true);
    const { error: err } = await authClient.signIn.email({ email: f.get("email"), password: f.get("password") });
    setLoading(false);
    if (err) {
      const msg = err.message || "Invalid email or password";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("Welcome back to StudioSpace!");
    router.push(redirect);
  };

  const google = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: redirect });
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4 py-10">
      <div className="card bg-base-100 shadow-xl border border-base-300 w-full max-w-md">
        <form onSubmit={onSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-center md:text-4xl">Login to StudioSpace</h1>
          {error && <div className="alert alert-error text-sm">{error}</div>}
          <label className="form-control">
            <span className="label-text mb-1">Email</span>
            <input name="email" type="email" required placeholder="you@example.com" className="input input-bordered w-full" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">Password</span>
            <input name="password" type="password" required placeholder="Your password" className="input input-bordered w-full" />
          </label>
          <button type="button" className="text-sm text-primary text-left" onClick={() => toast("Password reset is coming soon")}>
            Forgot Password?
          </button>
          <button className="btn btn-primary" disabled={loading}>
            {loading && <span className="loading loading-spinner loading-sm" />} Login
          </button>
          <div className="divider">OR</div>
          <button type="button" onClick={google} className="btn btn-outline"><FcGoogle size={22} /> Continue with Google</button>
          <p className="text-center text-sm mt-2">
            New to StudioSpace? <Link href="/register" className="link link-primary">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
