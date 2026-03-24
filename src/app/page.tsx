import MotionHero from "@/components/sections/MotionHero";
import BlogCarousel from "@/components/sections/BlogCarousel";
import BrandMarquee from "@/components/sections/InfiniteMarquee";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-background">
      {/* 1. HERO SECTION (Elevate your Performance + TikToks) */}
      <MotionHero />

      {/* 2. BRAND MARQUEE (Visueller Trenner zwischen Hero und Content) */}
      <BrandMarquee />

      {/* 3. BLOG CAROUSEL (Die 3 Insights mit Pfeil-Navigation) */}
      <div className="relative z-10">
        <BlogCarousel />
      </div>

      {/* 4. PRODUKT SECTION - ENTFERNT */}
      {/* Die eBay-Deals wurden hier gelöscht, um die Landingpage sauber zu halten */}
      
    </main>
  );
}