// src/components/sections/ProductGrid.tsx

import { getEbayDeals } from "@/lib/ebay";
import SpringWrapper from "@/components/animations/SpringWrapper";
import { ArrowUpRight, Dumbbell } from "lucide-react";

// Diese Fitness-Produkte werden angezeigt, wenn die eBay-Sandbox keine Ergebnisse liefert
const FALLBACK_PRODUCTS = [
  {
    itemId: 'f1',
    title: 'Premium Whey Protein Isolat - 2kg Vanille',
    price: { value: '54.90', currency: 'EUR' },
    image: { imageUrl: 'https://images.unsplash.com/photo-1593095191071-82b63deef6a1?q=80&w=800' },
    itemWebUrl: 'https://www.ebay.de/sch/i.html?_nkw=whey+protein'
  },
  {
    itemId: 'f2',
    title: 'Pro Griffkraft-Zughilfen für Kreuzheben',
    price: { value: '14.95', currency: 'EUR' },
    image: { imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800' },
    itemWebUrl: 'https://www.ebay.de/sch/i.html?_nkw=zughilfen'
  },
  {
    itemId: 'f3',
    title: 'Einstellbare Kurzhanteln Set (2x 24kg)',
    price: { value: '189.00', currency: 'EUR' },
    image: { imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2603b8?q=80&w=800' },
    itemWebUrl: 'https://www.ebay.de/sch/i.html?_nkw=kurzhanteln'
  }
];

export default async function ProductGrid() {
  // Wir suchen nach Fitness-Equipment
  let products = [];
  try {
    products = await getEbayDeals("Fitness Training Equipment");
  } catch (error) {
    console.error("Fehler beim Laden der eBay-Deals:", error);
  }

  // Falls API leer ist (typisch für Sandbox), nutze Fitness-Fallbacks
  const displayProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;

  return (
    <section className="py-24 bg-background" id="deals">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-accent-hover/10 rounded-xl">
            <Dumbbell className="h-8 w-8 text-accent-hover" />
          </div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter">
            Top <span className="text-accent-hover">Fitness</span> Deals
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayProducts.map((item: any) => (
            <SpringWrapper key={item.itemId} hoverScale={1.03}>
              <div className="group p-8 rounded-2xl border border-surface-light bg-surface/30 backdrop-blur-md h-full flex flex-col hover:border-accent-hover/50 transition-colors">
                
                {/* Produktbild */}
                <div className="aspect-square bg-muted rounded-xl mb-6 overflow-hidden relative">
                  <img 
                    src={item.image?.imageUrl || "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800"} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase">
                    eBay Deal
                  </div>
                </div>

                {/* Produkt Info */}
                <div className="flex-grow">
                  <h3 className="font-display text-xl font-bold uppercase line-clamp-2 mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-3xl font-black text-accent-hover">
                    {item.price.value} <span className="text-sm">{item.price.currency}</span>
                  </p>
                </div>

                {/* Button */}
                <a 
                  href={item.itemWebUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full py-4 rounded-xl bg-foreground text-background font-bold uppercase text-center flex items-center justify-center gap-2 hover:bg-accent-hover hover:text-foreground transition-all"
                >
                  Jetzt ansehen <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </SpringWrapper>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground italic">
          * Preise werden live über die eBay API abgerufen.
        </p>
      </div>
    </section>
  );
}