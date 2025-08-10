"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAccessoryPage() {
  const [form, setForm] = useState({ name: "", brand: "", model: "", type: "", count: "", details: "", image: "", color: "" });
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const router = useRouter();

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      if (file.size > 1024 * 1024) {
        setError("Image size must be less than 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    // Validate all fields
    for (const key of ["name", "brand", "model", "type", "count", "details", "image", "color"]) {
      if (!form[key]) {
        setError("All fields are required, including image and color.");
        return;
      }
    }
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/accessories", {
        method: "POST",
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
        setError(data.error || "Failed to add accessory");
      }
    } catch {
      setError("Network error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 px-2">
      <form className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-pink-200" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-extrabold mb-8 text-center text-pink-600 tracking-tight">Add Accessory</h2>
        {error && <div className="mb-4 text-red-500 text-center font-semibold">{error}</div>}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-pink-700">Name</label>
          <input name="name" type="text" placeholder="Name" className="w-full px-4 py-2 border border-pink-300 rounded-lg text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-red-700">Colour</label>
          <input name="color" type="text" placeholder="Colour (e.g. Black, Blue, Red)" className="w-full px-4 py-2 border border-red-300 rounded-lg text-red-900 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white" value={form.color} onChange={handleChange} required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-yellow-700">Brand</label>
          <input name="brand" type="text" placeholder="Brand" className="w-full px-4 py-2 border border-yellow-300 rounded-lg text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white" value={form.brand} onChange={handleChange} required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-blue-700">Model</label>
          <input name="model" type="text" placeholder="Model (e.g. iPhone 14, Galaxy S23)" className="w-full px-4 py-2 border border-blue-300 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" value={form.model || ""} onChange={handleChange} />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-green-700">Type</label>
          <input name="type" type="text" placeholder="Type (case, cover, earphone, etc.)" className="w-full px-4 py-2 border border-green-300 rounded-lg text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" value={form.type} onChange={handleChange} required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-purple-700">Count</label>
          <input name="count" type="number" placeholder="Count" className="w-full px-4 py-2 border border-purple-300 rounded-lg text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white" value={form.count} onChange={handleChange} min={0} required />
        </div>
        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium text-indigo-700">Details</label>
          <textarea name="details" placeholder="Details" className="w-full px-4 py-2 border border-indigo-300 rounded-lg text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" value={form.details} onChange={handleChange} required />
        </div>
        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium text-pink-700">Image</label>
          <input name="image" type="file" accept="image/*" className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" onChange={handleChange} required />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg shadow w-full h-40 object-cover" />
          )}
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white py-2 rounded-lg font-bold text-lg shadow hover:from-pink-600 hover:to-blue-600 transition duration-150">Add Accessory</button>
      </form>
    </div>
  );
}
