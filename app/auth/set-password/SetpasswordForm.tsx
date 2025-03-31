"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { colors } from "@/components/style/theme";
import { apiCall } from "@/api/fetchData";
import { API_ENDPOINTS, BASE_URL } from "@/lib/constants/constants";

// Create a client component that safely uses useSearchParams
export function SetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      router.replace("/auth/forgot-password");
    }
  }, [email, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await apiCall({
        method: "POST",
        url: `${BASE_URL}${API_ENDPOINTS.CHANGE_PASSWORD}`,
        body: {
          email,
          newPassword: formData.newPassword,
        },
      });

      router.push("/auth/login?passwordReset=true");
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        form: "Failed to reset password. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <div className="w-full max-w-md">
      <h1
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: colors.lightPurple }}
      >
        Craft a New Verse
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-700 text-white ${
              errors.newPassword
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-600 focus:ring-purple-200"
            }`}
            placeholder="••••••••"
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-700 text-white ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-600 focus:ring-purple-200"
            }`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {errors.form && (
          <p className="text-sm text-center text-red-500">{errors.form}</p>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            style={{
              background: `linear-gradient(90deg, ${colors.darkPurple} 0%, ${colors.darkPink} 100%)`,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Resetting..." : "Set New Verse"}
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <Link
          href="/auth/login"
          className="text-sm font-medium"
          style={{ color: colors.lightPurple }}
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
