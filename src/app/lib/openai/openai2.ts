import OpenAI from "openai";

export const openai2 = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "", 
    dangerouslyAllowBrowser: true // Pass API key for authentication
  });


if (!openai2) {
    throw new Error("OpenAI API key not found.");
}

