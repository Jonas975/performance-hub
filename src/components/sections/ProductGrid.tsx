import { getEbayDeals } from "@/lib/ebay";
import { optimizeFitnessTitle } from "@/lib/gemini"; 
import { generateAIVisual } from "@/lib/gemini-images"; // WICHTIGER IMPORT
import SpringWrapper from "@/components/animations/SpringWrapper";
import { ArrowUpRight, Dumbbell } from "lucide-react";
import Link from "next/link";

const FALLBACK_PRODUCTS = [
  {
    itemId: 'f1',
    title: 'Premium Whey Protein Isolat - 2kg Vanille',
    price: { value: '54.90', currency: 'EUR' },
    image: { imageUrl: 'https://images.unsplash.com/photo-1593095191071-82b63deef6a1?w=800' }
  }
];

export default async function ProductGrid() {
  let products = [];
  try {
    // 1. Daten von eBay holen
    products = await getEbayDeals("Fitness Training Equipment");
  } catch (error) {
    console.error("eBay API Error:", error);
  }

  const rawProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;

  // 2. Jedes Produkt mit KI-Titel und KI-Bild veredeln
  const displayProducts = await Promise.all(
    rawProducts.map(async (item: any) => {
      const [sexyTitle, aiImage] = await Promise.all([
        optimizeFitnessTitle(item.title),
        generateAIVisual(item.title) // HIER WIRD DIE KI GETRIGGERT
      ]);

      return { 
        ...item, 
        displayTitle: sexyTitle,
        aiImage: aiImage 
      };
    })
  );

  return (
    <section className="py-24 bg-background" id="deals">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12 border-b border-surface-light pb-8">
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
              <div className="group p-8 rounded-2xl border border-surface-light bg-surface/30 backdrop-blur-md h-full flex flex-col">
                
                {/* Image Section */}
                <div className="aspect-square bg-muted rounded-xl mb-6 overflow-hidden relative border border-surface-light">
                  <img 
                    // NUTZT DAS KI BILD, FALLS VORHANDEN
                    src={item.aiImage || item.image?.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800"} 
                    alt={item.displayTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <h3 className="font-display text-xl font-bold uppercase line-clamp-2 mb-4 group-hover:text-accent-hover">
                    {item.displayTitle}
                  </h3>
                  <div className="flex items-end justify-between gap-4 mt-2">
                    <p className="text-4xl font-black text-accent-hover tracking-tighter">
                      {item.price.value} <span className="text-lg font-bold text-foreground/80">{item.price.currency}</span>
                    </p>
                  </div>
                </div>

                <Link 
                  href={`/product/${item.itemId}`} 
                  className="mt-8 w-full py-4 rounded-xl bg-foreground text-background font-bold uppercase text-center flex items-center justify-center gap-2.5 hover:bg-accent-hover hover:text-foreground transition-all"
                >
                  Details ansehen <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </SpringWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}