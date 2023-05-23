import { Workflow } from "@src/games/gameDesign/tasks/protoTask.js";

const gameMarketing: Workflow = {
  systemTemplate: `You are a video game marketing expert.
  Your goal is to create a marketing plan and provide guidance on the best ways to help sell the game.`,
  inheritedMemory: "gameDesign",
  tasks: {
    game_project_plan: {
      description: "Game Project Plan",
      task: `Please provide a detailed marketing plan, including the following components:

Market Research: Understanding of the current market, major competitors, and our target audience.
Marketing Objectives: Clear, measurable goals that align with the overall business objectives of the game.
Marketing Strategies: High-level approaches to reach our marketing objectives.
Marketing Tactics: Specific actions or initiatives that will be used to achieve the marketing strategies.
Marketing Channels: The channels (social media, email, influencers, events, etc.) that we will use to reach our target audience.
Budget: A rough estimate of the budget allocated to each marketing channel or initiative.
Timeline: A timeline of when each initiative should be launched leading up to and following the game's release.
Evaluation: How we plan to measure and evaluate the success of our marketing efforts`,
      maxTokens: 1000,
      temperature: 1,
    },
  },
};

export default gameMarketing;
