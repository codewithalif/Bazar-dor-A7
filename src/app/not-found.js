import Link from "next/link";

 
export default function NotFound() {
  return (
     <main className="relative flex min-h-screen items-center justify-center overflow-hidden  px-4 py-10">
      {/* Background-er jhapsa golo (shudhu shajar jonno) */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-lime-200/40 blur-3xl" />

      {/* Main card */}
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200/80 bg-[#f8faf7] p-8 text-center shadow-lg sm:p-12">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 animate-bounce items-center justify-center rounded-2xl bg-[#f0f5f0] text-5xl shadow-sm">
          🛒
        </div>

        {/* Boro 404 */}
        <p className="mt-6 bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-7xl font-extrabold text-transparent sm:text-8xl">
          ৪০৪
        </p>

        <h1 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          আপনি যে লিংকে গিয়েছেন সেটি ভুল অথবা মুছে ফেলা হয়েছে। হোম পেজে ফিরে গিয়ে আজকের বাজারদর দেখুন।
        </p>

        {/* Buttons: phone-e upor-niche, boro screen-e pashapashi */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="w-full rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700 sm:w-auto"
          >
            হোম পেজে ফিরে যান
          </Link>

          {/* Apnar route onujayi path ta thik kore nin */}
          <Link
            href="/products/chal"
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            🍚 চালের দাম দেখুন
          </Link>
        </div>
      </div>
    </main>
  )
}