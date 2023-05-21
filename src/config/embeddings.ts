import * as dotenv from "dotenv";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

dotenv.config();

let config
if (!process.env.OPENAI_API_KEY) {
  config = {
    basePath: "https://oai.hconeai.com/v1",
    baseOptions: {
      headers: {
        "Helicone-Cache-Enabled": "true",
        "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
      },
    },
  };
}

export const ada = new OpenAIEmbeddings(
  { verbose: true },
  config
);
