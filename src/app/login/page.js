"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 px-2">
      <form
        className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200"
        onSubmit={handleLogin}
      >
            <h2 className="text-3xl font-extrabold mb-8 text-center text-[#111]! tracking-tight">
          Sign In
        </h2>
        {error && (
          <div className="mb-4 text-red-700 text-center font-semibold">
            {error}
          </div>
        )}
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-[#111]">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-[#111]! placeholder-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-8">
            <label className="block mb-2 text-sm font-medium text-[#111]">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-[#111]! placeholder-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition duration-150 mb-4"
        >
          <span className="text-white">Sign In</span>
        </button>
        <div className="text-center mt-2">
          <span className="text-gray-600">Not registered?</span>
          <a
            href="/register"
            className="ml-2 text-blue-600 hover:underline font-semibold"
          >
            Create an account
          </a>
        </div>
      </form>
    </div>
  );
}
