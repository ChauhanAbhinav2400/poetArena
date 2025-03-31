"use client";

import { useState } from "react";

import Link from "next/link";
import { TOKEN_KEY, API_ENDPOINTS, BASE_URL } from "@/lib/constants/constants";
import { colors } from "@/components/style/theme";
import { setItem } from "@/lib/localStorage";
import { apiCall } from "@/api/fetchData";

export default function LoginPage() {
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await apiCall({
        method: "POST",
        url: `${BASE_URL}${API_ENDPOINTS.LOGIN}`,
        body: formData,
      });

      console.log(response, "response");
      if (response.token) {
        setItem(TOKEN_KEY, response.token);
        window.location.href = "/";
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev) => ({ ...prev, form: "Invalid email or password" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900">
      {/* Left side - Branding */}
      <div
        className="w-full md:w-2/5 lg:w-1/3 bg-gradient-to-br from-gray-800 to-gray-700 p-8 flex flex-col justify-between"
        style={{
          background: `linear-gradient(135deg, ${colors.darkPurple}aa, ${colors.darkPink}aa)`,
        }}
      >
        <div>
          <Link
            href={"/"}
            className="text-4xl font-bold py-2 relative overflow-hidden"
            style={{
              color: colors.lightPurple,
              textShadow: "2px 2px 4px rgba(128, 0, 128, 0.5)",
            }}
          >
            Shayri<span className="text-neon-purple">मंच</span>
          </Link>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Welcome Back, Shayar!
          </h2>
          <p className="text-gray-300 mb-6">
            Log in to share your verses and dive into the world of poetry.
          </p>
        </div>

        {/* Poetry-related shapes */}
        <div className="hidden md:block mb-4">
          <div className="relative h-64 w-full">
            {/* Quill */}
            <div
              className="absolute transform rotate-12"
              style={{ top: "10%", left: "40%" }}
            >
              <div
                className="h-16 w-2 rounded-full"
                style={{
                  backgroundColor: colors.darkPink,
                  transform: "rotate(45deg)",
                }}
              >
                <div
                  className="absolute top-0 w-8 h-4 bg-lightPink rounded-t-full"
                  style={{ left: "-14px", backgroundColor: colors.lightPink }}
                ></div>
              </div>
            </div>
            {/* Scroll */}
            <div
              className="absolute transform -rotate-6"
              style={{ top: "30%", left: "20%" }}
            >
              <div
                className="h-20 w-24 rounded-lg"
                style={{ backgroundColor: colors.darkPurple, opacity: 0.8 }}
              >
                <div className="h-2 w-2 bg-gray-300 rounded-full absolute top-2 left-2"></div>
                <div className="h-2 w-2 bg-gray-300 rounded-full absolute bottom-2 left-2"></div>
              </div>
            </div>
            {/* Inkpot */}
            <div className="absolute" style={{ top: "50%", left: "50%" }}>
              <div
                className="h-16 w-16 rounded-b-md rounded-t-sm"
                style={{ backgroundColor: colors.lightPurple, opacity: 0.7 }}
              >
                <div
                  className="h-4 w-12 bg-darkPurple absolute top-0 left-2"
                  style={{ backgroundColor: colors.darkPurple }}
                ></div>
              </div>
            </div>
            {/* Book */}
            <div
              className="absolute transform rotate-45"
              style={{ top: "20%", left: "70%" }}
            >
              <div
                className="h-14 w-20 rounded-sm"
                style={{ backgroundColor: colors.lightPink, opacity: 0.8 }}
              >
                <div className="h-full w-2 bg-gray-300 absolute left-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-3/5 lg:w-2/3 p-4 md:p-8 flex items-center justify-center bg-gray-800">
        <div className="w-full max-w-md">
          <h1
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: colors.lightPurple }}
          >
            Enter the Shayriमंच
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-700 text-white ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-600 focus:ring-purple-200"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-700 text-white ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-600 focus:ring-purple-200"
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium"
                style={{ color: colors.lightPurple }}
              >
                Forgot your verse?
              </Link>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer py-3 px-4 rounded-md text-white font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                style={{
                  background: `linear-gradient(90deg, ${colors.darkPurple} 0%, ${colors.darkPink} 100%)`,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Entering..." : "Enter Shayriमंच"}
              </button>
            </div>

            {errors.form && (
              <p className="text-sm text-center text-red-500">{errors.form}</p>
            )}

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                New to the Shayriमंच?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium"
                  style={{ color: colors.lightPurple }}
                >
                  Join Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
