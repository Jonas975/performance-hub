// src/app/wishlist/page.tsx
"use client";

import { useWishlist } from "@/lib/wishlistStore";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black uppercase tracking-tighter text-white mb-12">
          Deine <span className="text-accent-hover italic">Merkliste</span>
        </h1>

        {wishlist.length === 0 ? (
          <div className="border-2 border-dashed border-surface-light rounded-[40px] p-20 text-center">
            <p className="text-muted font-bold uppercase tracking-widest mb-8">Deine Liste ist noch leer</p>
            <Link href="/shop" className="bg-foreground text-background px-8 py-4 rounded-2xl font-black uppercase hover:bg-accent-hover transition-all">
              Produkte entdecken
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <div key={item.itemId} className="bg-surface/20 border border-surface-light rounded-3xl p-6 flex flex-col group">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-4 right-4 p-3 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <h3 className="text-xl font-black uppercase text-white line-clamp-2 mb-4">{item.title}</h3>
                <div className="mt-auto flex items-center justify-between">
                  <p className="text-2xl font-black text-accent-hover italic">{item.price.value} {item.price.currency}</p>
                  <Link href={`/product/${encodeURIComponent(item.itemId)}`} className="p-4 bg-white text-black rounded-xl hover:bg-accent-hover transition-all">
                    <ShoppingBag size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}