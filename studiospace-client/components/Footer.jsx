import Link from "next/link";
import { FiAperture } from "react-icons/fi";
import { FaXTwitter, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa6";

const cats = [["Photo Studio","Photo Studios"],["Film Stage","Sound Stages"],["Podcast Lounge","Podcast Rooms"],["Music Suite","Music Suites"],["Workshop","Art Workshops"]];

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-16">
      <div className="container mx-auto px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary"><FiAperture size={28} /> StudioSpace</Link>
          <p className="mt-3 text-sm opacity-70">Our mission is to put every creator in the right room, from cyc walls to recording suites, with transparent pricing and instant booking.</p>
          <div className="flex gap-3 mt-4 text-xl">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
        <div>
          <h6 className="footer-title">Quick Links</h6>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="link link-hover">Home</Link></li>
            <li><Link href="/studios" className="link link-hover">Explore Studios</Link></li>
            <li><Link href="/how-it-works" className="link link-hover">How It Works</Link></li>
            <li><Link href="/about" className="link link-hover">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="footer-title">Popular Categories</h6>
          <ul className="space-y-2 text-sm">
            {cats.map(([v, l]) => (
              <li key={v}><Link href={`/studios?category=${encodeURIComponent(v)}`} className="link link-hover">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h6 className="footer-title">Newsletter</h6>
          <NewsletterForm />
        </div>
      </div>
      <div className="text-center text-sm py-4 border-t border-base-300 opacity-70">
        © {new Date().getFullYear()} StudioSpace. All rights reserved. · Terms & Privacy
      </div>
    </footer>
  );
}
import NewsletterForm from "./NewsletterForm";