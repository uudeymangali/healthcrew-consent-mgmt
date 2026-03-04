"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { useRouter } from "next/navigation";

// Nurse interface
interface Nurse {
  name: string;
  specialty: string;
  license_state: string;
  city: string;
  email: string;
}

// Typed parse result for PapaParse
interface ParseResult<T> {
  data: T[];
  errors: any[];
  meta: any;
}

export default function LandingPage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const router = useRouter();

  // Load CSV data
  useEffect(() => {
    fetch("/data/nurses.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<Nurse>) => {
            setNurses(results.data as Nurse[]);
          },
        });
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to HealthCrew AI</h1>
      <p className="mb-4">Click "Join Now" to give consent.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {nurses.map((nurse) => (
          <div
            key={nurse.email}
            className="p-4 bg-white rounded shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold">{nurse.name}</h2>
            <p>
              {nurse.specialty} - {nurse.city}
            </p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() =>
                router.push(`/consent/${encodeURIComponent(nurse.email)}`)
              }
            >
              Join Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}