// src/app/cart/page.tsx
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ShoppingBag size={64} className="mx-auto text-muted mb-6 opacity-20" />
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">
          Dein <span className="text-accent-hover italic">Warenkorb</span> ist leer
        </h1>
        <p className="text-muted mb-10 uppercase tracking-widest text-xs font-bold">
          Sieht so aus, als hättest du noch keine Performance-Upgrades ausgewählt.
        </p>
        
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-2xl font-black uppercase hover:bg-accent-hover hover:text-foreground transition-all"
        >
          <ArrowLeft size={20} /> Zurück zum Shop
        </Link>
      </div>
    </div>
  );
}