"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { NoiseBackgroundDemo } from "@/components/NoiseBackground";
import { BackgroundBeamsWithCollisionDemo } from "./BackgroundBeamsWithCollision";
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Build teams that <span className="text-orange-500">win</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10"
        >
          Talentmasters connects high-performing professionals with ambitious
          companies — fast, focused, and human-first.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center gap-4"
        >

 <NoiseBackgroundDemo />
               <BackgroundBeams />

        </motion.div>

      </div>
    </section>
    
  );
}