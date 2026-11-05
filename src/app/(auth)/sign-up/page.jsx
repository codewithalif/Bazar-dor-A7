"use client";


import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";


const SignUpPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);
  
  const { data, error } = await authClient.signUp.email({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    callbackURL: "/"
  });

  if (error) {
    toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
    setLoading(false);
    return;
  }
  toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!")
  
  console.log("Signup successful:", data);
  
  setLoading(false);
  setTimeout(() => {
    router.push("/");
  }, 1000);
};

// Google login
const handleGoogleLogin = async () => {
  setError("");
  setSocialLoading(true);

  try {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google login করা যায়নি।");
      setSocialLoading(false);
    }
  } catch (error) {
    console.error(error);
    toast.error("Google login করা যায়নি।");
    setSocialLoading(false);
  }
};

// github log in

const handleGithubLogin = async () => {
  setError("");
  setSocialLoading(true);

  try {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "GitHub login করা যায়নি।");
      setSocialLoading(false);
    }
  } catch (error) {
    console.error(error);
    toast.error("GitHub login করা যায়নি।");
    setSocialLoading(false);
  }
};



  const handleSocialLogin = (provider) => {
    setError("");
    setSocialLoading(true);

    console.log(`${provider} login clicked`);

  
  };

  return (
    <main className="min-h-screen  px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[475px]">
        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#202b25] sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-[#dce5de] bg-[#fafffb] p-6 shadow-sm sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#202b25]"
              >
                নাম
              </label>

              <input
              name="name"
                id="name"
                type="text"
                placeholder="যেমন: রহিম উদ্দিন"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-lg border border-[#dce5de] bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#202b25]"
              >
                ইমেইল
              </label>

              <input
                name="email"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-lg border border-[#dce5de] bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#202b25]"
              >
                পাসওয়ার্ড
              </label>

              <input
              name="password"
                id="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="h-12 w-full rounded-lg border border-[#dce5de] bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Confirm Password */}
            {/* <div>
              <label
                
                className="mb-2 block text-sm font-medium text-[#202b25]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                
                placeholder="আবার লিখুন"
               
                
                required
                minLength={8}
                className="h-12 w-full rounded-lg border border-[#dce5de] bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div> */}

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg bg-green-600 text-sm font-semibold text-white shadow-[0_3px_0_#087a36] transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-sm text-gray-500">অথবা</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Google */}
            <button
  type="button"
  disabled={socialLoading || loading}
  onClick={handleGoogleLogin}
  className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#dce5de] bg-white text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
>
  <span className="text-base font-bold text-[#4285F4]">
    G
  </span>

  <span>Google দিয়ে চালিয়ে যান</span>
</button>

            {/* GitHub */}
            <button
  type="button"
  disabled={socialLoading || loading}
  onClick={handleGithubLogin}
  className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#dce5de] bg-white text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.089 2.91.833.092-.647.35-1.089.636-1.34-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.523 2 12 2z" />
  </svg>

  <span>GitHub দিয়ে চালিয়ে যান</span>
</button>
          </div>

          {/* Sign In */}
          <p className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-green-600 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back */}
        <div className="mt-7 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-gray-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;