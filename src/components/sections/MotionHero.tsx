"use client";

import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import SpringWrapper, {
  springBounce,
} from "@/components/animations/SpringWrapper";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const videoSlide = {
  hidden: { opacity: 0, x: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: 0.4,
    },
  },
};

const headlineWords = ["Elevate", "Your", "Performance."];

export default function MotionHero() {
  return (
    <section className="relative flex items-center overflow-hidden pt-28 pb-8">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            <h1 className="font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl lg:text-7xl leading-[1.1]">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={`mr-4 inline-block ${
                    i === headlineWords.length - 1 ? "text-accent-hover italic" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={fadeUp}
              className="max-w-md text-base leading-relaxed text-muted-foreground"
            >
              Curated supplements, equipment & apparel — trusted by
              athletes, backed by science, built for results.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-1">
              <SpringWrapper hoverScale={1.06} tapScale={0.96}>
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent-hover px-7 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-white"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </SpringWrapper>

              <SpringWrapper hoverScale={1.04} tapScale={0.97}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-surface-light px-7 py-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:border-accent-hover hover:text-foreground"
                >
                  Learn More
                </Link>
              </SpringWrapper>
            </motion.div>
          </motion.div>

          <motion.div
            variants={videoSlide}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex justify-end"
          >
            <div className="relative aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-2xl border border-accent-hover/20 bg-surface shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-light/10 to-surface" />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={springBounce}
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent-hover/40 bg-accent-hover/20 backdrop-blur-sm">
                  <Play className="h-5 w-5 fill-foreground text-foreground" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}