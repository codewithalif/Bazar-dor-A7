"use client";

import useApi from "@/app/useAPI/useAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

export default function ProductMarquee() {
  const {data, error} = useApi("https://openapi.programming-hero.com/api/bazardor/products")
  const loading = !data && !error;


  const result = Array.isArray(data)
    ? data
    : (data?.products ?? data?.data?.products ?? data?.data ?? []);
  const products = result.slice(0, 10);

  if (loading) {
    return (
      <div className="border-y border-gray-200 px-4 py-3 text-sm text-gray-500">
        পণ্যের তথ্য লোড হচ্ছে...
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-y border-gray-200 px-4 py-3 text-sm text-gray-500">
        পণ্যের তথ্য লোড করা যাচ্ছে না।
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="border-y border-gray-200 bg-white">
      <Marquee speed={40} pauseOnHover gradient={false} autoFill>
        {products.map((product, index) => {
          const change = product.change;
          const isUp = change?.dir === "up";
          const isDown = change?.dir === "down";

          return (
            <Link href={`/home/${product.id}`} key={product.id} className="group">
             <div
              key={product.id ?? product._id ?? index}
              className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-5 py-2.5 text-sm"
            >
              <span className="font-medium text-gray-800">
                {product.nameBn ?? product.title ?? "পণ্য"}
              </span>

              <span className="whitespace-nowrap text-gray-700">
                {Number(product.today ?? 0).toLocaleString("bn-BD")} টাকা
              </span>

              {change && (
                <span
                  className={`whitespace-nowrap font-semibold ${
                    isUp
                      ? "text-red-600"
                      : isDown
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "●"}{" "}
                  {Number(change.pct ?? 0).toLocaleString("bn-BD")}%
                </span>
              )}
            </div>
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}