
import chalk from "chalk";
import { StringPromptValue } from "langchain/prompts";
import generatePrompt from "@src/generation/generatePrompt.js";
import { runChain } from "@src/generation/runChain.js";
import { writeOutputToFile } from "@src/utils/writeToFile.js";
import { gameDevSetup } from "@src/games/gameDev/gameDevSetup.js";
import tasksGameDev from "@src/games/gameDev/tasksGameDev.js";
import generateGameLLMChain
  from "@src/games/gameDev/generateGameDevChainLLM.js";
import generateGameConcept from "@src/games/gameDev/generateGameConcept.js";
import generateGameTitle from "@src/games/gameDev/generateGameTitle.js";
import sanitizeTitle from "@src/utils/sanitizeTitle.js";

export async function runGameDevChain() {
  const options = await gameDevSetup();

  const llmChain = generateGameLLMChain(options);

  for (const taskKey in tasksGameDev) {
    const task = tasksGameDev[taskKey];
    console.log(chalk.blue("\nCurrent task: "), task.description);

    let taskPrompt;
    if (taskKey === "generate_game_title") {
      taskPrompt = await generateGameTitle(options);
      const gameTitleResult = await runChain(llmChain, taskPrompt);
      const gameTitle = gameTitleResult.text.trim();
      console.log(chalk.green("\nGame Title: "), gameTitle);
      options.gameTitle = sanitizeTitle(gameTitle);
    } else {
      if (taskKey === "game_concept") {
        taskPrompt = await generateGameConcept(options);
      } else {
        taskPrompt = await generatePrompt(task);
      }

      const taskValue = taskPrompt as StringPromptValue;
      console.debug(chalk.cyan("Task Prompt\n"), taskValue.value);

      const result = await runChain(llmChain, taskPrompt);
      console.log(chalk.green("Result:\n"), result.text);

      if (process.env.WRITE_TO_FILE === "true") {
        //const filetype = task.description === "Asset List" ? "json" : "md";
        const filetype = "md"
        try {
          await writeOutputToFile(
            result.text,
            task.description.toLowerCase().replace(" ", "_"),
            filetype,
            options.gameTitle ? options.gameTitle : options.gameGenre
          );
          console.debug(chalk.green("Successfully wrote to file"));
        } catch (error) {
          console.log(chalk.red("Error writing to file: "), error);
        }
      }
    }
  }
}
