import { SetupOptions } from "./setup.js";
import tasksAppDev from "./tasksAppDev.js";
import generatePrompt from "../../generation/generatePrompt.js";

export default async function generateDevObjective(options: SetupOptions) {
  console.debug("Generating objective...");

  const taskPrompt = await generatePrompt(tasksAppDev["objective"], {
    language: options.language,
    uiFramework: options.uiFramework,
    objective: options.objective,
  });

  if (process.env.VERBOSE_DEBUG==="true")
    console.debug("Generate task prompt: ", taskPrompt);

  return taskPrompt;
}
