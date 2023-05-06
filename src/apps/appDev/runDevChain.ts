import chalk from "chalk";
import { StringPromptValue } from "langchain/prompts";
import generateLLMChain from "../../generation/generateLLMChain.js";
import generateObjective from "../../generation/generateObjective.js";
import generatePrompt from "../../generation/generatePrompt.js";
import { runChain } from "../../generation/runChain.js";
import { writeOutputToFile } from "../../output/writeToFile.js";
import { setup } from "./setup.js";
import tasksAppDev from "./tasksAppDev.js";

export async function runDevChain(prompt = "Create a weather report app.") {
  const options = await setup(prompt);

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
