'use client'
import Link from "next/link";
import { useState } from "react";

const formatPrice = (value) => {
  return Number(value ?? 0).toLocaleString("bn-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const CategoryContent =  ({ categoryData }) => {
    console.log(categoryData);
    const [sortOption, setSortOption] = useState("default");


  const sortedProducts = [...categoryData].sort((a, b) => {
    if (sortOption === "price-low") return a.today - b.today;
    if (sortOption === "price-high") return b.today - a.today;
    if (sortOption === "change-low") return a.change.pct - b.change.pct;
    return 0; // default
  });

  return (
    <div>

      <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-[#202923] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="bg-[#f8faf7] border my-8 border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-sm flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {categoryData[0]?.categoryNameBn}
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                {formatPrice(categoryData.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>


          </div>

        {/* Filter Bar */}
       <div className="bg-[#f8faf7] my-6 border  border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center justify-end gap-3">
          <span className="text-sm font-medium text-slate-600">সাজান</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-white border border-slate-300 text-slate-700 text-sm rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">মূল্য: সর্বনিম্ন থেকে সর্বোচ্চ</option>
            <option value="price-high">মূল্য: সর্বোচ্চ থেকে সর্বনিম্ন</option>
            <option value="change-low">পরিবর্তন: সর্বনিম্ন থেকে সর্বোচ্চ</option>
          </select>
        </div>

    

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((product) => (
                <Link href={`/home/${product.id}`} key={product.id} className="group">
                <div
                key={product.id}
                className="rounded-lg border border-[#e1e9e1] bg-white/80 p-4 shadow-sm transition-transform duration-300 hover:scale-105"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
                  {product.image || product.categoryIcon}
                </div>

                <h2 className="mt-2 text-lg font-semibold text-gray-800">
                  {product.nameBn}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  প্রতি কেজি {product.nameBn}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  গতকালের তুলনায় আজ দাম{" "}
                  {formatPrice(product.today - product.yesterday)} টাকা
                </p>
              </div>
                </Link>
            ))}
          </div>
        </div>
      </main>

    </div>
  );
};

export default CategoryContent;