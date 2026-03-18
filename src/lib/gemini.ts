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
    // Hier landet dein aktueller Fehler. Statt nur zu loggen, 
    // geben wir jetzt einen manuell bereinigten Titel zurück.
    return manualCleanup(rawTitle);
  }
}