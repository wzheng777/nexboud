import { GoogleGenAI } from "@google/genai";
import { EmailDraftRequest } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateEmailDraft = async (request: EmailDraftRequest): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing. Please configure process.env.API_KEY.";
  }

  try {
    const prompt = `
      You are an expert sales copywriter. Write a cold outreach email with the following parameters:
      
      Recipient Name: ${request.recipientName}
      Company Name: ${request.companyName}
      Value Proposition: ${request.valueProposition}
      Tone: ${request.tone}
      
      Keep it concise (under 150 words). Use a compelling subject line.
      Return ONLY the email content, starting with the Subject Line.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while generating the email. Please try again.";
  }
};