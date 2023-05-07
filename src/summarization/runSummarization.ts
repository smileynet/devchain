import { loadSummarizationChain } from "langchain/chains";
import { Document } from "langchain/document";
import { gptTurbo } from "../config/llm.js";

export default async function runSummarization(docs: Document[]) {
  const chain = loadSummarizationChain(gptTurbo, {
    type: "map_reduce",
    returnIntermediateSteps: false,
  });

  const res = await chain.call({
    input_documents: docs,
  });
  console.log(res.output_text);
}
