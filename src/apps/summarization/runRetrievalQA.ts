import { loadQARefineChain, RetrievalQAChain } from "langchain/chains";
import { Document } from "langchain/document";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { ada } from "../../config/embeddings.js";
import { davinci } from "../../config/llm.js";

export default async function runRetrievalQA(docs: Document[], prompt: string) {
  const vectorStore = await HNSWLib.fromDocuments(docs, ada);
  const model = davinci;
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
    query: prompt,
  });
  console.log({ res });
}
