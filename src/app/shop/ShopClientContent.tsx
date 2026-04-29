"use client";

import { useMemo, useState } from "react";
import type { EbayProductListing } from "@/lib/ebay";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Filter, ChevronDown, Search, ShoppingCart } from "lucide-react";
import SpringWrapper from "@/components/animations/SpringWrapper";
import WishlistButton from "@/components/WishlistButton";
import { useTranslation } from "@/hooks/useTranslations";

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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const label = useTranslation('shop.label');
  const title = useTranslation('shop.title');
  const found = useTranslation('shop.found');
  const search = useTranslation('shop.search');
  const sort = useTranslation('shop.sortDefault');
  const priceLow = useTranslation('shop.priceLow');
  const priceHigh = useTranslation('shop.priceHigh');
  const nameAZ = useTranslation('shop.nameAZ');
  const details = useTranslation('shop.details');
  const buy = useTranslation('shop.buy');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => parseFloat(a.price.value) - parseFloat(b.price.value));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => parseFloat(b.price.value) - parseFloat(a.price.value));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header - Desktop Original / Mobile angepasst */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-2 md:mb-4 text-white">
            {label} <span className="text-accent-hover italic">{title}</span>
          </h1>
          <p className="text-muted-foreground text-xs md:text-lg uppercase tracking-widest font-bold">
            {filteredProducts.length} {found}
          </p>
        </motion.div>

        {/* Filter Bar - Desktop Original / Mobile kompakter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 md:gap-6 mb-12 p-4 md:p-6 bg-surface/30 backdrop-blur-xl border border-surface-light rounded-[2rem] md:rounded-3xl sticky top-20 md:top-24 z-40 shadow-2xl"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder={search}
              className="w-full bg-background/50 border border-surface-light rounded-2xl py-3 md:py-4 pl-12 pr-4 focus:outline-none focus:border-accent-hover transition-all text-white font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative min-w-[150px] md:min-w-[200px]">
            <select
              className="w-full bg-background/50 border border-surface-light rounded-2xl py-3 md:py-4 pl-4 md:pl-12 pr-10 appearance-none focus:outline-none focus:border-accent-hover transition-all text-white font-bold uppercase text-[10px] md:text-xs tracking-widest cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">{sort}</option>
              <option value="price-low">{priceLow}</option>
              <option value="price-high">{priceHigh}</option>
              <option value="name">{nameAZ}</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
          </div>
        </motion.div>

        {/* Product Grid - Mobile: 2 Spalten | Desktop: 3 Spalten */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={sortBy + searchQuery}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10"
          >
            {filteredProducts.map((item) => {
              const displayImage = item.imageUrl || (item.summaryImages && item.summaryImages[0]) || null;

              return (
                <motion.div key={item.itemId} variants={itemVariants} layout>
                  <SpringWrapper hoverScale={1.03}>
                    <div
                      onClick={() => router.push(`/product/${encodeURIComponent(item.itemId)}`)}
                      className="group relative flex flex-col h-full p-3 md:p-6 rounded-2xl md:rounded-3xl border border-surface-light bg-surface/20 hover:border-accent-hover/50 transition-all shadow-lg cursor-pointer"
                    >
                        
                        {/* BILD-CONTAINER */}
                        <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 relative border border-surface-light/50 bg-black">
                          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20" onClick={(e) => e.preventDefault()}>
                            <WishlistButton product={item} />
                          </div>

                          {displayImage ? (
                            <img
                              src={displayImage}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[8px] md:text-xs font-bold uppercase p-2 md:p-4 text-center">
                              Kein Bild
                            </div>
                          )}

                          {/* PREIS BADGE (Original-Look) */}
                          <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                            <span className="bg-background/90 backdrop-blur-md px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs md:text-lg font-black text-accent-hover italic shadow-xl">
                              {item.price.value} {item.price.currency}
                            </span>
                          </div>
                        </div>

                        {/* TEXT-INFO */}
                        <div className="flex-grow">
                          <h3 className="text-[11px] md:text-xl font-black uppercase leading-tight mb-2 md:mb-4 group-hover:text-accent-hover transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                        </div>

                        {/* BUTTONS - Details and Buy */}
                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/product/${encodeURIComponent(item.itemId)}`);
                            }}
                            className="hidden md:flex flex-1 py-3 px-4 rounded-xl bg-white/20 text-white border border-white/30 font-black uppercase text-center items-center justify-center gap-2 hover:bg-white/30 hover:border-white/50 transition-all active:scale-95 text-xs leading-none"
                          >
                            {details} <ArrowUpRight size={13} />
                          </button>
                          <a
                            href={item.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 py-3 px-4 rounded-xl bg-accent-hover text-background font-black uppercase text-center inline-flex items-center justify-center gap-1.5 hover:bg-white transition-all active:scale-95 shadow-xl text-xs md:text-xs leading-none"
                          >
                            <ShoppingCart size={13} />
                            {buy}
                          </a>
                        </div>
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