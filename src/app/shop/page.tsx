import { FALLBACK_PRODUCTS } from "@/lib/constants";
import {
  getStoreProductListings,
  type EbayProductListing,
} from "@/lib/ebay";
import ShopClientContent from "./ShopClientContent";

export default async function ShopPage() {
  let products: EbayProductListing[] = [];

  try {
    products = await getStoreProductListings(24);
  } catch (error) {
    console.error("[Shop] eBay fetch failed:", error);
  }

  if (products.length === 0) {
    products = FALLBACK_PRODUCTS.map((p) => ({
      itemId: p.itemId,
      title: p.title,
      price: p.price,
      imageUrl: p.images?.[0] || null,
      summaryImages: p.images || [],
      itemWebUrl: p.itemWebUrl || "#",
    }));
  }

  return <ShopClientContent products={products} />;
}
