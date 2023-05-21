import { gameDesignSetup } from "@src/games/gameDesign/gameDesignSetup.js";
import generateGameConcept from "@src/games/gameDesign/generateGameConcept.js";
import generateGameLLMChain from "@src/games/gameDesign/generateGameDesignChainLLM.js";
import generateGameTitle from "@src/games/gameDesign/generateGameTitle.js";
import tasksGameDesign from "@src/games/gameDesign/tasksGameDesign.js";
import generatePrompt from "@src/generation/generatePrompt.js";
import { runChain } from "@src/generation/runChain.js";
import sanitizeTitle from "@src/utils/sanitizeTitle.js";
import { writeOutputToFile } from "@src/utils/writeToFile.js";
import chalk from "chalk";
import { StringPromptValue } from "langchain/prompts";

export async function runGameDesignChain() {
  const options = await gameDesignSetup();

  const llmChain = generateGameLLMChain(options);

  let fileNumber = 0;

  for (const taskKey in tasksGameDesign) {
    const task = tasksGameDesign[taskKey];
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
        fileNumber += 1;
        const fileName =
          fileNumber + "-" + task.description.toLowerCase().replace(" ", "_");
        //const filetype = task.description === "Asset List" ? "json" : "md";
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
}
