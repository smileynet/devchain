import { setup } from "../../generation/setup.js";
import generateLLMChain from "../../generation/generateLLMChain.js";
import tasksAppDev from "./tasksAppDev.js";
import chalk from "chalk";
import generateObjective from "../../generation/generateObjective.js";
import generatePrompt from "../../generation/generatePrompt.js";
import { StringPromptValue } from "langchain/prompts";
import { runChain } from "../../generation/runChain.js";
import { writeOutputToFile } from "../../output/writeToFile.js";

export async function runDevChain() {
  const options = await setup();

  const llmChain = generateLLMChain(options);

  for (const taskKey in tasksAppDev) {
    const task = tasksAppDev[taskKey];
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
