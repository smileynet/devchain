import chalk from "chalk";
import { LLMModel } from "../config/llm.js";

export default async function simplePromptTest(
  model: LLMModel,
  prompt: string
) {
  console.log(chalk.blue("Prompt: "), prompt);
  const res = await model.call(prompt);
  console.log(chalk.green("Response: "), res);
}
