"use client";

import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import SpringWrapper from "@/components/animations/SpringWrapper";
import type { Product } from "@/lib/data";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-accent-hover text-accent-hover"
              : "fill-surface-light text-surface-light"
          }`}
        />
      ))}
    </div>
  );
}

interface ProductReviewBoxProps {
  product: Product;
}

export default function ProductReviewBox({ product }: ProductReviewBoxProps) {
  return (
    <SpringWrapper hoverScale={1.03} tapScale={0.98}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface bg-surface/50 transition-colors hover:border-accent/30">
        {/* Image placeholder */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface via-surface-light/30 to-surface">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between">
            <RatingStars rating={product.rating} />
            <span className="text-sm font-bold text-accent-hover">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="font-display text-lg font-semibold uppercase tracking-tight text-foreground transition-colors group-hover:text-accent-hover"
          >
            {product.name}
          </Link>

          <p className="flex-1 text-sm leading-relaxed text-muted">
            {product.excerpt}
          </p>

          {/* Affiliate CTA */}
          <SpringWrapper hoverScale={1.05} tapScale={0.95}>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-accent-hover"
            >
              Shop Now
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </SpringWrapper>
        </div>
      </article>
    </SpringWrapper>
  );
}
