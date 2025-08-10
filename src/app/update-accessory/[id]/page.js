"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateAccessoryPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [form, setForm] = useState({ name: "", brand: "", model: "", type: "", color: "", count: 0, details: "", image: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAccessory() {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/accessories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setForm(data);
      } else {
        setError("Failed to fetch accessory");
      }
      setLoading(false);
    }
    if (id) fetchAccessory();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/accessories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update accessory");
      }
    } catch {
      setError("Network error");
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Update Accessory</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <input name="name" type="text" placeholder="Name" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.name} onChange={handleChange} required />
        <input name="brand" type="text" placeholder="Brand" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.brand} onChange={handleChange} required />
        <input name="model" type="text" placeholder="Model (e.g. iPhone 14, Galaxy S23)" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.model} onChange={handleChange} required />
        <input name="type" type="text" placeholder="Type (case, cover, earphone, etc.)" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.type} onChange={handleChange} required />
        <input name="color" type="text" placeholder="Colour (e.g. Black, Blue, Red)" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400" value={form.color} onChange={handleChange} required />
        <input name="count" type="number" placeholder="Count" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.count} onChange={handleChange} min={0} required />
        <textarea name="details" placeholder="Details" className="w-full mb-6 px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.details} onChange={handleChange} />
        <input name="image" type="text" placeholder="Image (base64 or url)" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400" value={form.image} onChange={handleChange} required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Update Accessory</button>
      </form>
    </div>
  );
}
