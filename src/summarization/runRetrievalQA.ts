import chalk from "chalk";
import { loadQARefineChain, RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { davinci, LLMModel } from "../config/llm.js";

export default async function runRetrievalQA(
  vectorStore: HNSWLib,
  prompt: string,
  model: LLMModel = davinci
) {
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

  console.log(chalk.green("Prompt: "), prompt);

  const res = await chain.call({
    query: prompt,
  });
  console.log(
    chalk.blue("Response: "),
    res.output_text ? res.output_text : res
  );
}
