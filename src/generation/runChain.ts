import { LLMChain } from "langchain/chains";
import { BasePromptValue } from "langchain/schema";

export async function runChain(
  llmChain: LLMChain,
  taskPrompt: BasePromptValue
) {
  console.debug("Running chain...");

  const response = await llmChain.call({
    task: taskPrompt,
  });

  console.debug("Chain completed.");

  return response;
}
