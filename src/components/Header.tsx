"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-white"
        >
          Talent<span className="text-orange-500">masters</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {["Jobs", "Clients", "Candidates", "About"].map((item) => (
            <Link
              key={item}
              href={
                item === "Jobs"
                  ? "/jobs"
                  : `/services/${item.toLowerCase()}`
              }
              className="relative text-white/80 hover:text-white transition"
            >
              <span className="after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all hover:after:w-full">
                {item}
              </span>
            </Link>
          ))}

          <Link
            href="/contact"
            className="ml-4 bg-orange-500 text-black px-5 py-2 rounded-md font-medium hover:bg-orange-400 transition"
          >
            Hire Talent
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-black border-t border-white/10"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              <Link href="/jobs" className="text-white">
                Jobs
              </Link>
              <Link href="/services/clients" className="text-white">
                For Clients
              </Link>
              <Link href="/services/candidates" className="text-white">
                For Candidates
              </Link>
              <Link href="/about" className="text-white">
                About
              </Link>
              <Link
                href="/contact"
                className="bg-orange-500 text-black text-center py-2 rounded-md"
              >
                Hire Talent
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}