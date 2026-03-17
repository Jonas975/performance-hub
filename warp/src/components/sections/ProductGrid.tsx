"use client";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import SpringWrapper from "@/components/animations/SpringWrapper"; // Importiere deinen SpringWrapper

const products = [
  { id: 1, title: "Pro Tech Gear v1", price: "$199.00", link: "#" },
  { id: 2, title: "Performance Unit X", price: "$249.00", link: "#" },
  { id: 3, title: "Elite Series Adapter", price: "$129.00", link: "#" },
];

export default function ProductGrid() {
  return (
    <section className="py-24 bg-background relative border-t border-surface-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col mb-16">
          <h2 className="font-display text-4xl font-bold uppercase tracking-tighter sm:text-5xl">
            Top <span className="text-accent-hover">Deals</span> Today
          </h2>
          <div className="h-1 w-20 bg-accent mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            /* Wir wickeln die ganze Karte in den SpringWrapper ein */
            <SpringWrapper key={product.id} hoverScale={1.03} tapScale={0.97}>
              <div className="group relative p-8 rounded-2xl border border-surface-light bg-surface/50 backdrop-blur-sm transition-all hover:border-accent/50 h-full cursor-pointer">
                {/* Placeholder für Produktbild */}
                <div className="aspect-[4/3] bg-muted rounded-xl mb-6 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                </div>

                <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-2">
                  {product.title}
                </h3>
                
                <p className="text-2xl font-bold text-accent-hover mb-6">
                  {product.price}
                </p>

                <a 
                  href={product.link} 
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-accent-hover transition-colors"
                >
                  View on eBay
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </SpringWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}