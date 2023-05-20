import { select } from "@inquirer/prompts";
import * as dotenv from "dotenv";
import applications from "./applications.js";
import examples from "./examples.js";
import test from "./test.js";
import games from "./games.js";

dotenv.config();

async function main() {
  let mode;
  if (process.env.DEFAULT_CHOICE) {
    mode = process.env.DEFAULT_CHOICE;
  } else {
    mode = await select({
      message:
        "Welcome to DevChain!\n\n" +
        "Which mode would you like to use?",
      choices: [
        {
          name: "Games",
          value: "games",
          description: "Run game chains.",
        },
        {
          name: "Applications",
          value: "applications",
          description: "Run application chains.",
        },
        {
          name: "Examples",
          value: "examples",
          description: "Run examples.",
        },

        {
          name: "Test",
          value: "test",
          description: "Run tests.",
        },
      ],
    });
  }

  switch (mode) {
    case "games":
      await games();
      break;
    case "applications":
      await applications();
      break;
    case "examples":
      await examples();
      break;
    case "test":
      await test();
      break;
  }
}

await main();
