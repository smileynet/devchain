import {
  GameDevOptions
} from "@src/games/gameDesign/gameDesignSetup.js";
import generateGameConcept from "@src/games/gameDesign/generateGameConcept.js";
import generateGameLLMChain from "@src/games/gameDesign/generateGameDesignChainLLM.js";
import generateGameTitle from "@src/games/gameDesign/generateGameTitle.js";
import generatePrompt from "@src/generation/generatePrompt.js";
import { runChain } from "@src/generation/runChain.js";
import sanitizeTitle from "@src/utils/sanitizeTitle.js";
import { writeOutputToFile } from "@src/utils/writeToFile.js";
import chalk from "chalk";
import { StringPromptValue } from "langchain/prompts";
import {tasks} from "@src/games/gameDesign/runGameDesignTasks.js";


export async function runGameDesignChain(category: string, taskKey: string, options: GameDevOptions) {
  const llmChain = generateGameLLMChain(options, category, tasks[category].systemTemplate);

  // Get task from category
  const task = tasks[category].tasks[taskKey];
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
      const fileName = `${category}-${task.description.toLowerCase().replace(" ", "_")}`;
      const filetype = "md";
      try {
        await writeOutputToFile(
          result.text,
          fileName,
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
