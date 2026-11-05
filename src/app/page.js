
import { Suspense } from "react";
import Hero from "./Components/Hero/Hero";
import HomeContent from "./home/page";
import Loading from "./home/loading";
export default function Home() {
  return (
    <>
      <main>
        <Hero/>
        {/* main page - section 1 - increase */}
        <Suspense fallback={<Loading/>}>
          <HomeContent/>
        </Suspense>
      </main>
    </>
  );
}