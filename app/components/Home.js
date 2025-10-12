"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HomeHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".hero-title span", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power4.out",
        duration: 1.5,
      })
        .from(".hero-sub", { opacity: 0, y: 40, duration: 1 }, "-=0.5")
        .from(".hero-btns", { opacity: 0, y: 30, duration: 1 }, "-=0.6");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex mt-24 flex-col justify-center items-center text-center bg-gradient-to-b from-white to-[#fdfaf6]"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('/textile-bg.jpg')] bg-cover bg-center opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4">
        <h1 className="hero-title text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
          <span>Threads of India.</span>{" "}
          <span className="text-[#c79b63]">Woven by Gujarat.</span>{" "}
          <span>Styled for the World.</span>
        </h1>

        <p className="hero-sub mt-6 text-lg md:text-xl text-gray-700 font-light">
          Born from the hands of real cloth makers — GETCLOTH stands for every
          Indian artisan, every dreamer, and every brand ready to rise.
        </p>

        <div className="hero-btns mt-10 flex gap-6 justify-center">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
            Shop Now
          </button>
          <button className="border border-gray-800 px-8 py-3 rounded-full hover:bg-gray-800 hover:text-white transition">
            Register Your Brand
          </button>
        </div>
      </div>
    </section>
  );
}
