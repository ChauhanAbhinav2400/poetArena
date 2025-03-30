"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { colors } from "@/components/style/theme";
import { apiCall } from "@/api/fetchData";
import { API_ENDPOINTS, BASE_URL } from "@/lib/constants/constants";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const validateEmail = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setLoading(true);
    try {
      await apiCall({
        method: "POST",
        url: `${BASE_URL}${API_ENDPOINTS.FORGOT_PASSWORD}`,
        body: { email },
      });

      setOtpSent(true);
      setErrors({});
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        form: "Failed to send OTP. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }

    setLoading(true);
    try {
      const response = await apiCall({
        method: "POST",
        url: `${BASE_URL}${API_ENDPOINTS.VERIFY_FORGOT_PASSWORD_OTP}`,
        body: { email, otp },
      });
      console.log(response, "response");

      if (response.success) {
        router.push(`/auth/set-password?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        form: "Invalid OTP. Please try again.",
      }));
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
          <div
            className="text-4xl font-bold py-2 relative overflow-hidden"
            style={{
              color: colors.lightPurple,
              textShadow: "2px 2px 4px rgba(128, 0, 128, 0.5)",
            }}
          >
            Shayari<span className="text-neon-purple">Verse</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            {!otpSent ? "Forgot Your Verse?" : "Verify Your Quill"}
          </h2>
          <p className="text-gray-300 mb-6">
            {!otpSent
              ? "Enter your email to reclaim your poetic journey."
              : "Check your email for the OTP to continue."}
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
            {!otpSent ? "Reclaim Your Verse" : "Prove Your Quill"}
          </h1>

          <form
            onSubmit={!otpSent ? handleSendOtp : handleVerifyOtp}
            className="space-y-4"
          >
            {!otpSent ? (
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      const newErrors = { ...errors };
                      delete newErrors.email;
                      setErrors(newErrors);
                    }
                  }}
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
            ) : (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (errors.otp) {
                      const newErrors = { ...errors };
                      delete newErrors.otp;
                      setErrors(newErrors);
                    }
                  }}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-700 text-white ${
                    errors.otp
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-600 focus:ring-purple-200"
                  }`}
                  placeholder="Enter 6-digit OTP"
                />
                {errors.otp && (
                  <p className="mt-1 text-sm text-red-500">{errors.otp}</p>
                )}
              </div>
            )}

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
                {loading
                  ? !otpSent
                    ? "Sending OTP..."
                    : "Verifying..."
                  : !otpSent
                  ? "Send OTP"
                  : "Verify OTP"}
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
      </div>
    </div>
  );
}
