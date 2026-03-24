"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { blogPosts } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal"; // Import für die Animation

export default function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayPosts = blogPosts.slice(0, 6);
  const maxIndex = Math.max(0, displayPosts.length - 3);

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <section className="relative w-full py-24 bg-background overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header-Bereich mit ScrollReveal Animation */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                Latest <span className="text-accent-hover italic">Insights</span>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest font-bold">
                Knowledge for your peak performance
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="p-3 rounded-full border border-surface-light text-white transition-all hover:border-accent-hover hover:text-accent-hover disabled:opacity-20 bg-surface/20"
              >
                <ChevronLeft size={22} />
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className="p-3 rounded-full border border-surface-light text-white transition-all hover:border-accent-hover hover:text-accent-hover disabled:opacity-20 bg-surface/20"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Karussell-Bereich mit ScrollReveal Animation (leicht verzögert durch Stagger) */}
        <ScrollReveal delay={0.2}>
          <div className="relative">
            <motion.div 
              className="flex gap-6"
              initial={false}
              animate={{ x: `calc(-${currentIndex * (33.333)}% - ${currentIndex * 1.5}rem)` }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              {displayPosts.map((post) => (
                <div 
                  key={post.slug} 
                  className="min-w-[calc(33.333%-1rem)] w-[calc(33.333%-1rem)] flex-shrink-0"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface/30 transition-all hover:border-accent-hover/30 hover:bg-surface/50"
                  >
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-surface via-surface-light/10 to-surface overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">
                          Research & Guide
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-accent-hover" />
                          {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-accent-hover" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white group-hover:text-accent-hover transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2 opacity-80">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-hover group-hover:gap-4 transition-all">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>

        {/* CTA Footer mit ScrollReveal */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 flex justify-center">
             <Link href="/blog" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-accent-hover transition-colors">
                Explore All Articles
                <div className="h-px w-12 bg-white/20 group-hover:w-20 group-hover:bg-accent-hover transition-all duration-500" />
             </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}