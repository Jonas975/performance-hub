"use client";

import type { EbayProductListing } from "@/lib/ebay";
import { motion } from "framer-motion";
import { FALLBACK_PRODUCTS } from "@/lib/constants";
import SpringWrapper from "@/components/animations/SpringWrapper";
import Link from "next/link";
import { ArrowRight, ShoppingCart, ExternalLink } from "lucide-react";
import { generateAffiliateLink } from "@/lib/affiliateUtils";
import WishlistButton from "@/components/WishlistButton";
import { useTranslation } from "@/hooks/useTranslations";

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
  const featured = useTranslation('marquee.featured');
  const seeAll = useTranslation('marquee.seeAll');
  const viewAll = useTranslation('marquee.viewAll');
  // Use provided products if available and non-empty, otherwise use fallback
  let displayProducts = products && products.length > 0 ? products : [];
  
  // If using API products, fall back to local if they don't have images
  const hasImages = displayProducts.some(p => p.imageUrl || (p.summaryImages?.length ?? 0) > 0);
  
  if (displayProducts.length === 0 || !hasImages) {
    // Use fallback products and ensure they all have images
    displayProducts = FALLBACK_PRODUCTS
      .map((p) => ({
        itemId: p.itemId,
        title: p.title,
        price: p.price,
        imageUrl: p.images?.[0] || null,
        summaryImages: p.images || [],
        itemWebUrl: p.itemWebUrl,
        affiliateUrl: p.affiliateUrl || generateAffiliateLink({itemId: p.itemId, marketplace: "EBAY_DE", customId: "homepage-marquee"}),
      }))
      .filter(p => p.imageUrl !== null);
  }
  
  if (typeof window !== 'undefined') {
    console.log('[InfiniteMarquee] Final displayProducts:', displayProducts, 'Length:', displayProducts.length);
  }
        
  const marqueeItems = [...displayProducts, ...displayProducts];
  const topFourProducts = displayProducts.slice(0, 4);

  return (
    // Padding auf pb-12 zurückgesetzt wie in der alten Version
    <section className="relative pb-12 bg-background overflow-hidden">
      {/* HEADER BEREICH - Margins angepasst an alte Version (mb-6) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 mb-6">
        <motion.div
          variants={titleContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6"
        >
          <div>
            <span className="text-accent-hover font-black uppercase tracking-[0.3em] text-[9px] sm:text-[10px] block mb-2">
              {featured}
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-none text-white flex flex-wrap">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={`mr-2 sm:mr-3 md:mr-4 inline-block ${
                    word === "Deals" ? "text-accent-hover italic" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>

          <motion.div variants={wordVariants} className="pb-0 sm:pb-1">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 sm:gap-3 text-white/50 hover:text-accent-hover transition-all duration-300 active:scale-95"
            >
              <span className="font-black uppercase tracking-[0.2em] text-[10px] sm:text-[12px]">
                {seeAll}
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-hover group-hover:bg-accent-hover group-hover:text-background transition-all">
                <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* --- MOBILE ANSICHT: 2x2 STATIC GRID --- */}
      <div className="md:hidden px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {topFourProducts.filter(item => item.imageUrl || (item.summaryImages && item.summaryImages[0])).map((item) => {
            const displayImage = item.imageUrl || (item.summaryImages && item.summaryImages[0]);
            return (
              <div key={item.itemId} className="relative aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl border border-white/5 bg-surface/30 group">
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20">
                  <WishlistButton product={item} />
                </div>
                <Link href={`/product/${encodeURIComponent(item.itemId)}`} className="h-full w-full block">
                  <img
                    src={displayImage || ""}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent p-3 sm:p-4 flex flex-col justify-end">
                    <span className="text-accent-hover font-black italic text-[9px] sm:text-xs mb-1">
                      {item.price?.value} {item.price?.currency}
                    </span>
                    <h3 className="text-white text-[9px] sm:text-[10px] font-bold uppercase truncate">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        
        <Link 
          href="/shop"
          className="mt-4 sm:mt-6 w-full py-3 sm:py-4 rounded-lg sm:rounded-xl border border-accent-hover/30 bg-accent-hover/10 hover:bg-accent-hover/20 text-center block transition-colors active:scale-95"
        >
          <span className="text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
            {viewAll}
          </span>
        </Link>
      </div>

      {/* --- DESKTOP ANSICHT: INFINITE MARQUEE - Positioniert wie davor --- */}
      <div className="relative hidden md:flex items-center">
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
              displayImage: item.imageUrl || (item.summaryImages && item.summaryImages[0]) || null
            }))
            .filter((item) => item.displayImage !== null)
            .map((item, idx) => (
              <motion.div
                key={`${item.itemId}-${idx}`}
                className="w-[280px] flex-shrink-0"
              >
                <SpringWrapper hoverScale={1.03}>
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 bg-surface/30 shadow-xl">
                    
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <WishlistButton product={item} />
                    </div>

                    <Link href={`/product/${encodeURIComponent(item.itemId)}`}>
                      <img
                        src={item.displayImage!}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent p-5 flex flex-col justify-end">
                        <div className="translate-y-1 group-hover:translate-y-0 transition-transform">
                          <span className="text-accent-hover font-black italic text-sm mb-1 block">
                            {item.price?.value} {item.price?.currency}
                          </span>
                          <h3 className="text-white text-sm font-bold uppercase tracking-tight truncate">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </Link>

                    <a
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="absolute top-4 left-4 z-30 py-2 px-4 bg-accent-hover/90 backdrop-blur-sm text-background font-black uppercase text-xs rounded-full hover:bg-accent-hover transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg hover:shadow-xl border border-accent-hover"
                    >
                      <ShoppingCart size={14} /> {seeAll}
                    </a>
                  </div>
                </SpringWrapper>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}