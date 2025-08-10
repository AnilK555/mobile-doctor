"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100 px-2">
      <form
        className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200"
        onSubmit={handleRegister}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-tight">Create Account</h2>
        {error && <div className="mb-4 text-red-500 text-center font-semibold">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center font-semibold">{success}</div>}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 placeholder-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Choose a password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-bold text-lg shadow hover:bg-green-700 transition duration-150 mb-4"
        >
          Register
        </button>
        <div className="text-center mt-2">
          <span className="text-gray-600">Already have an account?</span>
          <a href="/login" className="ml-2 text-blue-600 hover:underline font-semibold">Login</a>
        </div>
      </form>
    </div>
  );
}
