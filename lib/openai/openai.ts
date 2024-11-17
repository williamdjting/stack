import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

// import dotenv from "dotenv";

// // Load environment variables
// dotenv.config();


const openAIApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";

if (!openAIApiKey) {
  throw new Error("OpenAI API key not found.");
}

export const llm = new ChatOpenAI({
  openAIApiKey,
  modelName: "gpt-4o-mini",
  temperature: 0,
});

// export const embeddings = new OpenAIEmbeddings(
//   {
//     openAIApiKey,
//   },
//   { maxRetries: 0 }
// );
