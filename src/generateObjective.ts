import { PromptTemplate } from "langchain/prompts";
import tasks from "./tasks.js";
import { SetupOptions } from "./setup.js";
import { LLMChain } from "langchain/chains";

export async function generateObjective(
  options: SetupOptions,
  llmChain: LLMChain
) {
  console.debug("Generating objective...");
  const instructionsPrompt = new PromptTemplate({
    template: tasks.objective.instructions,
    inputVariables: ["language", "uiFramework"],
  });

  const instructionsValue = await instructionsPrompt.formatPromptValue({
    language: options.language,
    uiFramework: options.uiFramework,
  });

  const taskPrompt = new PromptTemplate({
    template: tasks.objective.tasks,
    inputVariables: ["language", "objective"],
  });

  const taskValue = await taskPrompt.formatPromptValue({
    language: options.language,
    objective: options.appObjective,
  });

  llmChain.inputKeys;
  const response = await llmChain.call({
    instructions: instructionsValue,
    tasks: taskValue,
  });

  console.debug("Objective generated: ", response);

  return response;
}
