import { select } from "@inquirer/prompts";
import gameProgrammingPatterns from "./examples/gameProgrammingPatterns.js";
import stateOfTheUnion from "./examples/stateOfTheUnion.js";

export default async function examples() {
  const choice = await select({
    message: "Which example would you like to run?",
    choices: [
      {
        name: "Game Programming Patterns",
        value: "gameProgrammingPatterns",
        description:
          "Run queries against JSON scraped version of Game Programming Patterns website.",
      },
      {
        name: "State of the Union",
        value: "stateOfTheUnion",
        description:
          "Run summarization and query against the recent State of the Union.",
      },
    ],
  });

  switch (choice) {
    case "gameProgrammingPatterns":
      await gameProgrammingPatterns();
      break;
    case "stateOfTheUnion":
      await stateOfTheUnion();
      break;
  }
}
