import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { AutoGPT } from "langchain/experimental/autogpt";
import { ReadFileTool, SerpAPI, WriteFileTool } from "langchain/tools";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { nodeFileStore } from "../../config/stores.js";

export default async function runAutoGPT(
  prompt = "Write a weather report for Seattle, Washington.",
  iterations = 5
) {
  const store = nodeFileStore;
  const tools = [
    new ReadFileTool({ store }),
    new WriteFileTool({ store }),
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "Seattle,Washington,United States",
      hl: "en",
      gl: "us",
    }),
  ];

  const vectorStore = new HNSWLib(new OpenAIEmbeddings(), {
    space: "cosine",
    numDimensions: 1536,
  });

  const autogpt = AutoGPT.fromLLMAndTools(
    new ChatOpenAI({ temperature: 0 }),
    tools,
    {
      memory: vectorStore.asRetriever(),
      aiName: "PipBoy",
      aiRole: "Assistant",
      maxIterations: iterations,
    }
  );

  await autogpt.run([prompt]);
}
