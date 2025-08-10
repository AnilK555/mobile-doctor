"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function DeleteAccessoryPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(true);
  }, []);

  async function handleDelete() {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/accessories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete accessory");
      }
    } catch {
      setError("Network error");
    }
    setLoading(false);
  }

  if (!showModal) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border-4 border-red-200">
        <h2 className="text-3xl font-extrabold mb-6 text-red-600">
          Delete Accessory
        </h2>
        {error && (
          <div className="mb-4 text-red-500 font-semibold">{error}</div>
        )}
        <p className="mb-6 text-foreground font-medium">
          Are you sure you want to delete this accessory?
        </p>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-red-500 text-white py-2 rounded-lg font-bold text-lg shadow hover:from-pink-600 hover:to-red-600 transition mb-4"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="w-full bg-gray-300 text-foreground py-2 rounded-lg font-bold text-lg shadow hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
