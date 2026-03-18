"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { springBounce } from "./SpringWrapper"; // Wir importieren deine Konstante!

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25, // Etwas höherer Damping für den Seitenwechsel, damit es nicht zu extrem wobbelt
          mass: 1
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}