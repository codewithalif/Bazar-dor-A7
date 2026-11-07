import { Suspense } from "react";
import Loading from "../loading"
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { fetchJson } from "@/lib/api";

const formatPrice = (value) => {
  return Number(value ?? 0).toLocaleString("bn-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function HomeDetailsPage({ params }) {

  

  return (
    <Suspense fallback={<Loading/>}>
      <HomeDetails params={params} />
    </Suspense>
  );
}

async function HomeDetails({ params }) {

  const { id } = await params;

  let item;
  try {
    item = await fetchJson(
      `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
    );
  } catch (error) {
    console.error(`Failed to load product ${id}:`, error);
    return (
      <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-center text-gray-600">
        পণ্যের তথ্য এখন লোড করা যাচ্ছে না। কিছুক্ষণ পরে আবার চেষ্টা করুন।
      </main>
    );
  }

  const sortedMarkets = [...item.markets].sort((a, b) => a.min - b.min);

  const sortedMarkets2 = [...item.markets].sort((a, b) => b.max - a.max);

  const lowestprice = sortedMarkets[0].min;
  const highestprice = sortedMarkets2[0].max;

  const averagePrice = (highestprice + lowestprice) / 2;
  // const averagePrice = formatPrice(avarage);

  console.log(lowestprice);
  console.log(highestprice);
  console.log(averagePrice);

  return (
    <div>
      <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-[#202923] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-xs text-gray-500">
            <span>হোম</span>
            <span>›</span>
            <span>{item.categoryNameBn}</span>
            <span>›</span>
            <span>{item.nameBn}</span>
          </div>
          {/* 
        {/* Product Header */}
          <section className="mb-3 flex flex-col justify-between gap-4 rounded-xl border border-[#e1e9e1] bg-white/80 p-4 sm:flex-row sm:items-center sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
                {item.image || item.categoryIcon}
              </div>

              <div>
                <h1 className="text-lg font-bold sm:text-xl">{item.nameBn}</h1>

                <p className="mt-1 text-xs text-gray-500">
                  প্রতি কেজি {item.nameBn}
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  গতকালের তুলনায় আজ দাম বেড়েছে · {item.today - item.yesterday}{" "}
                  টাকা
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-5 rounded-xl bg-[#f0f5f0] px-4 py-3 sm:block sm:text-right">
              <div>
                <p className="text-xs text-gray-500">আজকের বাজারদর</p>

                <p className="text-2xl font-bold">৳{item.today}</p>

                <p className="text-xs text-gray-500">টাকা / কেজি</p>
              </div>

              <p
                className={`mt-1 text-xs font-semibold ${
                  item.change?.dir === "up" ? "text-red-600" : "text-green-600"
                }`}
              >
                {item.change?.dir === "up" ? "▲" : "▼"} {item.change?.pct ?? 0}%
              </p>
            </div>
          </section>

          
          <section className="mb-3 rounded-xl border border-[#e1e9e1] bg-white/80 p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-bold">দামের সারসংক্ষেপ</h2>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="flex flex-col gap-1 rounded-xl bg-[#f0f5f0] p-3 text-center">
                <p className="text-xs text-gray-500">সর্বনিম্ন</p>
                <p className="text-lg text-green-400 font-bold">
                  ৳{formatPrice(lowestprice)}{" "}
                </p>
                <p className="text-xs text-gray-500">টাকা / কেজি</p>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-[#f0f5f0] p-3 text-center">
                <p className="text-xs text-gray-500">সর্বোচ্চ</p>
                <p className="text-lg text-red-400 font-bold">
                  ৳{formatPrice(highestprice)}
                </p>
                <p className="text-xs text-gray-500">টাকা / কেজি</p>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-[#f0f5f0] p-3 text-center">
                <p className="text-xs text-gray-500">গড়</p>
                <p className="text-lg text-blue-400 font-bold">
                  ৳{formatPrice(averagePrice)}
                </p>
                <p className="text-xs text-gray-500">টাকা / কেজি</p>
              </div>
            </div>
          </section>

          
          <section className="rounded-xl border border-[#e1e9e1] bg-white/80 p-4 sm:p-5">
            <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <h2 className="text-sm font-bold">বাজারভিত্তিক আজকের দাম</h2>

              <p className="text-xs text-gray-500">
                মোট {formatPrice(item.markets.length)}টি বাজার
              </p>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#e1e9e1]">
              <table className="w-full min-w-150 border-collapse text-left text-xs">
                <thead className="bg-[#f7faf7] text-gray-600">
                  <tr>
                    <th className="px-3 py-3 font-medium">বাজার</th>
                    <th className="px-3 py-3 font-medium">বিভাগ</th>
                    <th className="px-3 py-3 text-right font-medium">
                      সর্বনিম্ন
                    </th>
                    <th className="px-3 py-3 text-right font-medium">
                      সর্বোচ্চ
                    </th>
                    <th className="px-3 py-3 text-right font-medium">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {item.markets.map((market, index) => {
                    const marketAverage = (market.min + market.max) / 2;

                    return (
                      <tr
                        key={index}
                        className="border-t border-[#e1e9e1] transition-colors hover:bg-[#f0f5f0]"
                      >
                        <td className="whitespace-nowrap px-3 py-3 font-medium">
                          {market.market}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-gray-600">
                          {market.division}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-right">
                          ৳{formatPrice(market.min)}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-right">
                          ৳{formatPrice(market.max)}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-right font-semibold">
                          ৳{formatPrice(marketAverage)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-gray-500"></div>
          </section>
        </div>
      </main>
    </div>
  );
}