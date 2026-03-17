// src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function optimizeFitnessTitle(rawTitle: string): Promise<string> {
  try {
    const prompt = `
      Du bist ein Experte für Fitness-Marketing. 
      Kürze und optimiere den folgenden eBay-Produkttitel für eine saubere Affiliate-Website. 
      Entferne Sonderzeichen, "NEU", "OVP", "TOP" oder unnötige Füllwörter in Großbuchstaben. 
      Der Titel soll professionell und vertrauenswürdig klingen.
      Antworte NUR mit dem neuen Titel.
      
      Originaler Titel: "${rawTitle}"
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini Fehler:", error);
    return rawTitle; // Fallback: Wenn die KI hakt, nimm den Original-Titel
  }
}