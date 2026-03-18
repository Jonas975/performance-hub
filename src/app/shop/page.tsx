"use client";

import { useState, useMemo } from "react";
import { FALLBACK_PRODUCTS } from "@/lib/constants";
import Link from "next/link";
import { motion } from "framer-motion"; // WICHTIG für die Stagger-Animation
import { ArrowUpRight, Filter, ChevronDown, Search } from "lucide-react";
import SpringWrapper, { springBounce } from "@/components/animations/SpringWrapper";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Die Logik für Suche und Sortierung
  const filteredProducts = useMemo(() => {
    let result = [...FALLBACK_PRODUCTS];

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
  }, [searchQuery, sortBy]);

  /* ── Animation Variants für den Stagger-Effekt ── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Zeitabstand zwischen den Produkten
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: springBounce, // Nutzt deine gummiband-artige Physik
    },
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Titel & Info */}
        <div className="mb-12">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-white">
            Alle <span className="text-accent-hover italic">Produkte</span>
          </h1>
          <p className="text-muted-foreground text-lg uppercase tracking-widest font-bold">
            {filteredProducts.length} Ergebnisse gefunden
          </p>
        </div>

        {/* Filter Bar - Modern & Sticky */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 p-6 bg-surface/30 backdrop-blur-xl border border-surface-light rounded-3xl sticky top-24 z-40 shadow-2xl">
          
          {/* Suche */}
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Nach Equipment suchen..."
              className="w-full bg-background/50 border border-surface-light rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent-hover transition-all text-white font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sortierung */}
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <select 
              className="w-full bg-background/50 border border-surface-light rounded-2xl py-4 pl-12 pr-10 appearance-none focus:outline-none focus:border-accent-hover transition-all text-white font-bold uppercase text-xs tracking-widest cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Standardsortierung</option>
              <option value="price-low">Preis: Niedrig zu Hoch</option>
              <option value="price-high">Preis: Hoch zu Niedrig</option>
              <option value="name">Name: A - Z</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
          </div>
        </div>

        {/* Das Grid mit Animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={sortBy + searchQuery} // Sorgt dafür, dass die Animation beim Filtern neu feuert
        >
          {filteredProducts.map((item) => (
            <motion.div key={item.itemId} variants={itemVariants}>
              <SpringWrapper hoverScale={1.03}>
                <div className="group p-6 rounded-3xl border border-surface-light bg-surface/20 hover:border-accent-hover/50 transition-all flex flex-col h-full shadow-lg">
                  {/* Bild */}
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative border border-surface-light/50">
                    <img 
                      src={item.images?.[0] || "https://via.placeholder.com/400"} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-background/90 backdrop-blur-md px-4 py-2 rounded-xl text-lg font-black text-accent-hover italic shadow-xl">
                        {item.price.value} {item.price.currency}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-black uppercase leading-tight mb-4 group-hover:text-accent-hover transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Link */}
                  <Link 
                    href={`/product/${item.itemId}`}
                    className="mt-6 w-full py-4 rounded-2xl bg-foreground text-background font-black uppercase text-center flex items-center justify-center gap-2 hover:bg-accent-hover hover:text-foreground transition-all active:scale-95"
                  >
                    Details <ArrowUpRight size={18} />
                  </Link>
                </div>
              </SpringWrapper>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="py-20 text-center border-2 border-dashed border-surface-light rounded-3xl"
          >
            <p className="text-2xl font-bold text-muted-foreground uppercase">Keine Produkte gefunden.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}