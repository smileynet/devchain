import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";

export default async function docs2chroma(docs: Document[]) {
  return await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
    collectionName: "game_programming_patterns",
  });
}
