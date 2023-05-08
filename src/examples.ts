import { select } from "@inquirer/prompts";
import stateOfTheUnionChat from "./examples/stateOfTheUnionChat.js";
import stateOfTheUnion from "./examples/stateOfTheUnionHNSW.js";
import gameProgrammingPatterns from "./tests/gameProgrammingPatterns.js";

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
      {
        name: "State of the Union with Chat Model",
        value: "stateOfTheUnion-chat",
        description: "Run the conversational retrieval QA example version.",
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
    case "stateOfTheUnion-chat":
      await stateOfTheUnionChat();
      break;
  }
}
