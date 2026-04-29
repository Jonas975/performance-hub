"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface LocalizedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

export default function BlogGrid({ posts }: { posts: LocalizedBlogPost[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <ScrollReveal key={post.slug} delay={i * 0.1}>
          <Link
            href={`/blog/${post.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface bg-surface/50 transition-colors hover:border-accent/30"
          >
            {/* Image placeholder */}
            <div className="relative aspect-[16/9] bg-gradient-to-br from-surface via-surface-light/20 to-surface">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Article
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="font-display text-base font-semibold uppercase tracking-tight text-foreground transition-colors group-hover:text-accent-hover">
                {post.title}
              </h3>

              <p className="flex-1 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-hover">
                Read more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}
