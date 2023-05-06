import { input, select } from "@inquirer/prompts";
import * as dotenv from "dotenv";
import { runDevChain } from "./apps/appDev/runDevChain.js";
import runAutoGPT from "./apps/autoGPT/runAutoGPT.js";
import { runBabyAGI } from "./apps/babyAGI/runBabyAGI.js";

dotenv.config();

async function main() {
  const prompt = await input({
    message:
      "Welcome to DevChain!\n\n" +
      "You will be select from among different chain methods.\n\n" +
      "Please provide your prompt:",
    default: "Write a weather report for Seattle, Washington.",
  });

  const methodSelection = await select({
    message: "Which method would you like to use?",
    choices: [
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
      {
        name: "DevChain",
        value: "devchain",
        description: "DevChain LangChain sequence for creating an application.",
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

await main();
