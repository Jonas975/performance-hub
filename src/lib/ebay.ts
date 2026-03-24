// src/lib/ebay.ts

/**
 * Holt aktuelle Fitness-Deals von der eBay Finding API.
 * Die Funktion ist exportiert als 'getEbayDeals', passend zum ProductGrid-Import.
 */
export async function getEbayDeals() {
  const appId = process.env.EBAY_APP_ID;

  // Sicherheitscheck: Wenn kein API-Key da ist, Grid nicht abstürzen lassen
  if (!appId) {
    console.error("EBAY_APP_ID is missing in environment variables.");
    return [];
  }

  try {
    // Suche nach Fitness-Supplements, limitiert auf 6 Artikel
    const url = `https://svcs.ebay.com/services/search/FindingService/v1` +
      `?OPERATION-NAME=findItemsByKeywords` +
      `&SERVICE-VERSION=1.0.0` +
      `&SECURITY-APPNAME=${appId}` +
      `&RESPONSE-DATA-FORMAT=JSON` +
      `&REST-PAYLOAD` +
      `&keywords=fitness%20supplements` +
      `&paginationInput.entriesPerPage=6` +
      `&GLOBAL-ID=EBAY-DE`; // Fokus auf den deutschen Marktplatz

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache für 1 Stunde (ISR)
    });

    if (!response.ok) {
      throw new Error(`eBay API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Tiefe Prüfung der JSON-Struktur von eBay
    const searchResponse = data?.findItemsByKeywordsResponse?.[0];
    
    if (searchResponse?.ack?.[0] === "Failure") {
      console.error("eBay API Error:", searchResponse.errorMessage?.[0]?.message?.[0]);
      return [];
    }

    const items = searchResponse?.searchResult?.[0]?.item || [];

    // Wir geben die Rohdaten zurück, das ProductGrid übernimmt das Mapping
    return items;

  } catch (error) {
    console.error("Failed to fetch eBay deals:", error);
    // Rückgabe eines leeren Arrays verhindert, dass die gesamte Page crashed
    return [];
  }
}

/**
 * Hilfsfunktion, falls du später einzelne Produkte anhand der ID laden willst.
 * (Entspricht dem Vorschlag aus deiner Fehlermeldung)
 */
export async function getEbayProduct(itemId: string) {
  // Implementierung für Einzelabruf falls nötig...
  console.log("Fetching single item:", itemId);
  return null;
}