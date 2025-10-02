import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Login failed", err.message);
        alert(`Login failed: ${err.message}`);
      } else {
        console.error("Login failed", err);
        alert("Login failed: Unknown error");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10 animate-fade-in-down">
        <h1 className="text-3xl font-extrabold text-yellow-500 mb-2 text-center">
          Welcome Back 👋
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Sign in to your account to continue
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 text-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-200"
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 text-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-200"
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              to="/passwordRest"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-yellow-500 hover:text-yellow-600 hover:underline transition"
            >
              Forgot?
            </Link>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400 transition"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg active:scale-95 transition-all duration-150"
            type="submit"
          >
            Sign In
          </button>
        </form>

        {/* Signup link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/Account"
            className="text-yellow-500 font-medium hover:underline hover:text-yellow-600 transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
