import tasks from "./tasks.js";
import { SetupOptions } from "./setup.js";
import generatePrompt from "./generatePrompt.js";

export default async function generateObjective(options: SetupOptions) {
  console.debug("Generating objective...");

  const taskPrompt = await generatePrompt(tasks["objective"], {
    language: options.language,
    uiFramework: options.uiFramework,
    objective: options.objective,
  });

  //console.debug("Task prompt: ", taskPrompt);

  return taskPrompt;
}
