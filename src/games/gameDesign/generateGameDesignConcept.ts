import generatePrompt from "@src/generation/generatePrompt.js";
import { GameDevOptions } from "./gameDesignSetup.js";
import tasksGameDesign from "./tasksGameDesign.js";

export default async function generateGameDesignConcept(
  options: GameDevOptions
) {
  console.debug("Generating game objective...");

  const taskPrompt = await generatePrompt(tasksGameDesign["gameConcept"], {
    genre: options.gameGenre,
    theme: options.gameTheme,
    gameMechanics: options.gameMechanics,
    inspirationGames: options.inspirationGames,
  });

  if (process.env.VERBOSE_DEBUG)
    console.debug("Generate game concept task prompt: ", taskPrompt);

  return taskPrompt;
}
