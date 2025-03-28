// components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { colors } from "@/components/style/theme";
import { useAuth } from "@/lib/contexts/auth-contexts";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  console.log(isAuthenticated, "isAuthenticated");

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "शायरी", href: "/poetry" },
    { name: "शायर", href: "/poets" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
      style={{
        background: isScrolled
          ? `rgba(255, 255, 255, 0.8)`
          : `rgba(255, 255, 255, 0.4)`,
        backdropFilter: "blur(10px)",
        boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "none",
        // boxShadow: isScrolled ? "none" : "none",
      }}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo and Platform Name */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 mb-4 w-50 self-center rounded-full object-contain">
            <img
              src="https://i.ibb.co/0pRgNZzR/Simple-attire-200-x-50-px-1.png"
              alt="Simple-attire-200-x-50-px-1"
              className=""
            />
            {/* <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.darkPink} 100%)`,
              }}
            />
            <div
              className="absolute inset-2 rounded-full bg-white flex items-center justify-center font-bold text-lg"
              style={{ color: colors.darkPurple }}
            >
              
            </div>
          </div>
          <div className="hidden md:flex  items-center">
            <h1
              className="text-xl font-bold"
              style={{
                background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              
              Shayriमंच
            </h1> */}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium transition-colors duration-200 hover:opacity-80 relative group ${
                pathname === link.href ? "text-darkPurple" : "text-gray-700"
              }`}
            >
              {link.name}
              {/* Animated underline effect */}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ease-out ${
                  pathname === link.href ? "w-full" : "w-0"
                } group-hover:w-full`}
                style={{
                  background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
                }}
              />
            </Link>
          ))}
        </nav>

        {/* Profile and Actions */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <div
                className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 relative cursor-pointer hover:opacity-80 transition-opacity duration-200"
                style={{
                  boxShadow: `0 0 0 2px white, 0 0 0 4px ${colors.lightPurple}`,
                }}
              >
                {/* Profile image or default icon */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-700 hover:text-darkPurple transition-colors">
                  <span className="font-medium">Profile</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute cursor-pointer right-0 top-full mt-2 w-48 origin-top-right rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
                  <div
                    className="py-1 rounded-md shadow-lg"
                    style={{
                      background: `rgba(255, 255, 255, 0.95)`,
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${colors.lightPurple}`,
                    }}
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </Link>
                    {/* <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link> */}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="font-medium text-gray-700 hover:text-darkPurple transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 rounded-full text-white font-medium transition-all"
                style={{
                  background: `linear-gradient(90deg, ${colors.darkPurple} 0%, ${colors.darkPink} 100%)`,
                  boxShadow: `0 4px 14px rgba(106, 90, 205, 0.25)`,
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="block md:hidden text-gray-700"
          aria-label="Toggle Menu"
        >
          {!isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: `rgba(255, 255, 255, 0.95)`,
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="container mx-auto px-4 py-4 space-y-6">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium py-2 ${
                  pathname === link.href ? "text-darkPurple" : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-200 pt-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div
                  className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 relative"
                  style={{
                    boxShadow: `0 0 0 2px white, 0 0 0 4px ${colors.lightPurple}`,
                  }}
                >
                  {/* Profile image or default icon */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Link href="/profile" className="font-medium text-gray-800">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-left text-sm text-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth/login"
                  className="block font-medium text-gray-700"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-full text-center text-white font-medium"
                  style={{
                    background: `linear-gradient(90deg, ${colors.darkPurple} 0%, ${colors.darkPink} 100%)`,
                    boxShadow: `0 4px 14px rgba(106, 90, 205, 0.25)`,
                  }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
