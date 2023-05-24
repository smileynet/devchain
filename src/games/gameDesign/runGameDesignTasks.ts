import {runGameDesignChain} from './runGameDesignChain.js';
import gameDevelopment from "@src/games/gameDesign/tasks/gameDevelopment.js";
import gameDesign from "@src/games/gameDesign/tasks/gameDesign.js";
import gameAnalysis from "@src/games/gameDesign/tasks/gameAnalysis.js";
import gameArt from "@src/games/gameDesign/tasks/gameArt.js";
import {Workflow} from "@src/games/gameDesign/tasks/protoTask.js";
import {
  gameDesignSetup,
  GameDevOptions
} from "@src/games/gameDesign/gameDesignSetup.js";
import memoryManager from "@src/utils/memoryManager.js";
import gameMVP from "@src/games/gameDesign/tasks/gameMVP.js";
import gameStyle from "@src/games/gameDesign/tasks/gameStyle.js";
import gamePlan from "@src/games/gameDesign/tasks/gamePlan.js";
import gameMarketing from "@src/games/gameDesign/tasks/gameMarketing.js";
import gameSales from "@src/games/gameDesign/tasks/gameSales.js";

export const tasks: Record<string, Workflow> = {
  gameDesign: gameDesign,
  gameAnalysis: gameAnalysis,
  gameArt: gameArt,
  gameDevelopment: gameDevelopment,
  gameMVP: gameMVP,
  gamePlan: gamePlan,
  gameStyle: gameStyle,
  gameMarketing: gameMarketing,
  gameSales: gameSales
};

export default async function runGameDesignTasks() {
  const options = await gameDesignSetup(); // Run the setup once at the beginning
  await runTaskChain('gameDesign', gameDesign, options);

  const otherTaskCategories = ['gameAnalysis', 'gameArt', 'gameDevelopment', 'gameMVP', 'gamePlan', 'gameStyle', 'gameMarketing', 'gameSales'];
  await Promise.all(
    otherTaskCategories.map((category) =>
      runTaskChain(category, tasks[category], options)
    )
  );
}

async function runTaskChain(category: string, workflow: Workflow, options: GameDevOptions) {
  const taskKeys = Object.keys(workflow.tasks);
  for (const task of taskKeys) {
    if (workflow.inheritedMemory) {
      memoryManager.createBufferMemoryFrom(workflow.inheritedMemory, category);
    } else {
      memoryManager.getBufferMemory(category);
    }
    console.debug(`Running category ${category}, task ${task}`)
    await runGameDesignChain(category, task, options);
  }
}
