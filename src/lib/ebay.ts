// src/lib/ebay.ts

async function getAccessToken() {
    try {
      // Sandbox Auth URL
      const authString = Buffer.from(`${process.env.EBAY_APP_ID}:${process.env.EBAY_CERT_ID}`).toString('base64');
      
      const response = await fetch("https://api.sandbox.ebay.com/identity/v1/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authString}`,
        },
        body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
      });
  
      const data = await response.json();
      if (data.error) {
        console.error("eBay Sandbox Token Error:", data.error_description);
        return null;
      }
      return data.access_token;
    } catch (error) {
      console.error("Sandbox Token Fetch failed:", error);
      return null;
    }
  }
  
  export async function getEbayDeals(keyword: string) {
    const token = await getAccessToken();
    if (!token) return [];
  
    try {
      // Sandbox Browse API URL
      const response = await fetch(
        `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${keyword}&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-EBAY-C-MARKETPLACE-ID": "EBAY_DE",
          },
        }
      );
  
      const data = await response.json();
      
      // WICHTIG: In der Sandbox gibt es oft keine echten Suchergebnisse. 
      // Wenn die Liste leer ist, geben wir das im Terminal aus.
      if (!data.itemSummaries || data.itemSummaries.length === 0) {
        console.log("Sandbox Hinweis: Suche erfolgreich, aber keine Test-Artikel gefunden.");
      }
  
      return data.itemSummaries || [];
    } catch (error) {
      console.error("eBay Sandbox Search failed:", error);
      return [];
    }
  }