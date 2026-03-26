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

/**
 * Mint an Application access token using the client_credentials grant.
 * Tokens are cached and reused until they expire (7200s / 2 hours).
 */
async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const clientId = process.env.EBAY_APP_ID;
  const clientSecret = process.env.EBAY_CERT_ID;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing EBAY_APP_ID or EBAY_CERT_ID in environment variables."
    );
  }

  // Base64-encode "client_id:client_secret"
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

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

  console.log(
    `[eBay] OAuth token minted (${isSandbox ? "SANDBOX" : "PRODUCTION"}, expires in ${data.expires_in}s)`
  );

  return cachedToken!;
}

/* ── Browse API: Search ── */

export interface EbayItem {
  itemId: string;
  title: string;
  price: { value: string; currency: string };
  image: { imageUrl: string } | null;
  itemWebUrl: string;
  condition: string;
}

/**
 * Search eBay listings via the Browse API.
 * Returns an array of item summaries or [] on failure.
 */
export async function getEbayDeals(
  query = "fitness supplements",
  limit = 6
): Promise<EbayItem[]> {
  try {
    const token = await getAccessToken();

    const url =
      `${BROWSE_URL}/item_summary/search` +
      `?q=${encodeURIComponent(query)}` +
      `&limit=${limit}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID": MARKETPLACE_ID,
        Accept: "application/json",
      },
      next: { revalidate: 86400 }, // 24h cache
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(
        `[eBay] Browse API search failed (${response.status}):`,
        text
      );
      return [];
    }

    const data = await response.json();
    const items: EbayItem[] = (data.itemSummaries || []).map((item: any) => ({
      itemId: item.itemId,
      title: item.title,
      price: {
        value: item.price?.value || "0.00",
        currency: item.price?.currency || "EUR",
      },
      image: item.image ? { imageUrl: item.image.imageUrl } : null,
      itemWebUrl: item.itemWebUrl || "#",
      condition: item.condition || "New",
    }));

    console.log(`[eBay] Search "${query}" returned ${items.length} items`);
    return items;
  } catch (error) {
    console.error("[eBay] Search error:", error);
    return [];
  }
}

/* ── Browse API: Get Single Item ── */

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
}

/**
 * Fetch a single eBay item by its Browse API item ID.
 * Returns null if the item is not found or the call fails.
 */
export async function getEbayProduct(
  itemId: string
): Promise<EbayItemDetail | null> {
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

    if (!response.ok) {
      console.error(
        `[eBay] getItem failed for ${itemId} (${response.status})`
      );
      return null;
    }

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
    };
  } catch (error) {
    console.error("[eBay] getItem error:", error);
    return null;
  }
}
