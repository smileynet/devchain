import { select } from "@inquirer/prompts";
import chalk from "chalk";
import { davinci } from "./config/llm.js";
import chatApi from "./examples/chatApi.js";
import stateOfTheUnionChroma from "./examples/stateOfTheUnionChroma.js";
import stateOfTheUnionHNSW from "./examples/stateOfTheUnionHNSW.js";
import gameProgrammingPatterns from "./tests/gameProgrammingPatterns.js";
import logPerformanceMeasures from "./utils/logPerformanceMeasures.js";
import runGameDesignTasks from "@src/games/gameDesign/runGameDesignTasks.js";

export default async function test() {
  const test_type =
    process.env.DEFAULT_TEST ||
    (await select({
      message: "What test would you like to run?",
      choices: [
        {
          name: "State of the Union with Chroma",
          value: "sotu-bench",
          description: "Run the vector store benchmarking example.",
        },
        {
          name: "Game Programming Patterns",
          value: "gpp",
          description:
            "Run the game programming patterns model comparison example.",
        },
      ],
    }));

  console.log(chalk.cyan("Running tests..."));

  switch (test_type) {
    case "sotu-bench":
      await stateOfTheUnionChroma();
      await stateOfTheUnionHNSW();
      break;
    case "gpp":
      await gameProgrammingPatterns(davinci);
      break;
    case "chatApi":
      await chatApi();
      break;
    case "current_test":
      await runGameDesignTasks();
      break;
  }

  const measurements = performance.getEntriesByType("measure");
  if (measurements.length > 0) {
    logPerformanceMeasures(measurements);
  }
}
