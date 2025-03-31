import { colors } from "@/components/style/theme";
import { SetPasswordForm } from "./SetpasswordForm";
import { Suspense } from "react";

function FormSkeleton() {
  return (
    <div className="w-full max-w-md animate-pulse">
      <div className="h-10 w-3/4 bg-gray-700 rounded mx-auto mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 w-1/3 bg-gray-700 rounded mb-2"></div>
        <div className="h-10 w-full bg-gray-700 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-700 rounded mb-2"></div>
        <div className="h-10 w-full bg-gray-700 rounded"></div>
        <div className="h-12 w-full bg-gray-700 rounded mt-4"></div>
      </div>
      <div className="h-4 w-1/4 bg-gray-700 rounded mx-auto mt-4"></div>
    </div>
  );
}
export default function SetPasswordPage() {
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
            Shayari<span className="text-neon-purple">मंच</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Rewrite Your Verse
          </h2>
          <p className="text-gray-300 mb-6">
            Set a new password to secure your poetic soul.
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
        <Suspense fallback={<FormSkeleton />}>
          <SetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
