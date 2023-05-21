import { select } from "@inquirer/prompts";
import { runGameDesignChain } from "@src/games/gameDesign/runGameDesignChain.js";

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
      await runGameDesignChain();
      break;
  }
}
