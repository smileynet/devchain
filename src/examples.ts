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
        description: "Run Game Programming Patterns example.",
      },
      {
        name: "State of the Union",
        value: "stateOfTheUnion",
        description: "Run State of the Union example.",
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
