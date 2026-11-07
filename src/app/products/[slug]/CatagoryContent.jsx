'use client';

import Link from "next/link";
import { useState } from "react";

const formatPrice = (value) => {
  return Number(value ?? 0).toLocaleString("bn-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const CategoryContent = ({ categoryData = [] }) => {
  const [sortOption, setSortOption] = useState("default");

  const products = Array.isArray(categoryData) ? categoryData : [];

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-low") return (a.today ?? 0) - (b.today ?? 0);
    if (sortOption === "price-high") return (b.today ?? 0) - (a.today ?? 0);
    if (sortOption === "change-low")
      return (a.change?.pct ?? 0) - (b.change?.pct ?? 0);
    return 0; // default
  });

  const categoryName = products[0]?.categoryNameBn || "ক্যাটাগরি";
  const categoryIcon = products[0]?.categoryIcon || products[0]?.image || "🛒";

  return (
    <div>
      <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-[#202923] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:underline">
              হোম
            </Link>
            <span>›</span>
            <span>ক্যাটাগরি</span>
            <span>›</span>
            <span className="font-semibold text-gray-800">{categoryName}</span>
          </div>

          {/* Header Card */}
          <div className="my-6 flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-[#f8faf7] p-5 shadow-sm md:p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#e8f0e8] text-3xl">
              {categoryIcon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {categoryName}
              </h1>
              <p className="text-sm font-medium text-slate-500">
                {formatPrice(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="my-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-[#f8faf7] p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-600">
              মোট পণ্য:{" "}
              <span className="font-bold text-slate-800">
                {formatPrice(products.length)}টি
              </span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">সাজান</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="cursor-pointer rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 focus:outline-none"
              >
                <option value="default">ডিফল্ট</option>
                <option value="price-low">মূল্য: সর্বনিম্ন থেকে সর্বোচ্চ</option>
                <option value="price-high">মূল্য: সর্বোচ্চ থেকে সর্বনিম্ন</option>
                <option value="change-low">পরিবর্তন: সর্বনিম্ন থেকে সর্বোচ্চ</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((product) => {
              const diff = (product.today ?? 0) - (product.yesterday ?? 0);
              const isUp = product.change?.dir === "up";

              return (
                <Link
                  href={`/home/${product.id}`}
                  key={product.id}
                  className="group"
                >
                  <div className="rounded-lg border border-[#e1e9e1] bg-white/80 p-4 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
                        {product.image || product.categoryIcon || "🛒"}
                      </div>
                      {product.change && (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                            isUp
                              ? "bg-red-50 text-red-600"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          {isUp ? "▲" : "▼"} {formatPrice(product.change?.pct)}%
                        </span>
                      )}
                    </div>

                    <h2 className="mt-3 text-lg font-semibold text-gray-800">
                      {product.nameBn}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      প্রতি {product.unit === "kg" ? "কেজি" : product.unit}{" "}
                      {product.nameBn}
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-900">
                      আজকের দর: ৳{formatPrice(product.today)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {diff > 0
                        ? `গতকালের তুলনায় আজ দাম ${formatPrice(diff)} টাকা বেড়েছে`
                        : diff < 0
                        ? `গতকালের তুলনায় আজ দাম ${formatPrice(Math.abs(diff))} টাকা কমেছে`
                        : "গতকালের তুলনায় দাম অপরিবর্তিত"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryContent;
