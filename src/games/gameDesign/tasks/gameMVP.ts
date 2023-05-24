import { Workflow } from "@src/games/gameDesign/tasks/protoTask.js";

const gameDesign: Workflow = {
  systemTemplate: `You are a game design and project planning AI expert.
  Your goal is to design a minimum playable game for testing game ideas.`,
  tasks: {
    level_design: {
      description: "Level Design",
      task: `Referencing the game concept, design document, and story bible, create a detailed level design.
  Design an introductory level, as well as two other levels, ensuring they reflect the game mechanics and theme.
  Describe the structure, objectives, enemies, challenges, and progression of each level.
  Also, provide a description of the environmental design, including the aesthetic, ambient sounds, and interactive elements.
  Present the level design in an organized format, allowing for easy interpretation.`,
      maxTokens: 1000,
      temperature: 0.5,
    },

    game_flow: {
      description: "Game Flow",
      task: `Based on the game concept, design document, and level design, create a comprehensive game flow.
  Detail the player's journey, including their actions, the game's response, and the overall progression system.
  Include descriptions of controls, game mechanics, and player feedback systems.
  The output should be a step-by-step description of the gameplay experience from the player's perspective.`,
      maxTokens: 1000,
      temperature: 0.5,
    },
  },
};

export default gameDesign;
