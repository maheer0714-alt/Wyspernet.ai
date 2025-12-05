import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Tip } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const fetchGameTips = async (gameName: string): Promise<Tip[]> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your configuration.");
  }

  const systemInstruction = `
    You are Wyspernet.ai, an elite AI gaming companion specifically for Roblox. 
    Your goal is to provide high-quality, actionable, and "pro-level" advice for specific Roblox games.
    The user will provide a game name. You must:
    1. Identify the game.
    2. Provide 5 to 8 distinct tips, secrets, or strategies.
    3. Categorize them as 'Strategy', 'Secret', 'Mechanic', or 'General'.
    4. Keep descriptions concise but helpful (2-3 sentences max).
    5. Be enthusiastic and encouraging.
  `;

  // Define the schema for the JSON response
  const tipSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      tips: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A short, catchy title for the tip.",
            },
            description: {
              type: Type.STRING,
              description: "The detailed advice or instruction.",
            },
            category: {
              type: Type.STRING,
              enum: ['Strategy', 'Secret', 'Mechanic', 'General'],
              description: "The type of tip.",
            },
          },
          required: ["title", "description", "category"],
        },
      },
    },
    required: ["tips"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide pro tips for the Roblox game: "${gameName}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: tipSchema,
        temperature: 0.7, // Slightly creative but grounded
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Wyspernet core.");
    }

    const data = JSON.parse(text);
    return data.tips || [];

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Wyspernet encountered a glitch accessing the mainframe. Please try again.");
  }
};