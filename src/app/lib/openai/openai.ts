import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

const openAIApiKey: string = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";

if (!openAIApiKey) {
  throw new Error("OpenAI API key not found.");
}

export const llm = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0,
});

// export const embeddings = new OpenAIEmbeddings(
//   {
//     openAIApiKey,
//   },
//   { maxRetries: 0 }
// );