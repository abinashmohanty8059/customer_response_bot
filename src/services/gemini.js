import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => {
  console.log("Loaded Vite Env Variables:", import.meta.env);
  return import.meta.env.VITE_GEMINI_API_KEY;
};

export const isApiConfigured = () => {
  const key = getApiKey();
  return !!(key && key.trim());
};

/**
 * Analyzes a customer message using the Gemini API.
 * Returns a JSON object with: category, priority, sentiment, and reply.
 * Throws an error if the API request fails or if the key is missing.
 */
export async function analyzeMessageWithAI(message) {
  const apiKey = getApiKey();
  if (!apiKey || !apiKey.trim()) {
    throw new Error("AI unavailable. API key is not configured.");
  }

  // Initialize the SDK
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Use the latest gemini-2.5-flash model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
    systemInstruction: `You are an expert customer support agent. Analyze the customer support message and categorize, prioritize, assess sentiment, and draft a response.
You must respond with ONLY a valid JSON object matching this schema:
{
  "category": "Order Issue" | "Refund" | "Delivery" | "General Inquiry" | "Technical Support" | "Billing" | "Cancellation" | "Complaint",
  "priority": "Low" | "Medium" | "High",
  "sentiment": "Positive" | "Neutral" | "Negative",
  "reply": "A helpful, professional, polite, and premium draft reply addressing the customer's message directly. Never use placeholders. Be specific."
}

Ensure the category is exactly one of the eight specified.
Ensure the priority is exactly one of the three specified.
Ensure the sentiment is exactly one of the three specified.`
  });

  const prompt = `Analyze this customer support message:
"""
${message}
"""`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  
  // Parse the JSON output
  try {
    const data = JSON.parse(responseText);
    
    // Validate output structure and clean up fields if needed
    const validCategories = ["Order Issue", "Refund", "Delivery", "General Inquiry", "Technical Support", "Billing", "Cancellation", "Complaint"];
    const validPriorities = ["Low", "Medium", "High"];
    const validSentiments = ["Positive", "Neutral", "Negative"];

    return {
      category: validCategories.includes(data.category) ? data.category : "General Inquiry",
      priority: validPriorities.includes(data.priority) ? data.priority : "Medium",
      sentiment: validSentiments.includes(data.sentiment) ? data.sentiment : "Neutral",
      reply: data.reply || "Hi there, thank you for contacting us. How can we help you today?"
    };
  } catch (parseError) {
    console.error("Failed to parse Gemini JSON response. Raw text:", responseText, parseError);
    throw new Error("Invalid response format received from AI.");
  }
}
