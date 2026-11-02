"use client";
import toast from "react-hot-toast";
export default function NewsletterForm() {
  return (
    <form className="join w-full" onSubmit={(e) => { e.preventDefault(); toast.success("Thanks for subscribing!"); e.target.reset(); }}>
      <input type="email" required placeholder="Your email" className="input input-bordered join-item w-full" />
      <button className="btn btn-primary join-item">Join</button>
    </form>
  );
}