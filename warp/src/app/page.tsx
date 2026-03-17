import MotionHero from "@/components/sections/MotionHero";
import ProductGrid from "@/components/sections/ProductGrid"; // Neu importieren

export default function Home() {
  return (
    <main>
      <MotionHero />
      <ProductGrid /> {/* Hier unter den Hero setzen */}
    </main>
  );
}