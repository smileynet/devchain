import { GameDevOptions } from "./gameDevSetup.js";
import tasksGameDev from "./tasksGameDev.js";
import generatePrompt from "@src/generation/generatePrompt.js";

export default async function generateGameTitle(options: GameDevOptions) {
  console.debug("Generating game title...");

  const taskPrompt = await generatePrompt(tasksGameDev["generate_game_title"], {
    gameGenre: options.gameGenre,
    gameTheme: options.gameTheme,
    gameMechanics: options.gameMechanics,
    inspirationGames: options.inspirationGames,
  });

  return taskPrompt;
}
