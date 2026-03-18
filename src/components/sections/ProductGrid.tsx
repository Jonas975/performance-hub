// src/components/sections/ProductGrid.tsx
import { getEbayDeals } from "@/lib/ebay";
import { optimizeFitnessTitle } from "@/lib/gemini"; 
import SpringWrapper from "@/components/animations/SpringWrapper";
import { ArrowUpRight, Dumbbell } from "lucide-react";
import Link from "next/link"; // Wichtig für interne Verlinkung

const FALLBACK_PRODUCTS = [
  {
    itemId: 'f1',
    title: 'Premium Whey Protein Isolat - 2kg Vanille',
    price: { value: '54.90', currency: 'EUR' },
    image: { imageUrl: 'https://images.unsplash.com/photo-1593095191071-82b63deef6a1?auto=format&fit=crop&q=80&w=800' },
    itemWebUrl: 'https://www.ebay.de/itm/364052345678' 
  },
  {
    itemId: 'f2',
    title: 'Pro Griffkraft-Zughilfen für Kreuzheben',
    price: { value: '14.95', currency: 'EUR' },
    image: { imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' },
    itemWebUrl: 'https://www.ebay.de/itm/255891234567'
  },
  {
    itemId: 'f3',
    title: 'Einstellbare Kurzhanteln Set (2x 24kg)',
    price: { value: '189.00', currency: 'EUR' },
    image: { imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2603b8?auto=format&fit=crop&q=80&w=800' },
    itemWebUrl: 'https://www.ebay.de/itm/267353915763'
  }
];

export default async function ProductGrid() {
  let products = [];
  try {
    products = await getEbayDeals("Fitness Training Equipment");
  } catch (error) {
    console.error("eBay API Error:", error);
  }

  const rawProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;

  const displayProducts = await Promise.all(
    rawProducts.map(async (item: any) => {
      const sexyTitle = await optimizeFitnessTitle(item.title);
      return { 
        ...item, 
        displayTitle: sexyTitle 
      };
    })
  );

  return (
    <section className="py-24 bg-background" id="deals">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12 border-b border-surface-light pb-8">
          <div className="p-3 bg-accent-hover/10 rounded-xl">
            <Dumbbell className="h-8 w-8 text-accent-hover" />
          </div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter">
            Top <span className="text-accent-hover">Fitness</span> Deals
          </h2>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayProducts.map((item: any) => (
            <SpringWrapper key={item.itemId} hoverScale={1.03}>
              <div className="group p-8 rounded-2xl border border-surface-light bg-surface/30 backdrop-blur-md h-full flex flex-col hover:border-accent-hover/50 transition-colors shadow-lg hover:shadow-accent-hover/10">
                
                {/* Image */}
                <div className="aspect-square bg-muted rounded-xl mb-6 overflow-hidden relative border border-surface-light">
                  <img 
                    src={item.image?.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800"} 
                    alt={item.displayTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                    Check Details
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-between">
                  <h3 className="font-display text-xl font-bold uppercase line-clamp-2 mb-4 leading-tight group-hover:text-accent-hover transition-colors">
                    {item.displayTitle}
                  </h3>
                  <div className="flex items-end justify-between gap-4 mt-2">
                    <p className="text-4xl font-black text-accent-hover tracking-tighter">
                      {item.price.value} <span className="text-lg font-bold text-foreground/80">{item.price.currency}</span>
                    </p>
                    <div className="text-xs text-muted-foreground bg-surface px-2 py-0.5 rounded">
                      Inkl. MwSt.
                    </div>
                  </div>
                </div>

                {/* NEUER BUTTON: Leitet auf die interne Detailseite weiter */}
                <Link 
                  href={`/product/${item.itemId}`} 
                  className="mt-8 w-full py-4 rounded-xl bg-foreground text-background font-bold uppercase text-center flex items-center justify-center gap-2.5 hover:bg-accent-hover hover:text-foreground transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Details ansehen <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </SpringWrapper>
          ))}
        </div>

        {/* Footer Info */}
        <p className="mt-16 text-center text-sm text-muted-foreground bg-surface/50 p-4 rounded-lg inline-block mx-auto border border-surface-light">
          * Preise werden live über die <span className="text-accent-hover font-medium">eBay Sandbox API</span> abgerufen und optimiert.
        </p>
      </div>
    </section>
  );
}