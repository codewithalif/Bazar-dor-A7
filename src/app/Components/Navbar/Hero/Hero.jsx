'use client'
import { useState, useEffect } from "react"; // ADDED
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  // CHANGED: shoja new Date() er bodole state
  const [banglaDate, setBanglaDate] = useState("");

  // ADDED: tarikh shudhu browser-e set hobe
useEffect(() => {
  setBanglaDate(
    new Date().toLocaleDateString("bn-BD", {
      weekday: "long", 
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  );
}, []);

  return (
    <section className="w-full px-3 py-5 sm:px-5 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-5 overflow-hidden rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-4 sm:gap-7 sm:rounded-[24px] sm:p-6 md:flex-row md:justify-between md:gap-8 md:p-8 lg:p-10">

        {/* Left Content */}
        <div className="w-full min-w-0 text-center md:w-1/2 md:text-left lg:w-[55%]">
          {/* CHANGED: min-h add, jate tarikh ashar age badge sonkuchito na hoy */}
          <span className="inline-block min-h-[28px] rounded-full bg-[#e0f2e7] px-3 py-1 text-xs font-medium text-[#168044] sm:text-sm">
            {banglaDate}
          </span>

          <h1 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight text-[#202a23] sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#68716b] sm:mt-5 sm:text-base md:mx-0 lg:leading-7">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="mt-5 sm:mt-6">
            <Link
              href="#all-products"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#07883f] px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-[#066d34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07883f] sm:text-base"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="w-full min-w-0 max-w-[240px] sm:max-w-[320px] md:w-1/2 md:max-w-none lg:w-[45%]">
          <Image
            src="/bazar-hero.png"
            alt="বাজার দর"
            width={540}
            height={510}
            priogit rity
            sizes="(max-width: 639px) 240px, (max-width: 767px) 320px, (max-width: 1023px) 45vw, 40vw"
            className="block h-auto w-full object-contain"
          />
        </div>

      </div>
    </section>
  );
}