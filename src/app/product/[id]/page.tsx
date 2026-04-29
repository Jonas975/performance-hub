// src/app/product/[id]/page.tsx
import { FALLBACK_PRODUCTS } from "@/lib/constants";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, Star, ArrowRight, ExternalLink } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import { getEbayProduct, getStoreProductListings } from "@/lib/ebay";
import { optimizeProductDescription } from "@/lib/gemini";
import ExpandableDescription from "@/components/ExpandableDescription";
import SpringWrapper from "@/components/animations/SpringWrapper";
import WishlistButton from "@/components/WishlistButton";
import { generateAffiliateLink } from "@/lib/affiliateUtils";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const productId = decodeURIComponent(rawId);

  // 1. Daten laden
  const [ebayProduct, allListings] = await Promise.all([
    getEbayProduct(productId),
    getStoreProductListings(12) 
  ]);

  const summaryMatch = allListings.find(l => l.itemId === productId);
  const fallbackProduct = FALLBACK_PRODUCTS.find(
    (p) => p?.itemId?.toString() === productId?.toString()
  );

  let product = null;

  if (ebayProduct) {
    const optimizedDescription = await optimizeProductDescription(ebayProduct.description);
    product = {
      itemId: ebayProduct.itemId,
      title: ebayProduct.title,
      price: ebayProduct.price,
      description: optimizedDescription,
      images: Array.from(new Set([
        ebayProduct.image?.imageUrl,
        ...ebayProduct.additionalImages.map((img) => img.imageUrl),
        ...(summaryMatch?.summaryImages || [])
      ])).filter(Boolean) as string[],
      itemWebUrl: ebayProduct.itemWebUrl,
      affiliateUrl: ebayProduct.affiliateUrl || generateAffiliateLink({itemId: ebayProduct.itemId, marketplace: "EBAY_DE", customId: "product-detail"}),
      imageUrl: ebayProduct.image?.imageUrl || (summaryMatch?.summaryImages && summaryMatch.summaryImages[0])
    };
  } else if (fallbackProduct) {
    product = {
      itemId: fallbackProduct.itemId,
      title: fallbackProduct.title,
      price: fallbackProduct.price,
      description: fallbackProduct.description || "",
      images: fallbackProduct.images || [],
      itemWebUrl: fallbackProduct.itemWebUrl || "#",
      affiliateUrl: fallbackProduct.affiliateUrl || generateAffiliateLink({itemId: fallbackProduct.itemId, marketplace: "EBAY_DE", customId: "product-detail"}),
      imageUrl: fallbackProduct.images[0]
    };
  }

  if (!product) return <div className="text-white pt-40 text-center font-black uppercase">Produkt nicht gefunden</div>;

  // Empfehlungen (Aktuelles Produkt ausschließen)
  const recommendations = allListings.filter(item => item.itemId !== productId).slice(0, 4);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Zurück Button */}
        <Link href="/shop" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors group w-fit">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-tight text-xs">Zurück zum Shop</span>
        </Link>

        {/* Haupt-Produkt-Sektion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          {/* Galerie mit absolutem Wishlist-Button */}
          <div className="lg:sticky lg:top-32 relative group">
            <div className="absolute top-6 right-6 z-20">
               <WishlistButton product={product} />
            </div>
            <ProductGallery images={product.images} />
          </div>

          <div className="flex flex-col">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none text-white">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mb-6 text-accent-hover">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />)}
                </div>
                <span className="text-sm font-bold text-white">4.9 (PerformanceHub Score)</span>
              </div>
              <p className="text-5xl md:text-6xl font-black text-accent-hover italic tracking-tighter">
                {product.price?.value} {product.price?.currency}
              </p>
            </div>

            {product.description && <ExpandableDescription description={product.description} />}

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 p-5 rounded-2xl bg-surface/30 border border-surface-light">
                <ShieldCheck className="text-accent-hover" size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Käuferschutz</span>
              </div>
              <div className="flex items-center gap-3 p-5 rounded-2xl bg-surface/30 border border-surface-light">
                <Truck className="text-accent-hover" size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Versandbereit</span>
              </div>
            </div>

            <a href={product.affiliateUrl || product.itemWebUrl} target="_blank" rel="noopener noreferrer sponsored" className="group w-full py-6 rounded-2xl bg-foreground text-background font-black uppercase text-xl text-center flex items-center justify-center gap-4 hover:bg-accent-hover hover:text-foreground transition-all shadow-2xl active:scale-95">
              <ShoppingCart size={28} /> Buy on eBay
            </a>
          </div>
        </div>

        {/* --- MEHR AUS DEM SHOP SEKTION --- */}
        <div className="border-t border-surface-light pt-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
                Mehr aus unserem <span className="text-accent-hover italic">Shop</span>
              </h2>
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs mt-2">
                Das könnte dich auch interessieren
              </p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-accent-hover font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
              Alles ansehen <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendations.map((item) => (
              <SpringWrapper key={item.itemId} hoverScale={1.02}>
                <div className="relative h-full group">
                  {/* Herz-Button für Empfehlungs-Cards */}
                  <div className="absolute top-4 right-4 z-10">
                    <WishlistButton product={item} />
                  </div>
                  
                  <div className="bg-surface/20 border border-surface-light rounded-3xl p-4 h-full flex flex-col hover:border-accent-hover transition-colors">
                    <Link href={`/product/${encodeURIComponent(item.itemId)}`} className="block flex-grow">
                      <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-black">
                        <img 
                          src={item.imageUrl || (item.summaryImages && item.summaryImages[0])} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-sm font-bold uppercase text-white line-clamp-2 mb-2 group-hover:text-accent-hover transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-lg font-black text-accent-hover italic">
                        {item.price.value} {item.price.currency}
                      </p>
                    </Link>
                    <a 
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="mt-4 w-full py-2 px-3 bg-accent-hover/20 text-accent-hover text-xs font-black uppercase rounded-lg hover:bg-accent-hover hover:text-background transition-all flex items-center justify-center gap-1"
                    >
                      <ShoppingCart size={12} /> Buy
                    </a>
                  </div>
                </div>
              </SpringWrapper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}