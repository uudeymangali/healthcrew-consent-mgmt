"use client";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Thank You!</h1>
      <p className="mb-4">You have successfully given consent.</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => router.push("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
}