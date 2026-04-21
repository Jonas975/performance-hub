"use client";

import { useMemo, useState } from "react";
import type { EbayProductListing } from "@/lib/ebay";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Filter, ChevronDown, Search } from "lucide-react";
import SpringWrapper from "@/components/animations/SpringWrapper";
import WishlistButton from "@/components/WishlistButton"; // Neu importiert

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const,
      y: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
      },
    },
  },
};

export default function ShopClientContent({
  products,
}: {
  products: EbayProductListing[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "price-low") {
      result.sort(
        (a, b) => parseFloat(a.price.value) - parseFloat(b.price.value)
      );
    } else if (sortBy === "price-high") {
      result.sort(
        (a, b) => parseFloat(b.price.value) - parseFloat(a.price.value)
      );
    } else if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-white">
            The <span className="text-accent-hover italic">Shop</span>
          </h1>
          <p className="text-muted-foreground text-lg uppercase tracking-widest font-bold">
            {filteredProducts.length} Equipment & Supplements gefunden
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-6 mb-12 p-6 bg-surface/30 backdrop-blur-xl border border-surface-light rounded-3xl sticky top-24 z-40 shadow-2xl"
        >
          <div className="relative flex-grow">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <input
              type="text"
              placeholder="Ausrüstung suchen..."
              className="w-full bg-background/50 border border-surface-light rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent-hover transition-all text-white font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative min-w-[200px]">
            <Filter
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <select
              className="w-full bg-background/50 border border-surface-light rounded-2xl py-4 pl-12 pr-10 appearance-none focus:outline-none focus:border-accent-hover transition-all text-white font-bold uppercase text-xs tracking-widest cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sortieren</option>
              <option value="price-low">Preis: Niedrig</option>
              <option value="price-high">Preis: Hoch</option>
              <option value="name">Name: A-Z</option>
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              size={16}
            />
          </div>
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={sortBy + searchQuery}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredProducts.map((item) => {
              const displayImage = item.imageUrl || (item.summaryImages && item.summaryImages[0]) || null;

              return (
                <motion.div key={item.itemId} variants={itemVariants} layout>
                  <SpringWrapper hoverScale={1.03}>
                    <div className="group p-6 rounded-3xl border border-surface-light bg-surface/20 hover:border-accent-hover/50 transition-all flex flex-col h-full shadow-lg relative">
                      
                      {/* BILD-CONTAINER */}
                      <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative border border-surface-light/50 bg-black">
                        {/* WUNSCHLISTE BUTTON - Oben Rechts auf dem Bild */}
                        <div className="absolute top-4 right-4 z-20">
                          <WishlistButton product={item} />
                        </div>

                        {displayImage ? (
                          <img
                            src={displayImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs font-bold uppercase p-4 text-center">
                            Kein Vorschaubild verfügbar
                          </div>
                        )}

                        {/* PREIS BADGE */}
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-background/90 backdrop-blur-md px-4 py-2 rounded-xl text-lg font-black text-accent-hover italic shadow-xl">
                            {item.price.value} {item.price.currency}
                          </span>
                        </div>
                      </div>

                      {/* TITEL */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-black uppercase leading-tight mb-4 group-hover:text-accent-hover transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                      </div>

                      {/* DETAILS LINK */}
                      <Link
                        href={`/product/${encodeURIComponent(item.itemId)}`}
                        className="mt-6 w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-center flex items-center justify-center gap-2 hover:bg-accent-hover transition-all active:scale-95 shadow-xl"
                      >
                        Details <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </SpringWrapper>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}