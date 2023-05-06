import { loadQARefineChain, RetrievalQAChain } from "langchain/chains";
import { Document } from "langchain/document";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { ada } from "../../config/embeddings.js";
import { davinci } from "../../config/llm.js";

export default async function runRetrievalQA(docs: Document[]) {
  // Create a vector store from the documents.
  const vectorStore = await HNSWLib.fromDocuments(docs, ada);
  const model = davinci;

  // Create a chain that uses the OpenAI LLM and HNSWLib vector store.
  let chain;
  const custom = true;
  if (custom) {
    chain = new RetrievalQAChain({
      combineDocumentsChain: loadQARefineChain(model),
      retriever: vectorStore.asRetriever(),
    });
  } else {
    chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  }

  const res = await chain.call({
    query: "What did the president say about Justice Breyer?",
  });
  console.log({ res });
}
