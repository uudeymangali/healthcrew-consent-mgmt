"use client"; // ✅ Must be at the top for client components

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ConsentPage() {
  const router = useRouter();
  const params = useParams(); // ✅ useParams hook in client components
  // Ensure token is a string for decodeURIComponent
  const rawToken = params.token;
  const token = decodeURIComponent(typeof rawToken === "string" ? rawToken : Array.isArray(rawToken) ? rawToken[0] ?? "" : "");

  const [loading, setLoading] = useState(false);

  const handleConsent = (status: "Accepted" | "Declined") => {
    setLoading(true);
    const stored = JSON.parse(localStorage.getItem("consents") || "{}");
    stored[token] = status;
    localStorage.setItem("consents", JSON.stringify(stored));
    setTimeout(() => {
      router.push(status === "Accepted" ? "/success" : "/decline");
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Consent Form</h1>
      <p className="mb-4">Hello {token}, please accept or decline consent.</p>
      <div className="flex gap-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => handleConsent("Accepted")}
          disabled={loading}
        >
          Accept
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => handleConsent("Declined")}
          disabled={loading}
        >
          Decline
        </button>
      </div>
    </div>
  );
}