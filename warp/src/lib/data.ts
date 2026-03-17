/* ── Product Data ── */

export interface Product {
  slug: string;
  name: string;
  category: "supplements" | "equipment" | "apparel";
  price: number;
  rating: number; // 1-5
  image: string; // placeholder path
  affiliateUrl: string;
  excerpt: string;
  description: string;
}

export const products: Product[] = [
  {
    slug: "whey-protein-isolate",
    name: "Whey Protein Isolate",
    category: "supplements",
    price: 54.99,
    rating: 5,
    image: "/products/whey.jpg",
    affiliateUrl: "#",
    excerpt: "Ultra-filtered 27g protein per scoop with zero bloat.",
    description:
      "Our top-rated whey isolate delivers 27g of protein per serving with less than 1g of sugar. Cold-processed to preserve bioactive fractions. Mixes instantly — no clumps, no chalky aftertaste. Tested by third-party labs for purity and potency.",
  },
  {
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    category: "supplements",
    price: 29.99,
    rating: 5,
    image: "/products/creatine.jpg",
    affiliateUrl: "#",
    excerpt: "Micronized 5g serving for strength and recovery.",
    description:
      "Pure micronized creatine monohydrate — the most researched sports supplement on the planet. 5g per serving supports strength, power output, and faster recovery between sets. Unflavored and stackable with any pre-workout.",
  },
  {
    slug: "adjustable-dumbbells",
    name: "Adjustable Dumbbells 5-50lb",
    category: "equipment",
    price: 349.99,
    rating: 4,
    image: "/products/dumbbells.jpg",
    affiliateUrl: "#",
    excerpt: "Replace 15 pairs of dumbbells in one compact set.",
    description:
      "Dial-adjust from 5 to 50 lbs in 2.5 lb increments. Rubberized grip, steel core, compact footprint. Ideal for home gyms where space is at a premium. Backed by a 2-year manufacturer warranty.",
  },
  {
    slug: "resistance-bands-set",
    name: "Resistance Bands Pro Set",
    category: "equipment",
    price: 39.99,
    rating: 4,
    image: "/products/bands.jpg",
    affiliateUrl: "#",
    excerpt: "5 resistance levels from rehab to heavy strength work.",
    description:
      "Natural latex bands in 5 progressive resistance levels (10–60 lbs). Includes door anchor, ankle straps, and carry bag. Perfect for warm-ups, rehab, or full-body workouts on the go.",
  },
  {
    slug: "performance-joggers",
    name: "Performance Joggers",
    category: "apparel",
    price: 64.99,
    rating: 5,
    image: "/products/joggers.jpg",
    affiliateUrl: "#",
    excerpt: "4-way stretch, tapered fit, zippered pockets.",
    description:
      "Engineered with 4-way stretch fabric for unrestricted movement. Tapered leg, elastic waistband with internal drawcord, and two zippered side pockets. Moisture-wicking and squat-proof.",
  },
  {
    slug: "compression-tee",
    name: "Compression Training Tee",
    category: "apparel",
    price: 34.99,
    rating: 4,
    image: "/products/compression.jpg",
    affiliateUrl: "#",
    excerpt: "Second-skin fit with flatlock seams and UV protection.",
    description:
      "Compression-fit tee built for high-intensity training. Flatlock seams eliminate chafing, UPF 30+ sun protection, and antimicrobial treatment keeps odor at bay. Available in 6 colors.",
  },
  {
    slug: "pre-workout-formula",
    name: "Pre-Workout Formula",
    category: "supplements",
    price: 44.99,
    rating: 4,
    image: "/products/preworkout.jpg",
    affiliateUrl: "#",
    excerpt: "Clinically dosed caffeine, citrulline, and beta-alanine.",
    description:
      "No proprietary blends — every ingredient is transparently dosed. 200mg caffeine, 6g citrulline malate, 3.2g beta-alanine, and 1.5g betaine per serving. Smooth energy with no crash.",
  },
  {
    slug: "lifting-belt",
    name: "Lever Lifting Belt",
    category: "equipment",
    price: 89.99,
    rating: 5,
    image: "/products/belt.jpg",
    affiliateUrl: "#",
    excerpt: "10mm genuine leather with quick-release lever buckle.",
    description:
      "Competition-grade 10mm thick genuine leather belt. Quick-release lever buckle for consistent tightness every rep. IPF approved width. Break-in period is minimal thanks to pre-conditioned leather.",
  },
];

/* ── Blog Data ── */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string; // ISO
  readTime: string;
  content: string; // simplified HTML-safe markdown-style text
}

export const blogPosts: BlogPost[] = [
  {
    slug: "top-5-supplements-2026",
    title: "Top 5 Supplements You Actually Need in 2026",
    excerpt:
      "Cut through the noise — these are the only supplements backed by real science and worth your money.",
    image: "/blog/supplements.jpg",
    date: "2026-03-10",
    readTime: "6 min read",
    content: `The supplement industry is worth billions, but most products are underdosed or unnecessary. After reviewing hundreds of studies and testing dozens of products, here are the five supplements that actually deliver results.

1. Creatine Monohydrate — The single most researched and proven supplement for strength and muscle gain. 5g daily is all you need.

2. Whey Protein Isolate — Convenient, fast-absorbing, and effective for hitting your daily protein target. Look for brands with third-party testing.

3. Vitamin D3 — Most people are deficient, especially in northern climates. 2000-5000 IU daily supports bone health, immune function, and mood.

4. Omega-3 Fish Oil — EPA and DHA support heart health, reduce inflammation, and may improve recovery. Aim for 1-2g combined EPA/DHA daily.

5. Magnesium Glycinate — Supports sleep quality, muscle relaxation, and over 300 enzymatic reactions. Most diets fall short of the RDA.

Skip the fat burners, BCAAs, and testosterone boosters. Put your money into these five and a solid training program.`,
  },
  {
    slug: "home-gym-setup-guide",
    title: "The Ultimate Home Gym Setup Under $1,000",
    excerpt:
      "Build a complete home gym without breaking the bank. Here's exactly what to buy and what to skip.",
    image: "/blog/homegym.jpg",
    date: "2026-03-05",
    readTime: "8 min read",
    content: `You don't need a commercial gym to build serious strength. With smart purchases, you can outfit a home gym for under $1,000 that covers 90% of exercises.

The Essentials:
- Adjustable Dumbbells ($300-400) — Replace an entire rack. Look for sets that go up to at least 50 lbs per hand.
- Flat/Incline Bench ($150-200) — Adjustable is better than flat-only. Check the weight capacity.
- Pull-Up Bar ($30-50) — Doorframe-mounted or wall-mounted. Non-negotiable for back development.
- Resistance Bands ($30-40) — Fill gaps that dumbbells can't cover. Great for warm-ups and rehab.
- Flooring ($50-100) — Horse stall mats from a farm supply store are the best value.

Nice to Have (if budget allows):
- Kettlebell (35-50 lb) for swings and Turkish get-ups
- Ab wheel for core work
- Lever lifting belt for heavy compounds

What to Skip:
- All-in-one cable machines under $500 (poor build quality)
- Smith machines (limited range of motion)
- Anything "As Seen on TV"

Focus on compound movements: presses, rows, squats, deadlifts, and pull-ups. You'll be surprised how far dumbbells and bands can take you.`,
  },
  {
    slug: "science-of-recovery",
    title: "The Science of Recovery: What Actually Works",
    excerpt:
      "Ice baths, foam rolling, compression — we break down which recovery methods are backed by evidence.",
    image: "/blog/recovery.jpg",
    date: "2026-02-28",
    readTime: "7 min read",
    content: `Recovery is where gains are made, but the recovery industry is full of expensive gimmicks. Here's what the research actually says.

Proven Methods:
- Sleep (7-9 hours) — The single most powerful recovery tool. Growth hormone peaks during deep sleep. No supplement or gadget can replace it.
- Nutrition — Adequate protein (1.6-2.2g/kg), carbohydrates to replenish glycogen, and overall caloric sufficiency.
- Progressive Overload Management — The best recovery strategy is smart programming that avoids unnecessary junk volume.

Probably Helpful:
- Foam Rolling — Modest evidence for reducing perceived soreness. Won't speed tissue repair, but feels good.
- Light Active Recovery — Easy walks, swimming, or cycling increase blood flow without adding training stress.
- Cold Water Immersion — May reduce soreness after very intense sessions, but could blunt hypertrophy adaptations if used chronically.

Likely Overhyped:
- Cryotherapy chambers — Expensive, and research doesn't show meaningful advantages over simple cold water.
- Compression boots — Feel great, but evidence for actual recovery benefits is thin.
- Most "recovery" supplements — Save your money.

The bottom line: sleep more, eat enough, and train smart. Everything else is marginal at best.`,
  },
  {
    slug: "beginner-strength-program",
    title: "The Only Beginner Strength Program You Need",
    excerpt:
      "Stop program hopping. This simple 3-day full-body routine builds a foundation that lasts.",
    image: "/blog/strength.jpg",
    date: "2026-02-20",
    readTime: "5 min read",
    content: `Beginners overthink programming. You don't need periodization, drop sets, or supersets. You need progressive overload on basic compound movements, done consistently.

The Program (3 days/week, e.g. Mon/Wed/Fri):

Day A:
- Squat 3x5
- Bench Press 3x5
- Barbell Row 3x5

Day B:
- Deadlift 3x5
- Overhead Press 3x5
- Pull-Ups 3x max reps

Alternate between Day A and Day B. Add 5 lbs to upper body lifts and 10 lbs to lower body lifts each week.

Key Principles:
1. Start lighter than you think. Leave ego at the door.
2. Focus on form before weight. Film your sets and compare to reference videos.
3. Eat in a slight caloric surplus with at least 1.6g protein per kg of bodyweight.
4. Sleep 7-9 hours. This is when muscle repair happens.
5. Run this program for 3-6 months before switching. Consistency beats complexity.

This is boring. It's also extremely effective. The best program is the one you actually follow.`,
  },
];

/* ── Helpers ── */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getProductsByCategory(
  category: Product["category"]
): Product[] {
  return products.filter((p) => p.category === category);
}
