"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";

interface Nurse {
  name: string;
  specialty: string;
  license_state: string;
  city: string;
  email: string;
}

interface ParseResult<T> {
  data: T[];
  errors: any[];
  meta: any;
}

export default function DashboardPage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [consents, setConsents] = useState<{ [key: string]: string }>({});
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBySpecialty, setSortBySpecialty] = useState<"asc" | "desc">("asc");

  // Load CSV data
  useEffect(() => {
    fetch("/data/nurses.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<Nurse>) => setNurses(results.data),
        });
      });
  }, []);

  // Load consent status from localStorage
  useEffect(() => {
    const storedConsents = JSON.parse(localStorage.getItem("consents") || "{}");
    setConsents(storedConsents);
  }, []);

  // Filtered + sorted nurses
  const displayedNurses = nurses
    .filter((n) => {
      const status = consents[n.name] || "Pending";
      return (
        n.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterStatus === "All" || status === filterStatus)
      );
    })
    .sort((a, b) =>
      sortBySpecialty === "asc"
        ? a.specialty.localeCompare(b.specialty)
        : b.specialty.localeCompare(a.specialty)
    );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">HealthCrew AI Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/3"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/4"
        >
          <option value="All">All Statuses</option>
          <option value="Accepted">Accepted</option>
          <option value="Declined">Declined</option>
          <option value="Pending">Pending</option>
        </select>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() =>
            setSortBySpecialty(sortBySpecialty === "asc" ? "desc" : "asc")
          }
        >
          Sort by Specialty ({sortBySpecialty})
        </button>
      </div>

      {/* Nurse Table */}
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Specialty</th>
            <th className="py-2 px-4">State</th>
            <th className="py-2 px-4">City</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Consent Status</th>
          </tr>
        </thead>
        <tbody>
          {displayedNurses.map((nurse) => {
            const status = consents[nurse.name] || "Pending";
            const rowColor =
              status === "Accepted"
                ? "bg-green-50"
                : status === "Declined"
                ? "bg-red-50"
                : "bg-white";

            const statusColor =
              status === "Accepted"
                ? "text-green-600"
                : status === "Declined"
                ? "text-red-600"
                : "text-gray-600";

            return (
              <tr key={nurse.name} className={`border-b hover:bg-gray-100 ${rowColor}`}>
                <td className="py-2 px-4">{nurse.name}</td>
                <td className="py-2 px-4">{nurse.specialty}</td>
                <td className="py-2 px-4">{nurse.license_state}</td>
                <td className="py-2 px-4">{nurse.city}</td>
                <td className="py-2 px-4">{nurse.email}</td>
                <td className={`py-2 px-4 font-semibold ${statusColor}`}>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}