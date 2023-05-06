import { Task } from "./tasks.js";
import { PromptTemplate } from "langchain/prompts";

export default async function generatePrompt(
  task: Task,
  inputValues: Record<string, string> = {}
) {
  // console.debug("Generating prompt for task: ", task.description);
  const prompt = new PromptTemplate({
    template: task.task,
    inputVariables: task.taskVariables ? task.taskVariables : [],
  });

  const promptValue = await prompt.formatPromptValue(inputValues);
  if (process.env.VERBOSE_DEBUG)
    console.debug("Generate prompt :", promptValue);
  return promptValue;
}
