import chalk from "chalk";
import { loadQARefineChain, RetrievalQAChain } from "langchain/chains";
import { davinci, LLMModel } from "../config/llm.js";
import { VectorStoreType } from "../config/stores.js";

export default async function runRetrievalQA(
  vectorStore: VectorStoreType,
  prompt: string,
  model: LLMModel = davinci,
  refine = true
) {
  let chain;
  if (refine) {
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
