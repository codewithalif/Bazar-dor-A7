import React from "react";
import Section1 from "../Components/HomePage/Section1";
import { fetchJson } from "@/lib/api";

const home = async () => {
  let posts;
  try {
    posts = await fetchJson(
      "https://openapi.programming-hero.com/api/bazardor/products",
    );
  } catch (error) {
    console.error("Failed to load products:", error);
    return (
      <main className="mt-14 text-center text-gray-600">
        পণ্যের তথ্য এখন লোড করা যাচ্ছে না। কিছুক্ষণ পরে আবার চেষ্টা করুন।
      </main>
    );
  }

  if (!Array.isArray(posts)) {
    console.error("Failed to load products: API returned an unexpected format");
    return (
      <main className="mt-14 text-center text-gray-600">
        পণ্যের তথ্য এখন লোড করা যাচ্ছে না। কিছুক্ষণ পরে আবার চেষ্টা করুন।
      </main>
    );
  }

  const UpPosts = Array.isArray(posts)
    ? posts.filter((item) => item?.change?.dir === "up")
    : [];

  const downPosts = Array.isArray(posts)
    ? posts.filter((item) => item?.change?.dir === "down")
    : [];
  console.log(UpPosts);
  const sortedPosts = UpPosts.sort(
    (a, b) => Number(b.change?.pct ?? 0) - Number(a.change?.pct ?? 0),
  ).slice(0, 6);

  const downsortedPosts = downPosts
    .sort((a, b) => Number(b.change?.pct ?? 0) - Number(a.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <div className="w-full px-3 py-5 sm:px-5 sm:py-8 lg:px-8 lg:py-10">

      {/* আজ দাম বেড়েছে */}

      <div className="mt-14">
        <h1 className="text-lg font-bold my-4 text-[#202B25]">
          {" "}
          <span></span> আজ দাম বেড়েছে
        </h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((item) => (
            <Section1 key={item.id} item={item} />
          ))}
        </div>
      </div>
          
      {/* আজ দাম কমেছে */}
      <div className="mt-14">
        <h1 className="text-lg font-bold my-4 text-[#202B25]">
          {" "}
          <span></span> আজ দাম কমেছে
        </h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {downsortedPosts.map((item) => (
            <Section1 key={item.id} item={item} />
          ))}
        </div>
      </div>


      {/* সব পণ্য */}
      <div id="all-products" className="mt-14">
        <h1 className="text-lg font-bold my-4 text-[#202B25]"> সব পণ্য</h1>
        <p className="text-gray-600 mb-5" >{posts.length} টি পণ্য পাওয়া গেছে</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((item) => (
            <Section1 key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default home;