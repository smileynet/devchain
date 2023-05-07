import { Document } from "langchain/document";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { ada } from "../config/embeddings.js";

export default async function docs2vec(docs: Document[]) {
  return await HNSWLib.fromDocuments(docs, ada);
}
