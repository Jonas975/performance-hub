/**
 * eBay Partner Network (EPN) Affiliate Link Generator
 * Converts product URLs to tracked affiliate links with proper parameters
 */

// Marketplace configurations with rotation IDs
export const MARKETPLACE_CONFIG = {
  EBAY_DE: {
    domain: "ebay.de",
    rotationId: "707-53477-19255-0",
    name: "Germany",
  },
  EBAY_US: {
    domain: "ebay.com",
    rotationId: "711-53200-19255-0",
    name: "USA",
  },
  EBAY_UK: {
    domain: "ebay.co.uk",
    rotationId: "710-53481-19255-0",
    name: "United Kingdom",
  },
  EBAY_FR: {
    domain: "ebay.fr",
    rotationId: "709-53476-19255-0",
    name: "France",
  },
  EBAY_IT: {
    domain: "ebay.it",
    rotationId: "724-53478-19255-0",
    name: "Italy",
  },
  EBAY_ES: {
    domain: "ebay.es",
    rotationId: "1185-53479-19255-0",
    name: "Spain",
  },
  EBAY_NL: {
    domain: "ebay.nl",
    rotationId: "1346-53482-19255-0",
    name: "Netherlands",
  },
  EBAY_AU: {
    domain: "ebay.com.au",
    rotationId: "705-53470-19255-0",
    name: "Australia",
  },
  EBAY_CA: {
    domain: "ebay.ca",
    rotationId: "706-53473-19255-0",
    name: "Canada",
  },
} as const;

export type MarketplaceKey = keyof typeof MARKETPLACE_CONFIG;

/**
 * Interface for affiliate link generation
 */
export interface AffiliateLinkParams {
  itemId: string;
  marketplace?: MarketplaceKey;
  customId?: string;
}

/**
 * Generates an eBay Partner Network affiliate link
 * 
 * @param params - Parameters for link generation
 * @returns Full affiliate URL with tracking parameters
 * 
 * @example
 * const link = generateAffiliateLink({
 *   itemId: "123456789",
 *   marketplace: "EBAY_DE",
 *   customId: "homepage-featured"
 * });
 * // Returns: https://www.ebay.de/itm/123456789?mkevt=1&mkcid=1&mkrid=707-53477-19255-0&campid=YOUR_CAMPAIGN_ID&toolid=10050&customid=homepage-featured
 */
export function generateAffiliateLink(params: AffiliateLinkParams): string {
  const {
    itemId,
    marketplace = "EBAY_DE",
    customId = "",
  } = params;

  const campaignId = process.env.NEXT_PUBLIC_EBAY_EPN_CAMPAIGN_ID;
  
  if (!campaignId) {
    console.warn(
      "⚠️ NEXT_PUBLIC_EBAY_EPN_CAMPAIGN_ID not set. Affiliate tracking disabled."
    );
    // Return non-tracked link as fallback
    const config = MARKETPLACE_CONFIG[marketplace];
    return `https://www.${config.domain}/itm/${itemId}`;
  }

  const config = MARKETPLACE_CONFIG[marketplace];

  const params_obj = new URLSearchParams({
    mkevt: "1", // Click event
    mkcid: "1", // EPN channel
    mkrid: config.rotationId,
    campid: campaignId,
    toolid: "10050", // API tool identifier
  });

  if (customId) {
    params_obj.append("customid", customId);
  }

  return `https://www.${config.domain}/itm/${itemId}?${params_obj.toString()}`;
}

/**
 * Generates an affiliate link for search results
 */
export function generateSearchAffiliateLink(
  searchQuery: string,
  marketplace: MarketplaceKey = "EBAY_DE"
): string {
  const campaignId = process.env.NEXT_PUBLIC_EBAY_EPN_CAMPAIGN_ID;
  const config = MARKETPLACE_CONFIG[marketplace];

  const params = new URLSearchParams({
    _nkw: searchQuery,
    mkevt: "1",
    mkcid: "1",
    mkrid: config.rotationId,
    campid: campaignId || "",
    toolid: "10050",
  });

  return `https://www.${config.domain}/sch/i.html?${params.toString()}`;
}

/**
 * Generates an affiliate link for a category page
 */
export function generateCategoryAffiliateLink(
  categoryPath: string,
  marketplace: MarketplaceKey = "EBAY_DE"
): string {
  const campaignId = process.env.NEXT_PUBLIC_EBAY_EPN_CAMPAIGN_ID;
  const config = MARKETPLACE_CONFIG[marketplace];

  const params = new URLSearchParams({
    mkevt: "1",
    mkcid: "1",
    mkrid: config.rotationId,
    campid: campaignId || "",
    toolid: "10050",
  });

  // Category path example: "15687" for Sports Equipment
  return `https://www.${config.domain}/${categoryPath}?${params.toString()}`;
}

/**
 * Gets the marketplace key based on current environment or user location
 * Defaults to EBAY_DE, but can be extended for geo-targeting
 */
export function getMarketplaceKey(locale?: string): MarketplaceKey {
  // Example: could implement geo-detection here
  // For now, default to Germany (your primary market based on code)
  const marketplaceMap: Record<string, MarketplaceKey> = {
    de: "EBAY_DE",
    us: "EBAY_US",
    uk: "EBAY_UK",
    fr: "EBAY_FR",
    it: "EBAY_IT",
    es: "EBAY_ES",
    nl: "EBAY_NL",
    au: "EBAY_AU",
    ca: "EBAY_CA",
  };

  const key = locale?.toLowerCase() || "de";
  return marketplaceMap[key] || "EBAY_DE";
}

/**
 * Validates that an eBay campaign ID is set
 * Call this on startup to warn about missing configuration
 */
export function validateEPNConfiguration(): boolean {
  const campaignId = process.env.NEXT_PUBLIC_EBAY_EPN_CAMPAIGN_ID;
  
  if (!campaignId) {
    console.error(
      "❌ eBay Partner Network Campaign ID not configured!\n" +
      "Set NEXT_PUBLIC_EBAY_EPN_CAMPAIGN_ID in your .env.local file.\n" +
      "Get your Campaign ID from: https://partnernetwork.ebay.com"
    );
    return false;
  }

  if (!/^\d+$/.test(campaignId)) {
    console.warn(
      "⚠️ Campaign ID should be numeric. Your value: " + campaignId
    );
  }

  return true;
}

/**
 * Gets all configured marketplaces
 */
export function getAvailableMarketplaces() {
  return Object.entries(MARKETPLACE_CONFIG).map(([key, config]) => ({
    key: key as MarketplaceKey,
    domain: config.domain,
    name: config.name,
  }));
}
