"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { type ReactNode } from "react";

/** Shared spring config used across all bounce interactions */
export const springBounce = {
  type: "spring" as const,
  stiffness: 400,
  damping: 10,
};

interface SpringWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  /** Scale factor on hover (default 1.05) */
  hoverScale?: number;
  /** Scale factor on tap (default 0.95) */
  tapScale?: number;
}

/**
 * Wraps any element with a spring-bounce hover + tap interaction.
 * Use this for buttons, cards, CTAs — anything that should feel "alive".
 */
export default function SpringWrapper({
  children,
  hoverScale = 1.05,
  tapScale = 0.95,
  ...props
}: SpringWrapperProps) {
  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={springBounce}
      {...props}
    >
      {children}
    </motion.div>
  );
}
