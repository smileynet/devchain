import { select } from "@inquirer/prompts";
import {runGameDevChain} from "@src/games/gameDev/runGameDevChain.js";

export default async function games() {
  const gameDevMethodSelection = await select({
    message: "Which method would you like to use for game development?",
    choices: [
      {
        name: "GameDevChain",
        value: "gamedevchain",
        description: "GameDevChain LangChain sequence for creating a game.",
      },
    ],
  });

  switch (gameDevMethodSelection) {
    case "gamedevchain":
      await runGameDevChain();
      break;
  }
}
