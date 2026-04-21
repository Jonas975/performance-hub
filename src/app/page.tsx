import MotionHero from "@/components/sections/MotionHero";
import BlogCarousel from "@/components/sections/BlogCarousel";
import BrandMarquee from "@/components/sections/InfiniteMarquee";
import {
  getStoreProductListings,
  type EbayProductListing,
} from "@/lib/ebay";
import { FALLBACK_PRODUCTS } from "@/lib/constants";

export default async function Home() {
  let marqueeProducts: EbayProductListing[] = [];

  try {
    marqueeProducts = await getStoreProductListings(12);
  } catch (error) {
    console.error("[Home] eBay fetch failed:", error);
  }

  // Fallback to local products if eBay returned nothing
  if (marqueeProducts.length === 0) {
    marqueeProducts = FALLBACK_PRODUCTS.map((p) => ({
      itemId: p.itemId,
      title: p.title,
      price: p.price,
      imageUrl: p.images?.[0] || null,
      itemWebUrl: p.itemWebUrl || "#",
    }));
  }

  return (
    <main className="flex flex-col w-full bg-background">
      {/* 1. HERO SECTION (Elevate your Performance + TikToks) */}
      <MotionHero />

      {/* 2. BRAND MARQUEE (Visueller Trenner zwischen Hero und Content) */}
      <BrandMarquee products={marqueeProducts} />

      {/* 3. BLOG CAROUSEL (Die 3 Insights mit Pfeil-Navigation) */}
      <div className="relative z-10">
        <BlogCarousel />
      </div>
    </main>
  );
}
