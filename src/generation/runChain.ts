import { LLMChain } from "langchain/chains";
import { BasePromptValue } from "langchain/schema";

export async function runChain(
  llmChain: LLMChain,
  taskPrompt: BasePromptValue
) {
  if(process.env.VERBOSE_DEBUG === "true") console.debug("Running chain...");

  const response = await llmChain.call({
    task: taskPrompt,
  });

  if(process.env.VERBOSE_DEBUG === "true") console.debug("Chain completed.");

  return response;
}
