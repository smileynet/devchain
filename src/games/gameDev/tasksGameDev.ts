import {Task} from "@src/apps/appDev/tasksAppDev.js";

const tasksGameDev: Record<string, Task> = {
  generate_game_title: {
    description: "Generate Game Title",
    taskVariables: ["gameGenre", "gameTheme", "gameMechanics", "inspirationGames"],
    task: `Inspired by {inspirationGames}, generate a creative, catchy title for a {gameGenre} game with a {gameTheme} theme and these mechanics: {gameMechanics}.
    Only respond with the generated title.`,
    maxTokens: 5,
  },
  game_concept: {
    description: "Game Concept",
    taskVariables: ["gameGenre", "gameTheme", "gameMechanics", "inspirationGames"],
    task: `Inspired by {inspirationGames}, use your expertise to envision the game's concept and mechanics.
The game will be a {gameGenre} game with a {gameTheme} theme.
Develop an engaging game concept that includes these mechanics: {gameMechanics}.`,
    maxTokens: 200,
  },
  game_design_document: {
    description: "Game Design Document",
    task: `Reference the game concept and mechanics previously discussed, complete the task below:
Create a concise game design document. Outline the game world, characters, mechanics, storyline, and progression.
Present the game design document in an organized manner.`,
    maxTokens: 2000,
  },
  level_design: {
    description: "Level Design",
    task: `Referencing the game concept and design document previously discussed, complete the task below:
Create a concise level design that reflects the game mechanics and theme.
Detail the level structure, enemies, challenges, and progression.
Present the level design in an ordered list.`,
    maxTokens: 700,
  },
  game_flow: {
    description: "Game Flow",
    task: `Referencing the game concept, design document, and level design previously discussed, complete the task below:
Create a concise game flow detailing the gameplay experience.
Outline the player actions, controls, and feedback.
Present the game flow in an ordered list.`,
    maxTokens: 700,
  },
  asset_list: {
    description: "Asset List",
    task: `Referencing the game concept, design document, level design, and game flow previously discussed, complete the task below:
Create a list of art, sound, and programming assets to be completed later.
Provide a description for each asset to guide future development.
The output should be in JSON format.`,
    maxTokens: 2000,
  },
};

export default tasksGameDev;
