"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ChevronRight, ChevronLeft, ShoppingCart } from "lucide-react";
import { getLocalizedBlogPosts } from "@/lib/blog-data";
import { generateAffiliateLink } from "@/lib/affiliateUtils";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useTranslation } from "@/hooks/useTranslations";
import { useLocaleContext } from "@/contexts/LocaleContext";

export default function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { locale } = useLocaleContext();
  const latest = useTranslation('blog.latest');
  const insights = useTranslation('blog.insights');
  const knowledge = useTranslation('blog.knowledge');
  const readArticle = useTranslation('blog.readArticle');
  const exploreAll = useTranslation('blog.exploreAll');
  
  const displayPosts = getLocalizedBlogPosts(locale as any).slice(0, 6);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerView = isMobile ? 1 : 3;
  const maxIndex = displayPosts.length - itemsPerView;

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-background overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-12">
            <div className="min-w-0">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white leading-none">
                {latest} <span className="text-accent-hover italic">{insights}</span>
              </h2>
              <p className="mt-2 text-[9px] sm:text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest font-bold">
                {knowledge}
              </p>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <button 
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="p-2 sm:p-2.5 md:p-3 rounded-full border border-surface-light text-white transition-all disabled:opacity-10 hover:border-accent-hover bg-surface/20 hover:bg-surface/40 active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft size={isMobile ? 18 : 20} className="sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className="p-2 sm:p-2.5 md:p-3 rounded-full border border-surface-light text-white transition-all disabled:opacity-10 hover:border-accent-hover bg-surface/20 hover:bg-surface/40 active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight size={isMobile ? 18 : 20} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Karussell */}
        <ScrollReveal delay={0.2}>
          <div className="relative">
            <motion.div 
              className="flex gap-4 md:gap-6"
              animate={{ 
                // Auf Mobile: 85% Breite pro Karte + Lücke, damit die nächste Karte rechts sichtbar ist
                x: isMobile 
                  ? `calc(-${currentIndex * 85}% - ${currentIndex * 1}rem)` 
                  : `calc(-${currentIndex * 33.333}% - ${currentIndex * 1.5}rem)` 
              }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
            >
              {displayPosts.map((post, idx) => {
                // Generate affiliate link for first product in fallback products for each carousel card
                const affiliateUrl = generateAffiliateLink({
                  itemId: `blog-carousel-${idx}`,
                  marketplace: "EBAY_DE",
                  customId: "blog-carousel",
                });
                return (
                <div 
                  key={post.slug} 
                  // Mobile: 85% Breite | Desktop: 33.33%
                  className="w-[85%] min-w-[85%] md:min-w-[calc(33.333%-1rem)] md:w-[calc(33.333%-1rem)] flex-shrink-0"
                >
                  <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface/30 transition-all hover:border-accent-hover/30">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex h-full flex-col"
                    >
                      <div className="relative aspect-[16/9] bg-gradient-to-br from-surface via-surface-light/10 to-surface overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">
                            Research & Guide
                          </span>
                        </div>
                        {/* Ein leichter Schatten nach rechts auf Mobile, um Tiefe zu erzeugen */}
                        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/20 to-transparent md:hidden" />
                      </div>

                      <div className="flex flex-1 flex-col gap-3 p-4 md:p-6">
                        <div className="flex items-center gap-3 text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent-hover" />
                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1 font-bold">
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="font-display text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-white group-hover:text-accent-hover transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 opacity-70">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto pt-2 inline-flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-accent-hover">
                          {readArticle} <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                        </div>
                      </div>
                    </Link>

                    <a
                      href={affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="m-3 sm:m-4 mt-0 py-2 px-3 bg-accent-hover/20 text-accent-hover text-[8px] sm:text-[9px] font-black uppercase rounded-lg hover:bg-accent-hover hover:text-background transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95"
                    >
                      <ShoppingCart size={10} className="sm:w-3 sm:h-3" /> Related Gear
                    </a>
                  </div>
                </div>
              );
              })}
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Footer Link */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 flex justify-center">
             <Link href="/blog" className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-accent-hover transition-colors">
                {exploreAll}
                <div className="h-px w-8 bg-white/20 group-hover:w-16 group-hover:bg-accent-hover transition-all duration-500" />
             </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}