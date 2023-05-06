import * as dotenv from "dotenv";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

dotenv.config();

export const vectorstore = new MemoryVectorStore(
  new OpenAIEmbeddings(
    { verbose: true },
    {
      basePath: "https://oai.hconeai.com/v1",
      baseOptions: {
        headers: {
          "Helicone-Cache-Enabled": "true",
          "Helicone-Auth": `Bearer ${process.env.HELICON_API_KEY}`,
        },
      },
    }
  )
);
