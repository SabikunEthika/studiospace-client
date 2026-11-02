"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  { img: "https://images.unsplash.com/photo-1664817550969-5e76adc4a3fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?auto=format&fit=crop&w=1800&q=80", title: "Find the perfect space to create", text: "Book photo studios, sound stages and recording suites by the hour." },
  { img: "https://images.unsplash.com/photo-1760780567530-389d8a3fba75?q=80&w=1004&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?auto=format&fit=crop&w=1800&q=80", title: "Record, shoot and produce on your terms", text: "Transparent pricing, real-time availability and instant booking." },
  { img: "https://images.unsplash.com/photo-1782274265689-4f10a91d4abb?q=80&w=1040&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?auto=format&fit=crop&w=1800&q=80", title: "Turn your idle studio into income", text: "List your creative space and welcome verified creators." },
];

export default function HeroSlider() {
  return (
    <Swiper modules={[Autoplay, Pagination, EffectFade]} effect="fade" loop autoplay={{ delay: 4500, disableOnInteraction: false }} pagination={{ clickable: true }} className="h-[70vh] min-h-[460px]">
      {slides.map((s) => (
        <SwiperSlide key={s.title}>
          <div className="relative h-full w-full">
            <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">{s.title}</h1>
                <p className="mt-4 text-lg opacity-90">{s.text}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/studios" className="btn btn-primary btn-lg">Explore Studios</Link>
                  <Link href="/studios" className="btn btn-outline btn-lg text-white">Host Your Space</Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}