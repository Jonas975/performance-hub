"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import SpringWrapper, {
  springBounce,
} from "@/components/animations/SpringWrapper";
import TikTokEmbed from "@/components/TikTokEmbed"; // Deine neue Komponente

// --- Animation-Variants (unverändert) ---
const containerVariants = {
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
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const headlineWords = ["Elevate", "Your", "Performance."];

// --- ECHTE TIKTOK DATEN ---
const videoReviews = [
  { 
    id: 1, 
    tiktokId: "7617179507602099489", // Ersetze das mit deiner 1. TikTok ID
    title: "Extreme Pump - Pre-Workout Test" 
  },
  { 
    id: 2, 
    tiktokId: "7224576737118670106", // Ersetze das mit deiner 2. TikTok ID
    title: "Best Whey for you" 
  },
  { 
    id: 3, 
    tiktokId: "7617128665335270686", // Ersetze das mit deiner 3. TikTok ID
    title: "Homegym Gear" 
  },
];

export default function MotionHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoReviews.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videoReviews.length) % videoReviews.length);
  };

  return (
    <section className="relative min-h-[650px] flex items-center overflow-hidden pt-32 pb-20">
      {/* Hintergrund-Gradient */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-surface/30" 
        style={{ pointerEvents: 'none' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-16">
          
          {/* --- Linke Seite: Text & CTAs (unverändert) --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 pt-4"
          >
            <h1 className="font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl lg:text-7xl leading-[1.1]">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={`mr-4 inline-block ${
                    i === headlineWords.length - 1 ? "text-accent-hover italic" : "text-white"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={fadeUp}
              className="max-w-md text-base leading-relaxed text-muted-foreground"
            >
              Curated supplements, equipment & apparel — trusted by
              athletes, backed by science, built for results.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <SpringWrapper hoverScale={1.06} tapScale={0.96}>
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent-hover px-7 py-3 text-sm font-bold uppercase tracking-wide text-background transition-all duration-300 hover:bg-white hover:text-background"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </SpringWrapper>

              <SpringWrapper hoverScale={1.04} tapScale={0.97}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-surface-light px-7 py-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-all duration-300 hover:border-accent-hover hover:bg-accent-hover/10 hover:text-accent-hover"
                >
                  Learn More
                </Link>
              </SpringWrapper>
            </motion.div>
          </motion.div>

          {/* --- Rechte Seite: VIDEO-KARTEN-DECK (Struktur fixiert) --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col items-end pt-12 relative lg:-mt-12" 
          >
            <div className="flex items-center justify-between w-full max-w-[320px] mb-6 pr-4">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white italic">
                Our <span className="text-accent-hover">Product Reviews</span>
              </h3>
              <Link href="/reviews" className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-accent-hover transition-colors">
                See All
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="relative aspect-[9/16] w-full max-w-[280px]">
              <AnimatePresence initial={false}>
                {videoReviews.map((review, index) => {
                  const isFront = index === currentIndex;
                  const isNext = index === (currentIndex + 1) % videoReviews.length;
                  const isPrev = index === (currentIndex - 1 + videoReviews.length) % videoReviews.length;

                  if (!isFront && !isNext && !isPrev) return null;

                  return (
                    <motion.div
                      key={review.id}
                      style={{
                        zIndex: isFront ? 10 : isNext ? 5 : 2,
                      }}
                      className="absolute inset-0 overflow-hidden rounded-3xl border border-accent-hover/20 bg-black shadow-2xl flex flex-col"
                      initial={{ opacity: 0, scale: 0.8, x: 100 }}
                      animate={{
                        opacity: isFront ? 1 : 0.6,
                        scale: isFront ? 1 : isNext ? 0.93 : 0.85,
                        x: isFront ? 0 : isNext ? 15 : -15,
                        y: isFront ? 0 : isNext ? 10 : 20,
                        filter: isFront ? "blur(0px)" : "blur(2px)",
                      }}
                      exit={{ opacity: 0, scale: 0.8, x: -100 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Hier wird das Video nur gerendert, wenn es die Vorderseite ist */}
                      {isFront ? (
                        <div className="w-full h-full scale-[1.05] origin-top">
                          <TikTokEmbed videoId={review.tiktokId} />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-surface-light opacity-20" />
                      )}

                      {/* Info-Text (über dem Video für Kontext) */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
                        <p className="text-xs font-bold uppercase tracking-widest text-accent-hover mb-1">Live Review</p>
                        <h4 className="text-sm font-bold text-white leading-tight">{review.title}</h4>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Navigation-Pfeile */}
              <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4 z-30">
                <button 
                  onClick={prevCard}
                  className="w-12 h-12 rounded-full border-2 border-surface-light bg-background/50 flex items-center justify-center text-white hover:border-accent-hover transition-colors shadow-lg active:scale-95"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextCard}
                  className="w-12 h-12 rounded-full border-2 border-surface-light bg-background/50 flex items-center justify-center text-white hover:border-accent-hover transition-colors shadow-lg active:scale-95"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}