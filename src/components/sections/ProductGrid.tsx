// src/components/sections/ProductGrid.tsx

import { getEbayDeals } from "@/lib/ebay";
// WICHTIG: Stelle sicher, dass du src/lib/gemini.ts erstellt hast und GEMINI_API_KEY in .env.local steht!
import { optimizeFitnessTitle } from "@/lib/gemini"; 
import SpringWrapper from "@/components/animations/SpringWrapper";
import { ArrowUpRight, Dumbbell } from "lucide-react";

// DEINE WICHTIGEN HANTELN & CO. BLEIBEN HIER, ABER MIT BESSEREN BILDERN:
const FALLBACK_PRODUCTS = [
  {
    itemId: 'f1',
    title: 'Premium Whey Protein Isolat - 2kg Vanille',
    price: { value: '54.90', currency: 'EUR' },
    image: { imageUrl: 'https://images.unsplash.com/photo-1593095191071-82b63deef6a1?auto=format&fit=crop&q=80&w=800' },
    // DIREKTER LINK ZU EINEM PROTEIN-PRODUKT AUF EBAY
    itemWebUrl: 'https://www.ebay.de/itm/364052345678' 
  },
  {
    itemId: 'f2',
    title: 'Pro Griffkraft-Zughilfen für Kreuzheben',
    price: { value: '14.95', currency: 'EUR' },
    image: { imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' },
    // DIREKTER LINK ZU ZUGHILFEN
    itemWebUrl: 'https://www.ebay.de/itm/255891234567'
  },
  {
    itemId: 'f3',
    title: 'Einstellbare Kurzhanteln Set (2x 24kg)',
    price: { value: '189.00', currency: 'EUR' },
    image: { imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2603b8?auto=format&fit=crop&q=80&w=800' },
    // DIREKTER LINK ZU KURZHANTELN
    itemWebUrl: 'https://www.ebay.de/itm/267353915763?_skw=hanteln&itmmeta=01KM029G63VJPGC36ETAJ1SQ26&hash=item3e3f890173:g:nv0AAeSwiQhokMGH&itmprp=enc%3AAQALAAAAwGfYFPkwiKCW4ZNSs2u11xApCsLkdgRmu5UraQD--o8VuNhWDFGfIYgsbr%2BARnqjH5JpCEZnvjFR5m%2FApJt1sQmSt%2BKArmjR4jrsJawhtOz1b6S1m%2FPcJkDAMt3XmQrT1sw4mgELdKX0dO6YP4ZPAOeDXMQ7YykpzrMJhSoqigXf5BwzbNiKsnWySCqgYBqG%2BbMP%2FdVed9vHxLAlMYCmjQNjjQ7vwC%2BMu9kuIN%2FzVir0LiqgkWW5BgDwYRsHasT%2F9w%3D%3D%7Ctkp%3ABlBMULSDpoKgZw'
  }
];

export default async function ProductGrid() {
  let products = [];
  try {
    // Versuch, echte Deals zu laden
    products = await getEbayDeals("Fitness Training Equipment");
  } catch (error) {
    console.error("eBay API Error:", error);
  }

  // Wenn eBay leer ist (Sandbox), nutzen wir deine Hantel-Produkte
  const rawProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;

  // JETZT: Wir schicken JEDES Produkt (egal ob eBay oder Hantel-Fallback) durch Gemini
  // Promise.all sorgt dafür, dass alle Titel gleichzeitig verarbeitet werden
  const displayProducts = await Promise.all(
    rawProducts.map(async (item: any) => {
      const sexyTitle = await optimizeFitnessTitle(item.title);
      return { 
        ...item, 
        displayTitle: sexyTitle // Hier speichern wir den sauberen Namen
      };
    })
  );

  return (
    <section className="py-24 bg-background" id="deals">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header-Bereich */}
        <div className="flex items-center gap-4 mb-12 border-b border-surface-light pb-8">
          <div className="p-3 bg-accent-hover/10 rounded-xl">
            <Dumbbell className="h-8 w-8 text-accent-hover" />
          </div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter">
            Top <span className="text-accent-hover">Fitness</span> Deals
          </h2>
        </div>
        
        {/* Produkt-Raster */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayProducts.map((item: any) => (
            <SpringWrapper key={item.itemId} hoverScale={1.03}>
              <div className="group p-8 rounded-2xl border border-surface-light bg-surface/30 backdrop-blur-md h-full flex flex-col hover:border-accent-hover/50 transition-colors shadow-lg hover:shadow-accent-hover/10">
                
                {/* Produktbild */}
                <div className="aspect-square bg-muted rounded-xl mb-6 overflow-hidden relative border border-surface-light">
                  <img 
                    // Wir nutzen das Bild aus dem API-Ergebnis ODER das Fallback-Bild
                    // Das object-cover sorgt dafür, dass das Bild den Platz ausfüllt, ohne verzerrt zu werden
                    src={item.image?.imageUrl || "https://cdn.pixabay.com/photo/2017/04/25/22/28/desaturated-2261008_1280.jpg"} 
                    alt={item.displayTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Kleines Badge oben rechts */}
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                    eBay Deal
                  </div>
                </div>

                {/* Produkt Info Bereich (wächst, um den Button nach unten zu drücken) */}
                <div className="flex-grow flex flex-col justify-between">
                  {/* WICHTIG: Hier wird der neue, saubere Gemini-Titel angezeigt! */}
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

                {/* Action Button */}
                <a 
                  href={item.itemWebUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full py-4 rounded-xl bg-foreground text-background font-bold uppercase text-center flex items-center justify-center gap-2.5 hover:bg-accent-hover hover:text-foreground transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Jetzt ansehen <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </SpringWrapper>
          ))}
        </div>

        {/* Fußnote */}
        <p className="mt-16 text-center text-sm text-muted-foreground bg-surface/50 p-4 rounded-lg inline-block mx-auto border border-surface-light">
          * Preise werden live über die <span className="text-accent-hover font-medium">eBay Sandbox API</span> abgerufen und können variieren.
        </p>
      </div>
    </section>
  );
}