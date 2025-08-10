"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const [accessories, setAccessories] = useState([]);
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchAccessories() {
      setLoading(true);
      const token = localStorage.getItem("token");
  let url = `/api/accessories`;

      const params = [];
      if (brand) params.push(`brand=${brand}`);
      if (type) params.push(`type=${type}`);
        if (color) {
          const normalizedColor = color.toLowerCase().trim();
          console.log("[Dashboard] Sending color filter:", normalizedColor);
          params.push(`color=${encodeURIComponent(normalizedColor)}`);
        }
      if (params.length) url += `?${params.join("&")}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAccessories(data);
      setLoading(false);
    }
    fetchAccessories();
  }, [brand, type, color]);

  useEffect(() => {
    async function fetchDropdowns() {
      const token = localStorage.getItem("token");
      const [brandsRes, colorsRes, typesRes] = await Promise.all([
        fetch("/api/accessories/brands", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/accessories/colors", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/accessories/types", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      if (brandsRes.ok) setBrands(await brandsRes.json());
      if (colorsRes.ok) setColors(await colorsRes.json());
      if (typesRes.ok) setTypes(await typesRes.json());
    }
    fetchDropdowns();
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-2 md:p-8 flex flex-col items-center">
  <div className="w-full h-full text-gray-900 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 text-gray-900">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black drop-shadow-2xl backdrop-blur-lg rounded-xl px-4 py-2 transition-all duration-500 border border-white/30 shadow-lg" style={{textShadow: '0 2px 8px rgba(0,0,0,0.55)'}}>
            Accessories Dashboard
          </h1>
          <div className="flex gap-3">
            <Link
              href="/add-accessory"
              className="relative px-6 py-2 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-400"
              style={{ overflow: 'hidden' }}
            >
              <span className="absolute inset-0 opacity-20 bg-white rounded-xl pointer-events-none animate-pulse"></span>
              <span className="relative z-10">Add Accessory</span>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="relative px-6 py-2 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-red-500 via-yellow-400 to-pink-500 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-400"
              style={{ overflow: 'hidden' }}
            >
              <span className="absolute inset-0 opacity-20 bg-white rounded-xl pointer-events-none animate-pulse"></span>
              <span className="relative z-10">Logout</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:gap-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-xl bg-white/60 backdrop-blur-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/3 transition-all duration-300"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="" className="bg-white text-gray-900">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b} className="bg-white text-gray-900">{b}</option>
            ))}
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-xl bg-white/60 backdrop-blur-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/3 transition-all duration-300"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="" className="bg-white text-gray-900">All Colours</option>
            {colors.map((c) => (
              <option key={c} value={c} className="bg-white text-gray-900">{c}</option>
            ))}
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-xl bg-white/60 backdrop-blur-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/3 transition-all duration-300"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" className="bg-white text-gray-900">All Types</option>
            {types.map((t) => (
              <option key={t} value={t} className="bg-white text-gray-900">{t}</option>
            ))}
          </select>
        </div>
      {loading ? (
  <div className="text-center text-lg text-gray-900">Loading...</div>
      ) : accessories.length === 0 ? (
  <div className="text-center text-xl font-semibold text-gray-900">
          No accessories found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {accessories.map((item, idx) => (
            <div
              key={item._id}
              className="p-6 rounded-2xl shadow-xl border border-white/30 bg-white/60 backdrop-blur-lg flex flex-col justify-between transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeIn"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h2 className="text-2xl font-bold mb-2 text-black drop-shadow-xl" style={{textShadow: '0 2px 6px rgba(0,0,0,0.45)'}}>{item.name}</h2>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={160}
                  className="rounded-xl shadow w-full h-40 object-cover mb-4 transition-all duration-500 hover:scale-105"
                  priority
                  unoptimized={item.image.startsWith('data:')}
                />
              )}
              <div className="mb-1 font-medium text-black">Brand: <span className="text-black">{item.brand}</span></div>
              <div className="mb-1 font-medium text-black">Model: <span className="text-black">{item.model}</span></div>
              <div className="mb-1 font-medium text-black">Type: <span className="text-black">{item.type}</span></div>
              <div className="mb-1 font-medium text-black">Colour: <span className="text-black">{item.color || "-"}</span></div>
              <div className="mb-1 font-medium text-black">Count: <span className="text-black">{item.count}</span></div>
              <div className="mb-4 font-medium text-black">Details: <span className="text-black">{item.details}</span></div>
              <div className="flex gap-3 mt-4">
                <Link
                  href={`/update-accessory/${item._id}`}
                  className="relative px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-400"
                  style={{ overflow: 'hidden' }}
                >
                  <span className="absolute inset-0 opacity-20 bg-white rounded-xl pointer-events-none animate-pulse"></span>
                  <span className="relative z-10">Update</span>
                </Link>
                <Link
                  href={`/delete-accessory/${item._id}`}
                  className="relative px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-400 via-yellow-400 to-red-400 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-400"
                  style={{ overflow: 'hidden' }}
                >
                  <span className="absolute inset-0 opacity-20 bg-white rounded-xl pointer-events-none animate-pulse"></span>
                  <span className="relative z-10">Delete</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
