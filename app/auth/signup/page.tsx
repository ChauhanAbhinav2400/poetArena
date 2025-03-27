"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TOKEN_KEY, API_ENDPOINTS, BASE_URL } from "@/lib/constants/constants";
import { colors } from "@/components/style/theme";
import { setItem } from "@/lib/localStorage";
import { apiCall } from "@/api/fetchData";

// Validation schemas
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

type Step = "details" | "verification";

// List of 50 countries interested in poetry + "Other"
const COUNTRY_OPTIONS = [
  "India",
  "Pakistan",
  "Bangladesh",
  "Nepal",
  "Sri Lanka",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "New Zealand",
  "Iran",
  "Afghanistan",
  "Turkey",
  "Egypt",
  "Morocco",
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Oman",
  "Kuwait",
  "Nigeria",
  "South Africa",
  "Kenya",
  "Ghana",
  "Algeria",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Portugal",
  "Russia",
  "Ukraine",
  "Poland",
  "Greece",
  "Ireland",
  "Brazil",
  "Argentina",
  "Mexico",
  "Colombia",
  "Chile",
  "Japan",
  "China",
  "South Korea",
  "Indonesia",
  "Malaysia",
  "Philippines",
  "Thailand",
  "Vietnam",
  "Singapore",
  "Other",
];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("details");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
  });
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.country) {
      newErrors.country = "Please select your country";
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
        url: `${BASE_URL}${API_ENDPOINTS.SIGNUP}`,
        body: formData,
      });

      console.log(response, "response");
      setStep("verification");
    } catch (error) {
      console.error("Signup error:", error);
      setErrors((prev) => ({
        ...prev,
        form: "Failed to sign up. Please try again.",
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
        url: `${BASE_URL}${API_ENDPOINTS.VERIFY_EMAIL}`,
        body: {
          email: formData.email,
          otp,
        },
      });

      if (response.token) {
        setItem(TOKEN_KEY, response.token);
        window.location.href = "/";
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setErrors((prev) => ({ ...prev, otp: "Invalid OTP. Please try again." }));
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
        <div className="mt-4">
          <Link
              href="/"
            className="text-4xl font-bold py-3 relative overflow-hidden"
            style={{
              color: colors.lightPurple,
              textShadow: "2px 2px 4px rgba(128, 0, 128, 0.5)",
            }}
          >
            Shayri<span className="text-neon-purple">मंच</span>
          </Link>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Unleash Your Poetic Soul
          </h2>
          <p className="text-gray-300 mb-6">
            Share your shayari, connect with readers, and rise as a poetic star.
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
            {step === "details" ? "Join the Shayriमंच" : "Verify Your Email"}
          </h1>

          {step === "details" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-700 text-white ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-200"
                      : `border-gray-600 focus:ring-purple-200`
                  }`}
                  placeholder="Your Name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

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

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-700 text-white ${
                    errors.country
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-600 focus:ring-purple-200"
                  }`}
                >
                  <option value="">Select your country</option>
                  {COUNTRY_OPTIONS.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                )}
              </div>

              {/* Signup Button */}
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
                  {loading ? "Joining..." : "Join"}
                </button>
              </div>

              {errors.form && (
                <p className="text-sm text-center text-red-500">
                  {errors.form}
                </p>
              )}

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium"
                    style={{ color: colors.lightPurple }}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            /* OTP Verification Form */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <p className="text-center text-gray-400 mb-4">
                  We’ve sent a verification code to your email. Enter it below.
                </p>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Verification Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (errors.otp) {
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.otp;
                        return newErrors;
                      });
                    }
                  }}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-700 text-white ${
                    errors.otp
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-600 focus:ring-purple-200"
                  }`}
                  placeholder="000000"
                />
                {errors.otp && (
                  <p className="mt-1 text-sm text-red-500">{errors.otp}</p>
                )}
              </div>

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
                  {loading ? "Verifying..." : "Verify & Enter"}
                </button>
              </div>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-sm font-medium"
                  style={{ color: colors.lightPurple }}
                >
                  Back to Sign Up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
