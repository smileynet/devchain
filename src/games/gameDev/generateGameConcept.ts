import { GameDevOptions } from "./gameDevSetup.js";
import tasksGameDev from "./tasksGameDev.js";
import generatePrompt from "@src/generation/generatePrompt.js";

export default async function generateGameConcept(options: GameDevOptions) {
  console.debug("Generating game concept...");

  const taskPrompt = await generatePrompt(tasksGameDev["game_concept"], {
    gameGenre: options.gameGenre,
    gameTheme: options.gameTheme,
    gameMechanics: options.gameMechanics,
    inspirationGames: options.inspirationGames,
  });

  if (process.env.VERBOSE_DEBUG === "true")
    console.debug("Generate task prompt: ", taskPrompt);

  return taskPrompt;
}
