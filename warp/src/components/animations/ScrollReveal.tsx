"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { type ReactNode } from "react";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  /** Vertical offset in px (default 40) */
  offset?: number;
  /** Animation duration in seconds (default 0.6) */
  duration?: number;
  /** Delay before animation starts (default 0) */
  delay?: number;
  /** Trigger threshold — 0 to 1 (default 0.15) */
  threshold?: number;
}

/**
 * Fades children up into view when they enter the viewport.
 * Uses `whileInView` so it only fires once per page load.
 */
export default function ScrollReveal({
  children,
  offset = 40,
  duration = 0.6,
  delay = 0,
  threshold = 0.15,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, delay, ease: "easeOut" as const }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
