import { Suspense } from "react";
import Loading from "../loading";
import CategoryContent from "./CatagoryContent";
import { fetchJson } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const category = await fetchJson(
      `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`
    );
    if (category?.nameBn) {
      return {
        title: `${category.nameBn} - বাজার দর`,
        description: `${category.nameBn} এর আজকের বাজারদর ও পরিবর্তন`,
      };
    }
  } catch {
    // fallback
  }
  return {
    title: "ক্যাটাগরি পণ্য | বাজার দর",
  };
}

export default function ProductCategoryPage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <CategoryDetails params={params} />
    </Suspense>
  );
}

async function CategoryDetails({ params }) {
  const { slug } = await params;

  let products = [];
  try {
    products = await fetchJson(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`
    );
  } catch (error) {
    console.error(`Failed to load category products for ${slug}:`, error);
    return (
      <main className="min-h-screen bg-[#f0f5f0] px-4 py-12 text-center text-gray-600">
        <p className="text-lg font-semibold text-gray-700">
          ক্যাটাগরির তথ্য এখন লোড করা যাচ্ছে না।
        </p>
        <p className="mt-2 text-sm text-gray-500">
          অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করুন।
        </p>
      </main>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <main className="min-h-screen bg-[#f0f5f0] px-4 py-12 text-center text-gray-600">
        <p className="text-lg font-semibold text-gray-700">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      </main>
    );
  }

  return <CategoryContent categoryData={products} />;
}
