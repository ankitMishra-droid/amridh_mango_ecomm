import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY || ""});

export async function generateProductDescription(productName: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a short, appetizing 2-sentence description for a premium mango product named "${productName}". Focus on its freshness and authentic Indian taste.`,
  });
  return response.text;
}
