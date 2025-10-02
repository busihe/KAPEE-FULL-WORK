import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (register) {
        await register(username, email, password);
        setSuccess("Registration successful! Please log in to continue.");

        // Redirect to login after 5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        setError("Registration function is not available");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-8 animate-fade-in-down">
        <h1 className="text-3xl font-extrabold text-yellow-500 mb-2 text-center">
          Create Account 📝
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Join us to start shopping and track your orders.
        </p>

        {success && (
          <div className="mb-4 text-sm text-green-600 text-center font-medium border border-green-200 bg-green-50 p-2 rounded">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-600 text-center font-medium border border-red-200 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            name="username"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 text-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-200"
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 text-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-200"
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 text-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-200"
          />
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 text-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-200"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg active:scale-95 transition-all duration-150"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-yellow-500 font-medium hover:underline hover:text-yellow-600 transition"
            >
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
