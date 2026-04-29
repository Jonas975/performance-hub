"use client";

import { useWishlist } from "@/lib/wishlistStore";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslations";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const title = useTranslation('wishlist.title');
  const empty = useTranslation('wishlist.empty');
  const discover = useTranslation('wishlist.discover');
  const details = useTranslation('wishlist.details');

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Headline - Identisch zum Shop/Grid */}
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8 md:mb-12">
          {title.split(' ')[0]} <span className="text-accent-hover italic">Wishlist</span>
        </h1>

        <AnimatePresence mode="popLayout">
          {wishlist.length === 0 ? (
            <div className="border-2 border-dashed border-surface-light rounded-[32px] md:rounded-[40px] p-12 md:p-20 text-center">
              <p className="text-muted-foreground font-black uppercase tracking-widest mb-8 text-xs md:text-base">
                {empty}
              </p>
              <Link 
                href="/shop" 
                className="inline-block bg-white text-black px-8 py-4 rounded-2xl font-black uppercase hover:bg-accent-hover transition-all text-xs md:text-base"
              >
                {discover}
              </Link>
            </div>
          ) : (
            /* Grid: 2 Spalten Mobile, 3 Desktop */
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
            >
              {wishlist.map((item) => (
                <motion.div 
                  key={item.itemId}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-surface/20 border border-surface-light rounded-2xl md:rounded-3xl p-3 md:p-6 flex flex-col group relative"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden mb-4 bg-black border border-white/5">
                    <Link href={`/product/${encodeURIComponent(item.itemId)}`} className="w-full h-full block">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </Link>
                    
                    {/* Delete Button - Rot wie im Original, aber kleiner auf Mobile */}
                    <button 
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-2 right-2 md:top-4 md:right-4 p-2 md:p-3 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-grow">
                    <p className="text-lg md:text-2xl font-black text-accent-hover italic mb-1">
                      {item.price.value} {item.price.currency}
                    </p>
                    <h3 className="text-[11px] md:text-xl font-black uppercase text-white line-clamp-2 mb-4 leading-tight">
                      {item.title}
                    </h3>
                    
                    <Link 
                      href={`/product/${encodeURIComponent(item.itemId)}`} 
                      className="mt-auto w-full py-3 md:py-4 bg-white text-black rounded-xl md:rounded-2xl font-black uppercase flex items-center justify-center gap-2 hover:bg-accent-hover transition-all text-[10px] md:text-base shadow-xl"
                    >
                      {details} <ShoppingBag size={16} className="md:w-[20px] md:h-[20px]" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}