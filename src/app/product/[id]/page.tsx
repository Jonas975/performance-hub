import { FALLBACK_PRODUCTS } from "@/lib/constants";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, Star } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import { getEbayProduct } from "@/lib/ebay";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: productId } = await params;

  // 1. Versuche Daten von eBay Sandbox zu laden
  const ebayProduct = await getEbayProduct(productId);
  
  // 2. Fallback auf lokale Daten, wenn eBay nichts liefert
  const fallbackProduct = FALLBACK_PRODUCTS.find(
    (p) => p?.itemId?.toString() === productId?.toString()
  );

  const product = ebayProduct || fallbackProduct;

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black uppercase mb-4 text-white">Produkt nicht gefunden</h1>
        <Link href="/" className="px-8 py-3 bg-foreground text-background font-bold rounded-xl hover:bg-accent-hover transition-all">
          Zurück zum Shop
        </Link>
      </div>
    );
  }

  const allImages = product.images || [];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors group w-fit">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="font-bold uppercase tracking-tight">Zurück zur Übersicht</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="sticky top-32">
            <ProductGallery images={allImages} />
          </div>

          <div className="flex flex-col">
            <div className="mb-8">
              <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none text-white">
                {product.title}
              </h1>
              
              {/* Bewertungen Sektion */}
              <div className="flex items-center gap-2 mb-6 text-accent-hover">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(parseFloat(product.rating?.averageRating || "0")) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm font-bold text-white">
                  {product.rating?.averageRating || "4.5"} ({product.rating?.reviewCount || 0} Bewertungen)
                </span>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-6xl font-black text-accent-hover italic tracking-tighter">
                  {product.price?.value} {product.price?.currency}
                </p>
              </div>
            </div>

            <div className="bg-surface/50 border border-surface-light rounded-2xl p-6 mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-accent-hover mb-3">Beschreibung</h3>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-surface/30 border border-surface-light">
                <ShieldCheck className="text-accent-hover" size={24} />
                <span className="text-xs font-bold uppercase text-white">eBay Käuferschutz</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-surface/30 border border-surface-light">
                <Truck className="text-accent-hover" size={24} />
                <span className="text-xs font-bold uppercase text-white">Schneller Versand</span>
              </div>
            </div>

            <a 
              href={product.itemWebUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group w-full py-6 rounded-2xl bg-foreground text-background font-black uppercase text-xl text-center flex items-center justify-center gap-4 hover:bg-accent-hover hover:text-foreground transition-all shadow-xl active:scale-95"
            >
              <ShoppingCart size={28} /> 
              Jetzt bei eBay kaufen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}