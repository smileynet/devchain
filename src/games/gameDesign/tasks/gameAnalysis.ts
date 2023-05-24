import { Workflow } from "@src/games/gameDesign/tasks/protoTask.js";

const gameAnalysis: Workflow = {
  systemTemplate: `You are a game analysis AI expert.
  Your goal is to critically analyze the game design from multiple perspectives and create a detailed project plan.`,
  inheritedMemory: "gameDesign",
  tasks: {
    game_critique: {
      description: "Game Critique",
      task: `Referencing all the previous work done for our game, provide a holistic critique of the overall game design.
    Analyze the game from the perspectives of a player, a game designer, an artist, and a programmer.
    For each perspective, offer both positive feedback and constructive criticism.
    Discuss gameplay, narrative, aesthetics, technical implementation, and the unique game mechanics.`,
      maxTokens: 1500,
      temperature: 0.5,
    },
  },
};

export default gameAnalysis;
