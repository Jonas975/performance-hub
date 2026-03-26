import { PredictionServiceClient, helpers } from "@google-cloud/aiplatform";

// Initialisierung des Clients
const client = new PredictionServiceClient({
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
  keyFilename: "./google-cloud-key.json", 
});

export async function generateAIVisual(productTitle: string) {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || "project-3c5bdcaf-a48a-4037-a6b"; 
  const location = "us-central1";
  const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/imagen-3.0-generate-001`;

  console.log("--- 🤖 KI-GEN START ---");
  console.log("Generiere Bild für:", productTitle);

  const prompt = `Professional premium product photography of ${productTitle}. 
                  Cinematic side-lighting, dark moody gym atmosphere, 
                  sharp focus on the product, 8k resolution, photorealistic, 
                  luxury fitness branding style, minimalist composition.`;

  const instance = helpers.toValue({ prompt });
  const instances = [instance!];
  const parameters = helpers.toValue({
    sampleCount: 1,
    aspectRatio: "1:1",
    safetySetting: "block_few",
  });

  try {
    const [response] = await client.predict({
      endpoint,
      instances,
      parameters,
    });

    const prediction: any = response.predictions![0];
    const base64Image = prediction.bytesBase64Encoded;
    
    console.log("✅ KI-BILD ERFOLGREICH ERSTELLT!");
    return `data:image/png;base64,${base64Image}`;

  } catch (error: any) {
    console.error("❌ KI-GENERIERUNG FEHLGESCHLAGEN!");
    console.error("GRUND:", error.message);
    
    // Falls es an den Berechtigungen liegt, zeigt uns das hier die Details:
    if (error.code) console.error("Fehler-Code:", error.code);
    
    return null; 
  } finally {
    console.log("--- 🤖 KI-GEN ENDE ---");
  }
}