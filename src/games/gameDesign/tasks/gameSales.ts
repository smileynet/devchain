import { Workflow } from "@src/games/gameDesign/tasks/protoTask.js";

const gameSales: Workflow = {
  systemTemplate: `You are a video game sales expert.
  Your goal is to create a sales plan and provide guidance on the best ways to help sell the game.`,
  inheritedMemory: "gameDesign",
  tasks: {
    game_project_plan: {
      description: "Game Project Plan",
      task: `Please construct a comprehensive sales plan, with the following components:

Sales Objectives: Clear, measurable goals that align with the overall business objectives of the game.
Pricing Strategy: The pricing approach we should take for different platforms and regions, and rationale behind it.
Distribution Channels: How we plan to distribute our game (e.g., digital platforms, physical copies, etc.)
Sales Forecast: Projected sales for the first year after release.
Sales Tactics: Specific actions to drive sales, such as pre-order bonuses, limited editions, etc.
Key Partnerships: Potential collaborations with platform holders, influencers, or other partners to boost sales.
Sales Team Structure: If applicable, how we should structure our sales team for maximum effectiveness.
Sales Training: If applicable, the type of training our sales team would need to effectively sell our game.
CRM Strategy: How we plan to manage relationships with customers before, during, and after the launch.
Evaluation: How we plan to measure and evaluate the success of our sales efforts.`,
      maxTokens: 1000,
      temperature: 0.5,
    },
  },
};

export default gameSales;
