import { loadSummarizationChain } from "langchain/chains";
import { Document } from "langchain/document";
import { davinci } from "../config/llm.js";

export default async function runSummarization(
  docs: Document[],
  returnIntermediateSteps = false
) {
  const chain = loadSummarizationChain(davinci, {
    type: "map_reduce",
    returnIntermediateSteps: returnIntermediateSteps,
  });

  const res = await chain.call({
    input_documents: docs,
  });
  console.log(res.output_text ? res.output_text : res.text ? res.text : res);
}
