import * as dotenv from "dotenv";
import { NodeFileStore } from "langchain/stores/file/node";
import { Chroma } from "langchain/vectorstores/chroma";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ada } from "./embeddings.js";

dotenv.config();

export type VectorStoreType = HNSWLib | Chroma;

export const memoryVectorStore = new MemoryVectorStore(ada);

export const nodeFileStore = new NodeFileStore(
  process.env.OUTPUT_PATH || "./output"
);
