import * as dotenv from "dotenv";
import { runChain } from "./runChain.js";
import generatePrompt from "./generatePrompt.js";
import generateObjective from "./generateObjective.js";
import tasks from "./tasks.js";
import generateLLMChain from "./generateLLMChain.js";
import { setup } from "./setup.js";
import { StringPromptValue } from "langchain/prompts";

dotenv.config();

async function main() {
  const options = await setup();

  const llmChain = generateLLMChain(options);

  for (const taskKey in tasks) {
    const task = tasks[taskKey];
    console.log("\nCurrent task: ", task.description);
    let taskPrompt;
    if (taskKey === "objective") {
      taskPrompt = await generateObjective(options);
    } else {
      taskPrompt = await generatePrompt(task);
    }
    const taskValue = taskPrompt as StringPromptValue;
    console.debug("Task Prompt\n", taskValue.value);

    const result = await runChain(llmChain, taskPrompt);
    console.log("Result:\n", result.text);
  }
}

await main();
