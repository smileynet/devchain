import { input, select } from "@inquirer/prompts";
import { runDevChain } from "./apps/appDev/runDevChain.js";
import runAutoGPT from "./apps/autoGPT/runAutoGPT.js";
import { runBabyAGI } from "./apps/babyAGI/runBabyAGI.js";
import runGameDesignTasks from "@src/games/gameDesign/runGameDesignTasks.js";

export default async function applications() {

  const methodSelection = await select({
    message: "Which method would you like to use?",
    choices: [
      {
        name: "GameDevChain",
        value: "gamedevchain",
        description: "GameDevChain LangChain sequence for creating a game.",
      },
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

  let prompt;
  if (methodSelection !== "gamedevchain") {
    prompt = await input({
      message:
        "Select from among different chain methods.\n\n" +
        "Please provide your prompt:",
      default: "Create a weather report app.",
    });
  }

  let iterations;
  if (methodSelection === "babyagi" || methodSelection === "autogpt") {
    iterations = await input({
      message: "How many iterations would you like to run?",
      default: "5",
    });
    iterations = parseInt(iterations);
  }

  switch (methodSelection) {
    case "gamedevchain":
      await runGameDesignTasks();
      break;
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
