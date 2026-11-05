"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const result = await authClient.updateUser({
        name,
      });

      if (result.error) {
        setMessage(result.error.message || "Name update failed.");
        return;
      }

      setMessage("Name updated successfully!");
      
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <p className="p-8 text-center">Loading profile...</p>;
  }

  if (!session) {
    return (
      <div className="p-8 text-center">
        <p>Please sign in to view your profile.</p>

        <button
          onClick={() => router.push("/sign-in")}
          className="mt-4 rounded-lg bg-green-600 px-5 py-2 text-white"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-5 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Profile</h1>

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={1}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              placeholder={session.user.name || "Enter your name"}
            />
          </div>

          {message && (
            <p role="status" className="text-sm text-gray-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}