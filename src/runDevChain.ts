import { setup } from "./setup.js";
import generateLLMChain from "./generateLLMChain.js";
import tasks from "./tasks.js";
import chalk from "chalk";
import generateObjective from "./generateObjective.js";
import generatePrompt from "./generatePrompt.js";
import { StringPromptValue } from "langchain/prompts";
import { runChain } from "./runChain.js";
import { writeOutputToFile } from "./writeToFile.js";

export async function runDevChain() {
  const options = await setup();

  const llmChain = generateLLMChain(options);

  for (const taskKey in tasks) {
    const task = tasks[taskKey];
    console.log(chalk.blue("\nCurrent task: "), task.description);
    let taskPrompt;
    if (taskKey === "objective") {
      taskPrompt = await generateObjective(options);
    } else {
      taskPrompt = await generatePrompt(task);
    }
    const taskValue = taskPrompt as StringPromptValue;
    console.debug(chalk.cyan("Task Prompt\n"), taskValue.value);

    const result = await runChain(llmChain, taskPrompt);
    console.log(chalk.green("Result:\n"), result.text);

    // Output the result to a file named after the task
    if (process.env.WRITE_TO_FILE === "true") {
      const filetype = task.description === "App Outline" ? "json" : "md";
      await writeOutputToFile(
        result.text,
        task.description.toLowerCase().replace(" ", "_"),
        filetype,
        options.objective
      );
    }
  }
}
