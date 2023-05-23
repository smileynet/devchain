import { Workflow } from "@src/games/gameDesign/tasks/protoTask.js";

const gameDevelopment: Workflow = {
  systemTemplate: `You are a game development AI expert.
  Your goal is to outline the game's core mechanics and modules from a code perspective and recommend suitable packages for the implementation.`,
  inheritedMemory: "gameDesign",
  tasks: {
    game_code_outline: {
      description: "Game Code Outline",
      task: `Considering the game concept, design document, level design, game flow, and asset list, outline the game's core mechanics and modules from a code perspective.
    Identify primary game systems and modules and provide recommendations on how they can be implemented using TypeScript.
    The output should be an ordered list of systems, modules, and mechanics, each with their purpose.`,
      maxTokens: 3000,
      temperature: 0,
    },
    package_recommendations: {
      description: "Package Recommendations",
      task: `Considering the game concept, design document, level design, game flow, and game code outline, recommend packages that can be used to implement the game.
    For each package, provide a description of its purpose and how it can be used to implement the game.
    recommend two to three packages for each game system or module.
    Provide the pros and cons of each with a final recommendation for which package to use.`,
      maxTokens: 3000,
      temperature: 0.2,
    },
  },
};

export default gameDevelopment;
