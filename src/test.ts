import { select } from "@inquirer/prompts";
import chalk from "chalk";
import { davinci } from "./config/llm.js";
import stateOfTheUnionChroma from "./examples/stateOfTheUnionChroma.js";
import stateOfTheUnionHNSW from "./examples/stateOfTheUnionHNSW.js";
import gameProgrammingPatterns from "./tests/gameProgrammingPatterns.js";
import logPerformanceMeasures from "./utils/logPerformanceMeasures.js";

export default async function test() {
  const test_type =
    process.env.TEST_TYPE ||
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

  switch (test_type as string) {
    case "sotu-bench":
      await stateOfTheUnionChroma();
      await stateOfTheUnionHNSW();
      break;
    case "gpp":
      await gameProgrammingPatterns(davinci);
      break;
  }

  const measurements = performance.getEntriesByType("measure");
  if (measurements.length > 0) {
    logPerformanceMeasures(measurements);
  }
}
