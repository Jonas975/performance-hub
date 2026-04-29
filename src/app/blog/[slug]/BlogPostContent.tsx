"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getLocalizedBlogPost } from "@/lib/blog-data";
import { useLocaleContext } from "@/contexts/LocaleContext";

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const { locale } = useLocaleContext();
  const post = getLocalizedBlogPost(slug, locale as any);

  if (!post) {
    return (
      <article className="min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p>Post not found</p>
        </div>
      </article>
    );
  }

  return (
    <article className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent-hover"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {post.excerpt}
          </p>
        </header>

        {/* Divider */}
        <div className="mb-10 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        {/* Content — render paragraphs from plain text */}
        <div className="space-y-6">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-foreground/85"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-surface bg-surface/50 p-8 text-center">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
            Ready to level up?
          </h2>
          <p className="mt-2 text-sm text-muted">
            Check out our top-rated products — tested and reviewed by athletes.
          </p>
          <Link
            href="/shop"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-accent-hover"
          >
            View Top Picks
          </Link>
        </div>
      </div>
    </article>
  );
}
