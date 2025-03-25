import type { Config } from "tailwindcss";
import { colors } from "./components/style/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add our custom colors
        lightPurple: colors.lightPurple,
        darkPurple: colors.darkPurple,
        lightPink: colors.lightPink,
        darkPink: colors.darkPink,
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
