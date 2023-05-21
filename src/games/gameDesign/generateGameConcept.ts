import generatePrompt from "@src/generation/generatePrompt.js";
import { GameDevOptions } from "./gameDesignSetup.js";
import gameDesign from "./tasks/gameDesign.js";

export default async function generateGameConcept(options: GameDevOptions) {
  console.debug("Generating game concept...");

  const taskPrompt = await generatePrompt(gameDesign.tasks["game_concept"], {
    gameGenre: options.gameGenre,
    gameTheme: options.gameTheme,
    gameMechanics: options.gameMechanics,
    inspirationGames: options.inspirationGames,
  });

  if (process.env.VERBOSE_DEBUG === "true")
    console.debug("Generate task prompt: ", taskPrompt);

  return taskPrompt;
}
