import { Task } from "../apps/appDev/tasksAppDev.js";
import { PromptTemplate } from "langchain/prompts";

export default async function generatePrompt(
  task: Task,
  inputValues: Record<string, string> = {}
) {
  if (process.env.VERBOSE_DEBUG==="true")
    console.debug("Generating prompt for task: ", task.description);
  const prompt = new PromptTemplate({
    template: task.task,
    inputVariables: task.taskVariables ? task.taskVariables : [],
  });

  const promptValue = await prompt.formatPromptValue(inputValues);
  if (process.env.VERBOSE_DEBUG==="true")
    console.debug("Generate prompt :", promptValue);
  return promptValue;
}
