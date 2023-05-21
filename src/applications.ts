import { input, select } from "@inquirer/prompts";
import { runDevChain } from "./apps/appDev/runDevChain.js";
import runAutoGPT from "./apps/autoGPT/runAutoGPT.js";
import { runBabyAGI } from "./apps/babyAGI/runBabyAGI.js";

export default async function applications() {
  const prompt = await input({
    message:
      "Select from among different chain methods.\n\n" +
      "Please provide your prompt:",
    default: "Create a weather report app.",
  });

  const methodSelection = await select({
    message: "Which method would you like to use?",
    choices: [
      {
        name: "DevChain",
        value: "devchain",
        description: "DevChain LangChain sequence for creating an application.",
      },
      {
        name: "BabyAGI",
        value: "babyagi",
        description: "BabyAGI LangChain agent for tasks.",
      },
      {
        name: "AutoGPT",
        value: "autogpt",
        description: "AutoGPT LangChain agent for tasks.",
      },
    ],
  });

  let iterations;
  if (methodSelection === "babyagi" || methodSelection === "autogpt") {
    iterations = await input({
      message: "How many iterations would you like to run?",
      default: "5",
    });
    iterations = parseInt(iterations);
  }

  switch (methodSelection) {
    case "babyagi":
      await runBabyAGI(prompt, iterations);
      break;
    case "autogpt":
      await runAutoGPT(prompt, iterations);
      break;
    case "devchain":
      await runDevChain(prompt);
      break;
  }
}
