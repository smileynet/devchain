import generatePrompt from "@src/generation/generatePrompt.js";
import { GameDevOptions } from "./gameDesignSetup.js";
import gameDesign from "./tasks/gameDesign.js";

export default async function generateGameTitle(options: GameDevOptions) {
  console.debug("Generating game title...");

  const taskPrompt = await generatePrompt(
    gameDesign.tasks["generate_game_title"],
    {
      gameGenre: options.gameGenre,
      gameTheme: options.gameTheme,
      gameMechanics: options.gameMechanics,
      inspirationGames: options.inspirationGames,
    }
  );

  return taskPrompt;
}
