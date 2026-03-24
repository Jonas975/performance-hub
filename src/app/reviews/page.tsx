"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TikTokEmbed from "@/components/TikTokEmbed";

const videoReviews = [
  { 
    id: 1, 
    tiktokId: "7617179507602099489", 
    customer: "Markus J.",
    product: "Extreme Pump - Pre-Workout Test" 
  },
  { 
    id: 2, 
    tiktokId: "7224576737118670106", 
    customer: "Sarah L.",
    product: "Best Whey for you" 
  },
  { 
    id: 3, 
    tiktokId: "7617128665335270686", 
    customer: "Tom H.",
    product: "Homegym Gear" 
  },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <Link 
          href="/" 
          className="flex items-center gap-2 text-muted-foreground hover:text-accent-hover mb-12 transition-colors group w-fit"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-tight text-white">Zurück zum Home</span>
        </Link>

        <div className="mb-16">
          <h1 className="font-display text-5xl font-bold uppercase tracking-tighter mb-4 text-white leading-none">
            Customer <span className="text-accent-hover italic">Video Reviews</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
            Echte Ergebnisse von echten Athleten. Schau dir unsere Community-Reviews direkt aus TikTok an.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {videoReviews.map((review) => (
            <div 
              key={review.id} 
              className="group relative aspect-[9/16] overflow-hidden rounded-3xl border border-surface-light bg-black shadow-2xl transition-all hover:border-accent-hover/50"
            >
              <div className="w-full h-full scale-[1.02] origin-top">
                <TikTokEmbed videoId={review.tiktokId} />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 z-20 pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-accent-hover font-black italic text-xs uppercase tracking-widest">
                    Verified Athlete
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase text-white">
                  {review.product}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{review.customer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}