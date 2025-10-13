"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "./Botton";

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
        <h1 className="hero-title text-5xl md:text-5xl font-bold text-gray-900 leading-tight">
          <span>Built in Gujarat.</span>{" "}
          <span className="text-[var(--accent-color)]">Driven by People.</span>{" "}
          <span>Empowering Every Dream.</span>
        </h1>

        <p className="hero-sub mt-6 text-lg md:text-lg text-gray-700 font-light">
          {" Where tradition meets innovation — GETCLOTH connects Gujarat’s creators and customers on one digital platform. A homegrown revolution bringing authentic Indian products and proud local stories to the modern world."}
        </p>

        <div className="hero-btns mt-10 flex gap-6 justify-center">

          <Button data="Explore Products" link="/products" />

          <Button data=" Register Your Brand" link="/admin" />

        </div>
      </div>
    </section>
  );
}
