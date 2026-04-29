"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getLocalizedBlogPosts } from "@/lib/blog-data";
import { useLocaleContext } from "@/contexts/LocaleContext";
import BlogGrid from "./BlogGrid";

export default function BlogPage() {
  const { locale } = useLocaleContext();
  const blogPosts = getLocalizedBlogPosts(locale as any);
  const [featured, ...rest] = blogPosts;

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            The <span className="text-accent-hover">Blog</span>
          </h1>
          <p className="mt-3 max-w-lg text-base text-muted">
            Evidence-based guides on training, nutrition, and recovery.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group mb-16 block overflow-hidden rounded-2xl border border-surface bg-surface/50 transition-colors hover:border-accent/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image placeholder */}
            <div className="relative aspect-[16/9] bg-gradient-to-br from-surface via-surface-light/20 to-surface md:aspect-auto md:min-h-[320px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Featured
                </span>
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-col justify-center gap-4 p-8">
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(featured.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readTime}
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-accent-hover sm:text-3xl">
                {featured.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-hover">
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>

        {/* Remaining posts grid */}
        <BlogGrid posts={rest} />
      </div>
    </section>
  );
}
