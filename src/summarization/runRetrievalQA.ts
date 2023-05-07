import { loadQARefineChain, RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { davinci } from "../config/llm.js";

export default async function runRetrievalQA(
  vectorStore: HNSWLib,
  prompt: string
) {
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
  console.log(res.output_text);
}
