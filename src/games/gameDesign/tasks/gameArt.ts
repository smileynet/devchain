import { Workflow } from "@src/games/gameDesign/tasks/protoTask.js";

const gameArt: Workflow = {
  systemTemplate: `You are a game art AI expert.
  Your goal is to generate a list of specific art assets needed for the development.`,
  inheritedMemory: "gameDesign",
  tasks: {
    asset_list: {
      description: "Asset List",
      task: `Referencing the game concept, design document, level design, and game flow, generate a list of specific art assets needed for development.
    Group these assets into categories: character sprites, environment assets, enemy sprites, UI elements, and others.
    Provide a detailed description and purpose for each asset, ensuring they align with the 16-bit retro pixel style.
    Output the asset list in an organized fashion for easy interpretation and use.`,
      maxTokens: 1500,
      temperature: 0.7,
    },
  },
};

export default gameArt;
