import { GameDevOptions } from "./gameDevSetup.js";
import tasksGameDev from "./tasksGameDev.js";
import generatePrompt from "@src/generation/generatePrompt.js";

export default async function generateGameDevObjective(options: GameDevOptions) {
  console.debug("Generating game objective...");

  const taskPrompt = await generatePrompt(tasksGameDev["gameConcept"], {
    genre: options.gameGenre,
    theme: options.gameTheme,
    gameMechanics: options.gameMechanics,
    inspirationGames: options.inspirationGames,
  });

  if (process.env.VERBOSE_DEBUG)
    console.debug("Generate game concept task prompt: ", taskPrompt);

  return taskPrompt;
}
