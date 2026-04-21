// src/lib/ebay.ts
// eBay Browse API integration with OAuth 2.0 and sandbox/production toggle.

/* ── Environment toggle ── */

const isSandbox = (process.env.EBAY_ENVIRONMENT || "sandbox") === "sandbox";

const BASE_URL = isSandbox
  ? "https://api.sandbox.ebay.com"
  : "https://api.ebay.com";

const TOKEN_URL = `${BASE_URL}/identity/v1/oauth2/token`;
const BROWSE_URL = `${BASE_URL}/buy/browse/v1`;

// Default to German marketplace; override via env if needed
const MARKETPLACE_ID = process.env.EBAY_MARKETPLACE_ID || "EBAY_DE";

/* ── OAuth 2.0 Token Cache ── */

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

export const SANDBOX_TEST_SEARCH_QUERY = "sport";
export const PRODUCTION_FITNESS_SEARCH_QUERY =
  "(whey protein, creatine, dumbbell, kettlebell, resistance band, home gym)";
const STORE_LISTING_QUERY = isSandbox
  ? SANDBOX_TEST_SEARCH_QUERY
  : PRODUCTION_FITNESS_SEARCH_QUERY;

/**
 * Erzeugt oder erneuert das OAuth 2.0 Access Token.
 */
async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const clientId = process.env.EBAY_APP_ID;
  const clientSecret = process.env.EBAY_CERT_ID;

  if (!clientId || !clientSecret) {
    throw new Error("Missing EBAY_APP_ID or EBAY_CERT_ID in environment variables.");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope",
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`eBay OAuth failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000;

  return cachedToken!;
}

/* ── Interfaces ── */

export interface EbayProductListing {
  itemId: string;
  title: string;
  price: { value: string; currency: string };
  imageUrl: string | null;
  summaryImages: string[]; // Fix: Speichert zusätzliche Bilder aus der Suche für die Bike-Galerie
  itemWebUrl: string;
}

export interface EbayItemDetail {
  itemId: string;
  title: string;
  price: { value: string; currency: string };
  image: { imageUrl: string } | null;
  additionalImages: { imageUrl: string }[];
  itemWebUrl: string;
  condition: string;
  description: string;
  shortDescription: string;
  primaryItemGroupId?: string; // Für Varianten-Tracking
}

/* ── Browse API: Search ── */

/**
 * Holt Produktlisten und bewahrt dabei alle Bild-Metadaten aus den Suchergebnissen.
 */
export async function getStoreProductListings(limit = 12): Promise<EbayProductListing[]> {
  try {
    const token = await getAccessToken();
    const url = `${BROWSE_URL}/item_summary/search?q=${encodeURIComponent(STORE_LISTING_QUERY)}&limit=${limit}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID": MARKETPLACE_ID,
        Accept: "application/json",
      },
      next: { revalidate: 3600 }, // 1h cache für die Shop-Übersicht
    });

    if (!response.ok) return [];

    const data = await response.json();
    
    return (data.itemSummaries || []).map((item: any) => {
      // Sammle alle verfügbaren Bilder aus der Suche (Thumbnail, Main, Additional)
      const summaryImages = Array.from(new Set([
        item.image?.imageUrl,
        ...(item.additionalImages || []).map((img: any) => img.imageUrl),
        ...(item.thumbnailImages || []).map((img: any) => img.imageUrl)
      ].filter(Boolean))) as string[];

      return {
        itemId: item.itemId,
        title: item.title,
        price: {
          value: item.price?.value || "0.00",
          currency: item.price?.currency || "EUR",
        },
        imageUrl: item.image?.imageUrl || summaryImages[0] || null,
        summaryImages: summaryImages,
        itemWebUrl: item.itemWebUrl || "#",
      };
    });
  } catch (error) {
    console.error("[eBay] Search error:", error);
    return [];
  }
}

/**
 * Controller-Fix: Reichert Listings ohne Bild mit Daten aus der Detail-API an.
 * Dies stellt sicher, dass Karten im Shop das gleiche Bild zeigen wie die Produktseite.
 */
export async function enrichListingsWithImages(listings: EbayProductListing[]): Promise<EbayProductListing[]> {
  return Promise.all(
    listings.map(async (item) => {
      if (!item.imageUrl) {
        const details = await getEbayProduct(item.itemId);
        if (details?.image?.imageUrl) {
          return { ...item, imageUrl: details.image.imageUrl };
        }
      }
      return item;
    })
  );
}

/* ── Browse API: Get Single Item ── */

/**
 * Holt Details für ein einzelnes Produkt.
 */
export async function getEbayProduct(itemId: string): Promise<EbayItemDetail | null> {
  try {
    const token = await getAccessToken();
    const url = `${BROWSE_URL}/item/${encodeURIComponent(itemId)}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID": MARKETPLACE_ID,
        Accept: "application/json",
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) return null;

    const item = await response.json();

    return {
      itemId: item.itemId,
      title: item.title,
      price: {
        value: item.price?.value || "0.00",
        currency: item.price?.currency || "EUR",
      },
      image: item.image ? { imageUrl: item.image.imageUrl } : null,
      additionalImages: (item.additionalImages || []).map((img: any) => ({
        imageUrl: img.imageUrl,
      })),
      itemWebUrl: item.itemWebUrl || "#",
      condition: item.condition || "Unknown",
      description: item.description || "",
      shortDescription: item.shortDescription || "",
      primaryItemGroupId: item.primaryItemGroupId,
    };
  } catch (error) {
    console.error("[eBay] getItem error:", error);
    return null;
  }
}