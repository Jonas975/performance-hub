// src/lib/ebay.ts
import { generateAIVisual } from "./gemini-images";

/**
 * Holt aktuelle Fitness-Deals von eBay und ersetzt die Bilder 
 * durch KI-generierte Lifestyle-Fotografie via Gemini (Imagen 3).
 */
export async function getEbayDeals(query?: string) {
  const appId = process.env.EBAY_APP_ID;

  if (!appId) {
    console.error("EBAY_APP_ID fehlt in den Umgebungsvariablen.");
    return [];
  }

  try {
    // 1. eBay API Abruf (Suche nach Fitness-Supplements)
    const url = `https://svcs.ebay.com/services/search/FindingService/v1` +
      `?OPERATION-NAME=findItemsByKeywords` +
      `&SERVICE-VERSION=1.0.0` +
      `&SECURITY-APPNAME=${appId}` +
      `&RESPONSE-DATA-FORMAT=JSON` +
      `&REST-PAYLOAD` +
      `&keywords=${encodeURIComponent(query || "fitness supplements")}` +
      `&paginationInput.entriesPerPage=6` +
      `&GLOBAL-ID=EBAY-DE`;

    const response = await fetch(url, {
      next: { revalidate: 86400 }, // WICHTIG: 24h Cache schont dein 300€ Guthaben!
    });

    if (!response.ok) {
      throw new Error(`eBay API Fehler: ${response.status}`);
    }

    const data = await response.json();
    const rawItems = data?.findItemsByKeywordsResponse?.[0]?.searchResult?.[0]?.item || [];

    // 2. KI-Bildgenerierung für jedes eBay-Produkt
    // Wir nutzen Promise.all, damit die Bilder parallel generiert werden (schneller)
    const processedItems = await Promise.all(
      rawItems.map(async (item: any) => {
        const title = item.title[0];
        
        // Ruft die Gemini/Imagen API auf, um das "trashige" Bild zu ersetzen
        const aiGeneratedImage = await generateAIVisual(title);

        return {
          id: item.itemId[0],
          title: title,
          // Preis-Formatierung
          price: parseFloat(item.sellingStatus[0].currentPrice[0].__value__).toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }),
          url: item.viewItemURL[0],
          // Nutze das KI-Bild, falls vorhanden, sonst Fallback auf eBay-Original
          image: aiGeneratedImage || item.galleryURL[0],
          condition: item.condition?.[0]?.conditionDisplayName?.[0] || "Neu",
        };
      })
    );

    return processedItems;

  } catch (error) {
    console.error("Fehler beim Abrufen oder Generieren der Deals:", error);
    return [];
  }
}

/**
 * Einzelabruf-Funktion (optionaler Export für Typsicherheit)
 */
export async function getEbayProduct(itemId: string) {
  // Falls du später eine Detailseite für ein einzelnes Produkt brauchst
  return null;
}