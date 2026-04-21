// src/components/sections/InfiniteMarquee.tsx
"use client";

import type { EbayProductListing } from "@/lib/ebay";
import { motion } from "framer-motion"; // <-- Geändert zu framer-motion
import { FALLBACK_PRODUCTS } from "@/lib/constants";
import SpringWrapper from "@/components/animations/SpringWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WishlistButton from "@/components/WishlistButton"; 

// Animation-Variants
const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
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

const headlineWords = ["Top", "Fitness", "Deals"];

export default function InfiniteMarquee({
  products,
}: {
  products?: EbayProductListing[];
}) {
  const displayProducts =
    products && products.length > 0
      ? products
      : FALLBACK_PRODUCTS.map((p) => ({
          itemId: p.itemId,
          title: p.title,
          price: p.price,
          imageUrl: p.images[0] || null,
          summaryImages: p.images || [], // Wichtig für die Fallbacks
          itemWebUrl: p.itemWebUrl,
        }));
        
  const marqueeItems = [...displayProducts, ...displayProducts];

  return (
    <section className="relative pb-12 bg-background overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 mb-6">
        <motion.div
          variants={titleContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <span
              className="text-accent-hover font-black uppercase tracking-[0.3em] text-[10px] block mb-2 opacity-0 select-none"
              aria-hidden="true"
            >
              Featured Deals
            </span>

            <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl leading-none text-white flex flex-wrap">
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
          </div>

          <motion.div variants={wordVariants} className="pb-1">
            <Link
              href="/shop"
              className="group flex items-center gap-2 text-white/50 hover:text-accent-hover transition-colors duration-300"
            >
              <span className="font-black uppercase tracking-[0.2em] text-[12px]">
                See All
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-hover group-hover:bg-accent-hover group-hover:text-background transition-all duration-300">
                <ArrowRight size={14} />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative flex items-center">
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
          {marqueeItems
            .map((item) => ({
              ...item,
              // FIX: Hier checken wir BEIDE Bildquellen, wie im Shop!
              displayImage: item.imageUrl || (item.summaryImages && item.summaryImages[0]) || null
            }))
            .filter((item) => item.displayImage !== null) // Nur filtern, wenn wirklich GAR KEIN Bild da ist
            .map((item, idx) => (
              <motion.div
                key={`${item.itemId}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="w-[220px] md:w-[280px] flex-shrink-0"
              >
                <SpringWrapper hoverScale={1.03}>
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 bg-surface/30 shadow-xl">
                    
                    {/* WUNSCHLISTE BUTTON */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <WishlistButton product={item} />
                    </div>

                    <Link href={`/product/${encodeURIComponent(item.itemId)}`}>
                      <img
                        src={item.displayImage!} // Nutzt jetzt das garantierte Bild
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent p-5 flex flex-col justify-end">
                        <div className="translate-y-1 group-hover:translate-y-0 transition-transform">
                          <span className="text-accent-hover font-black italic text-sm mb-1 block">
                            {item.price?.value} {item.price?.currency}
                          </span>
                          <h3 className="text-white text-xs md:text-sm font-bold uppercase tracking-tight truncate">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SpringWrapper>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}