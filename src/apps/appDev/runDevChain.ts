import chalk from "chalk";
import { StringPromptValue } from "langchain/prompts";
import generateDevChainLLM from "./generateDevChainLLM.js";
import generateDevObjective from "./generateDevObjective.js";
import generatePrompt from "../../generation/generatePrompt.js";
import { runChain } from "../../generation/runChain.js";
import { writeOutputToFile } from "../../utils/writeToFile.js";
import { setup } from "./setup.js";
import tasksAppDev from "./tasksAppDev.js";

export async function runDevChain(prompt = "Create a weather report app.") {
  const options = await setup(prompt);

  const llmChain = generateDevChainLLM(options);

  for (const taskKey in tasksAppDev) {
    const task = tasksAppDev[taskKey];
    console.log(chalk.blue("\nCurrent task: "), task.description);
    let taskPrompt;
    if (taskKey === "objective") {
      taskPrompt = await generateDevObjective(options);
    } else {
      taskPrompt = await generatePrompt(task);
    }
    const taskValue = taskPrompt as StringPromptValue;
    console.debug(chalk.cyan("Task Prompt\n"), taskValue.value);

    const result = await runChain(llmChain, taskPrompt);
    console.log(chalk.green("Result:\n"), result.text);

    // Output the result to a file named after the task
    if (process.env.WRITE_TO_FILE === "true") {
      //const filetype = task.description === "App Outline" ? "yaml" : "md";
      const filetype = "md";
      await writeOutputToFile(
        result.text,
        task.description.toLowerCase().replace(" ", "_"),
        filetype,
        options.objective
      );
    }
  }
}
