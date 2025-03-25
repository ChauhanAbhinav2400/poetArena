import Link from "next/link";
import { colors } from "@/components/style/theme";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto py-8 bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.darkPink} 100%)`,
                  }}
                />
                <div
                  className="absolute inset-1 rounded-full bg-gray-800 flex items-center justify-center font-bold text-sm"
                  style={{ color: colors.lightPurple }}
                >
                  SV
                </div>
              </div>
              <div>
                <h2
                  className="text-lg font-bold"
                  style={{
                    background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ShayariVerse
                </h2>
              </div>
            </Link>
            <p className="text-gray-400 text-sm">
              A sanctuary for poets and readers to weave emotions into verses
              and share the beauty of shayari with the world.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              {["Home", "Explore Shayaris", "Poets", "Submit"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${
                      item === "Home"
                        ? ""
                        : item.toLowerCase().replace(" ", "-")
                    }`}
                    className="text-gray-400 hover:text-lightPurple transition-colors duration-200 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2">
              {["About Us", "Awards", "Events"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-gray-400 hover:text-lightPurple transition-colors duration-200 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Newsletter */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">Stay Connected</h3>
            <div className="flex space-x-3 mb-4">
              {[
                "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
                "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
              ].map((path, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-lightPurple transition-colors duration-200"
                  aria-label={["Twitter", "LinkedIn", "GitHub"][index]}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">
                Get Poetic Updates
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="p-2 text-sm rounded-l-md border-y border-l border-gray-600 bg-gray-700 text-gray-300 focus:outline-none focus:border-lightPurple flex-grow"
                />
                <button
                  className="px-3 py-2 rounded-r-md text-white text-sm"
                  style={{
                    background: `linear-gradient(90deg, ${colors.darkPurple} 0%, ${colors.darkPink} 100%)`,
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {year} ShayariVerse. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Use"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-gray-500 hover:text-lightPurple text-sm transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
