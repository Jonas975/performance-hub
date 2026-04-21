"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlistStore";
import { motion } from "framer-motion";

export default function WishlistButton({ product }: { product: any }) {
  const toggleWishlist = useWishlist((state) => state.toggleWishlist);
  const isFavorite = useWishlist((state) => state.isFavorite(product.itemId));
  
  // State, um zu prüfen, ob wir im Browser sind
  const [mounted, setMounted] = useState(false);

  // useEffect läuft nur im Browser nach dem ersten Rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Während des Server-Renderings (oder bevor mounted true ist) 
  // zeigen wir immer den "inaktiven" Status an.
  const active = mounted ? isFavorite : false;

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.preventDefault();
        toggleWishlist(product);
      }}
      className={`p-3 rounded-full backdrop-blur-md border transition-all ${
        active 
          ? "bg-accent-hover border-accent-hover text-background shadow-[0_0_15px_#14b8a6]" 
          : "bg-background/40 border-surface-light text-white hover:border-accent-hover"
      }`}
    >
      <Heart size={20} fill={active ? "currentColor" : "none"} />
    </motion.button>
  );
}