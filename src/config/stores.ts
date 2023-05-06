import * as dotenv from "dotenv";
import { NodeFileStore } from "langchain/stores/file/node";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ada } from "./embeddings.js";

dotenv.config();

export const vectorstore = new MemoryVectorStore(ada);

export const nodestore = new NodeFileStore(
  process.env.OUTPUT_PATH || "./output"
);
