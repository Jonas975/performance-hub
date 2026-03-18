"use client";

import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import SpringWrapper, {
  springBounce,
} from "@/components/animations/SpringWrapper";

/* ── Animation variants ── */

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

/* ── Headline split helper ── */

const headlineWords = ["Elevate", "Your", "Performance."];

/* ── Component ── */

export default function MotionHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: Copy ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Staggered headline */}
            <h1 className="font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl lg:text-7xl">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={`mr-4 inline-block ${
                    i === headlineWords.length - 1 ? "text-accent-hover" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="max-w-md text-lg leading-relaxed text-muted"
            >
              Curated supplements, equipment &amp; apparel — trusted by
              athletes, backed by science, built for results.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <SpringWrapper hoverScale={1.06} tapScale={0.96}>
                <a
                  href="/shop"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </SpringWrapper>

              <SpringWrapper hoverScale={1.04} tapScale={0.97}>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-surface-light px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-muted transition-colors hover:border-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Learn More
                </a>
              </SpringWrapper>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-6 pt-4 text-xs uppercase tracking-widest text-muted"
            >
              <span>30-day guarantee</span>
              <span className="h-3 w-px bg-surface-light" />
              <span>Free shipping 50$+</span>
              <span className="h-3 w-px bg-surface-light" />
              <span>Athlete approved</span>
            </motion.div>
          </motion.div>

          {/* ── Right: Vertical Video Placeholder ── */}
          <motion.div
            variants={videoSlide}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <div className="relative aspect-[9/16] w-full max-w-xs overflow-hidden rounded-2xl border border-accent/30 bg-surface shadow-2xl shadow-accent/5">
              {/* Gradient shimmer background */}
              <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-light/20 to-surface" />

              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Play button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={springBounce}
                className="absolute inset-0 z-10 flex items-center justify-center"
                aria-label="Play video"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/20 backdrop-blur-sm transition-colors hover:bg-accent/30">
                  <Play className="h-6 w-6 fill-foreground text-foreground" />
                </div>
              </motion.button>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-background/80 to-transparent p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-hover">
                  Featured Athlete
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  Watch the journey →
                </p>
              </div>

              {/* Teal accent line at top */}
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}