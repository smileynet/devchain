import generateLLMChain from "./generateLLMChain.js";
import { setup } from "./setup.js";
import * as dotenv from "dotenv";
import generateObjective from "./generateObjective.js";
import generatePrompt from "./generatePrompt.js";
import tasks from "./tasks.js";
import { runChain } from "./runChain.js";

dotenv.config();

async function main() {
  const options = await setup();

  const llmChain = generateLLMChain(options);

  for (const taskKey in tasks) {
    const task = tasks[taskKey];
    console.log(task.description);
    let taskPrompt;
    if (taskKey === "objective") {
      taskPrompt = await generateObjective(options);
    } else {
      taskPrompt = await generatePrompt(task);
    }
    console.log(taskPrompt);

    await runChain(llmChain, taskPrompt);
  }
}

await main();
