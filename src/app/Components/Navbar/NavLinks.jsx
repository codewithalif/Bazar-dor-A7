"use client";

import useApi from "@/app/useAPI/useAPI";
import Link from "next/link";
import React, { useState } from "react";

const NavLinks = () => {
  const { data: categories, loading, error } = useApi(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  const [activeCategory, setActiveCategory] = useState("");

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-5 overflow-x-auto px-4 py-3 sm:gap-6 sm:px-5 md:gap-8 md:px-6 lg:gap-9 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {loading ? (
            <p className="shrink-0 text-sm text-gray-500">
              Loading...
            </p>
          ) : error ? (
            <p className="shrink-0 text-sm text-gray-500">
              ক্যাটাগরির তথ্য লোড করা যাচ্ছে না।
            </p>
          ) : (
            (categories || []).map((category) => {
              const isActive = activeCategory === category.slug;

              return (
                <Link href={`/products/${category.slug}`} key={category.id}>
                 <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.slug)}
                  className={`group flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 sm:text-[15px] ${
                    isActive
                      ? "text-green-600"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <span className="text-[17px] leading-none transition-transform duration-200 group-hover:scale-110 sm:text-[18px]">
                    {category.icon}
                  </span>

                  <span>{category.nameBn}</span>
                </button>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;