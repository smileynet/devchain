import { select } from "@inquirer/prompts";
import * as dotenv from "dotenv";
import applications from "./applications.js";
import examples from "./examples.js";

dotenv.config();

async function main() {
  const mode = await select({
    message: "Which mode would you like to use?",
    choices: [
      {
        name: "Examples",
        value: "examples",
        description: "Run examples.",
      },
      {
        name: "Applications",
        value: "applications",
        description: "Run applications.",
      },
    ],
  });

  switch (mode) {
    case "examples":
      await examples();
      break;
    case "applications":
      await applications();
      break;
  }
}

await main();
