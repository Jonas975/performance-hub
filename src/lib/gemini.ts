// src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Hilfsfunktion: Manuelle Reinigung falls KI ausfällt
function manualCleanup(title: string): string {
  return title
    .replace(/NEU|OVP|TOP|AKTION|PROFI|VERKAUFE/gi, '') // Unnötige Marktschreier-Wörter weg
    .replace(/[!?;:|]/g, '')                          // Sonderzeichen weg
    .replace(/\s+/g, ' ')                             // Doppelte Leerzeichen weg
    .trim();
}

/**
 * Optimiere Produkttitel für die Grid-Ansicht
 */
export async function optimizeFitnessTitle(rawTitle: string): Promise<string> {
  if (!apiKey || !rawTitle) return manualCleanup(rawTitle);

  try {
    const prompt = `Optimiere diesen Fitness-Produkttitel für eine Website. 
    Entferne "NEU", "OVP" und Sonderzeichen. Antworte NUR mit dem neuen Titel.
    Titel: "${rawTitle}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim() || manualCleanup(rawTitle);
  } catch (error) {
    return manualCleanup(rawTitle);
  }
}

/**
 * Verwandelt rohes eBay-HTML in eine saubere, strukturierte Markdown-Beschreibung.
 */
export async function optimizeProductDescription(rawHtml: string): Promise<string> {
  if (!apiKey || !rawHtml) return rawHtml;

  try {
    const prompt = `
      Du bist ein Experte für E-Commerce Copywriting. Deine Aufgabe ist es, eine hässliche eBay-Produktbeschreibung in ein hochwertiges, sauberes Format für eine Premium-Fitness-Website umzuwandeln.
      
      FORMATIERUNGS-REGELN (STRIKT EINHALTEN):
      1. Nutze klare Stichpunkte (mit - oder *) für technische Daten.
      2. Setze nach JEDEM Stichpunkt eine Leerzeile.
      3. Gruppiere die Daten in Kategorien (z.B. **Antrieb**, **Akku**, **Ausstattung**).
      4. Setze vor und nach JEDER Kategorie-Überschrift ZWEI Leerzeilen.
      5. Schreibe eine kurze, packende Einleitung (max 2 Sätze) am Anfang.
      6. Nutze ausschließlich Markdown, kein HTML.
      
      Hier ist der rohe Text/HTML:
      "${rawHtml}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini Optimization failed:", error);
    // Fallback: Wenn die KI streikt, entfernen wir nur die HTML-Tags manuell
    return rawHtml.replace(/<[^>]*>?/gm, '').trim();
  }
}