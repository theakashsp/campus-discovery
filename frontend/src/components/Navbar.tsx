"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/search" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isTransparent = !isScrolled && pathname === "/";

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isTransparent
            ? "bg-transparent py-5"
            : "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100/80 py-3"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
                isTransparent
                  ? "bg-white text-blue-600 shadow-lg"
                  : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md"
              }`}
            >
              C
            </div>
            <span
              className={`text-xl font-extrabold tracking-tight transition-colors duration-300 ${
                isTransparent
                  ? "text-white"
                  : "text-gray-900 group-hover:text-blue-600"
              }`}
            >
              Campus Compare
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? isTransparent
                        ? "text-white bg-white/15"
                        : "text-blue-600 bg-blue-50"
                      : isTransparent
                      ? "text-blue-100 hover:text-white hover:bg-white/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="w-px h-6 bg-gray-200 mx-3 opacity-50" />

            <Link
              href="/login"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                isTransparent
                  ? "bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isTransparent ? "bg-white" : "bg-gray-800"
                } ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isTransparent ? "bg-white" : "bg-gray-800"
                } ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isTransparent ? "bg-white" : "bg-gray-800"
                } ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3.5 rounded-xl text-lg font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-4" />
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 text-center rounded-xl bg-gray-50 text-gray-800 font-semibold hover:bg-gray-100 transition"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
