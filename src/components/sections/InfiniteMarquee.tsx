"use client";

import { motion } from "framer-motion";
import { FALLBACK_PRODUCTS } from "@/lib/constants";
import SpringWrapper from "@/components/animations/SpringWrapper";
import Link from "next/link";

const titleContainerVariants = {
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
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemRevealVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const headlineWords = ["Top", "Fitness", "Deals"];

export default function InfiniteMarquee() {
  const marqueeItems = [...FALLBACK_PRODUCTS, ...FALLBACK_PRODUCTS];

  return (
    <section className="relative pb-12 bg-background overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 mb-6">
        <motion.div
          variants={titleContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="text-accent-hover font-black uppercase tracking-[0.3em] text-[10px] block mb-2 opacity-0 select-none" aria-hidden="true">
            Featured Deals
          </span>

          <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl leading-none text-white">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={`mr-4 inline-block ${
                  word === "Deals" ? "text-accent-hover italic" : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>
      </div>

      <div className="relative flex items-center">
        {/* Dieser Div steuert jetzt wieder die unendliche Bewegung */}
        <motion.div
          className="flex gap-6 pr-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ transition: { duration: 80 } }} 
        >
          {marqueeItems.map((item, idx) => (
            <motion.div
              key={`${item.itemId}-${idx}`}
              variants={itemRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="w-[220px] md:w-[280px] flex-shrink-0"
            >
              <SpringWrapper hoverScale={1.03}>
                <Link href={`/product/${item.itemId}`}>
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 bg-surface/30 shadow-xl">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent p-5 flex flex-col justify-end">
                      <div className="translate-y-1 group-hover:translate-y-0 transition-transform">
                        <span className="text-accent-hover font-black italic text-sm mb-1 block">
                          {item.price.value} €
                        </span>
                        <h3 className="text-white text-xs md:text-sm font-bold uppercase tracking-tight truncate">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </SpringWrapper>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}