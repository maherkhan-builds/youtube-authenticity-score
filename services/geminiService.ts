
import { GoogleGenAI, Type } from "@google/genai";
import { AuthenticityScoreResponse } from '../types';

const CORE_PROMPT = `Begin with a concise checklist (3-7 bullets) outlining your approach to analyzing and evaluating authenticity signals in YouTube videos and channels. Analyze relevant authenticity signals and generate a clear, accuracy-based authenticity score. After scoring, validate that your assessment follows logical consistency and adjust if inconsistencies or gaps are identified.`;

export const getAuthenticityScore = async (videoDescription: string): Promise<AuthenticityScoreResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not set. Please ensure it's configured in your environment.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `${CORE_PROMPT}\n\nVideo/Channel Description to Analyze: "${videoDescription}"\n\nProvide the authenticity score (0-100) and a justification.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [{ text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: 'The authenticity score from 0 to 100.',
            },
            justification: {
              type: Type.STRING,
              description: 'A brief justification for the authenticity score.',
            },
          },
          required: ['score', 'justification'],
          propertyOrdering: ['score', 'justification'],
        },
      },
    });

    const jsonStr = response.text;
    if (!jsonStr) {
      throw new Error("Gemini API returned an empty response.");
    }
    
    // Trim potential markdown code block wrappers
    const cleanedJsonStr = jsonStr.replace(/```json\n|\n```/g, '').trim();

    return JSON.parse(cleanedJsonStr) as AuthenticityScoreResponse;

  } catch (error) {
    console.error("Error fetching authenticity score:", error);
    throw new Error(`Failed to get authenticity score: ${(error as Error).message}`);
  }
};
