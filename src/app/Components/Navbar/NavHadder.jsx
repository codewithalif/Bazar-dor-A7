
'use client'

import Link from "next/link";
import NavLinks from "./NavLinks";
import { authClient } from "@/lib/auth-client";
import Marque from "./Marque";
import { useEffect, useState } from "react";

const NavHadder = () => {
  const [banglaDate, setBanglaDate] = useState("");

  // ADDED: tarikh shudhu browser-e set hobe
  useEffect(() => {
    setBanglaDate(
      new Date().toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600">
            <span className="text-lg text-white">🌿</span>
          </div>

          <div>
            <h1 className="text-lg font-bold leading-tight text-gray-900">
              বাজার দর
            </h1>
            <p className="text-[10px] text-gray-500">
              {banglaDate}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {isPending ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : session ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-100"
              >

                <span className="max-w-28 truncate text-sm font-semibold text-gray-800">
                  {session.user.name}
                </span>
              </Link>

              <button
                onClick={handleSignOut}
                className="rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <NavLinks />
      <Marque/>
    </header>
  );
};

export default NavHadder;