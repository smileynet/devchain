import { Workflow } from "@src/games/gameDesign/tasks/protoTask.js";

const gamePlan: Workflow = {
  systemTemplate: `You are a game development project planning expert.
  Your goal is to critically analyze the game design from multiple perspectives and create a detailed project plan.`,
  inheritedMemory: "gameDesign",
  tasks: {
    game_project_plan: {
      description: "Game Project Plan",
      task: `Based on all the previous work done for our game, create a detailed project plan.
    The project plan should be structured to support a collaborative development environment, splitting tasks into multiple workflows that can be tackled by different teams.
    This includes tasks for game design, art production, front-end programming, back-end programming, and testing.
    For each task, detail its objective, key milestones, potential risks, and dependencies.`,
      maxTokens: 3000,
      temperature: 0.3,
    },
  },
};

export default gamePlan;
