import { Task } from "@src/apps/appDev/tasksAppDev.js";

const tasksGameDesign: Record<string, Task> = {
  generate_game_title: {
    description: "Generate Game Title",
    taskVariables: [
      "gameGenre",
      "gameTheme",
      "gameMechanics",
      "inspirationGames",
    ],
    task: `Considering the inspiration from {inspirationGames}, create a unique and catchy title for a {gameGenre} game with a {gameTheme} theme and the following mechanics: {gameMechanics}.
  Ensure the title captures the essence of the game in a witty and memorable way. The title should stand out and pique interest.`,
    maxTokens: 10,
  },

  game_concept: {
    description: "Game Concept",
    taskVariables: [
      "gameGenre",
      "gameTheme",
      "gameMechanics",
      "inspirationGames",
    ],
    task: `Based on the inspiration from {inspirationGames}, develop an engaging game concept for a {gameGenre} game with a {gameTheme} theme.
  Incorporate these mechanics: {gameMechanics}.
  Produce a detailed summary of the game concept and mechanics, outlining how they will interact and enhance the gameplay experience.`,
    maxTokens: 100,
  },

  game_design_document: {
    description: "Game Design Document",
    task: `Reference the game concept and mechanics previously discussed, complete the task below:
  Create a game design document. Begin with a high level summary that outlines the game's genre, theme, mechanics, and inspirations.
  Then, delve into details: describe the game mechanics in depth, the core gameplay loop, user interface design, character and level design, art and sound style, and storyline.
  Discuss the unique selling points of the game and potential target audiences.
  Ensure the document is well-structured and easy to follow.`,
    maxTokens: 2000,
  },

  game_story_bible: {
    description: "Game Story Bible",
    task: `Referring to the game concept and design document, create a comprehensive story bible.
  Develop unique characters that fit with the genre and theme, giving each a distinct name, backstory, and role in the game world.
  Elaborate on the world's lore, central conflict, and overarching story arc.
  Begin with an opening narrative that sets the tone and introduces the main conflict, and outline the story progression for the introductory level.`,
    maxTokens: 2500,
  },

  level_design: {
    description: "Level Design",
    task: `Referencing the game concept, design document, and story bible, create a detailed level design.
  Design an introductory level, as well as two other levels, ensuring they reflect the game mechanics and theme.
  Describe the structure, objectives, enemies, challenges, and progression of each level.
  Also, provide a description of the environmental design, including the aesthetic, ambient sounds, and interactive elements.
  Present the level design in an organized format, allowing for easy interpretation.`,
    maxTokens: 1000,
  },

  game_flow: {
    description: "Game Flow",
    task: `Based on the game concept, design document, and level design, create a comprehensive game flow.
  Detail the player's journey, including their actions, the game's response, and the overall progression system.
  Include descriptions of controls, game mechanics, and player feedback systems.
  The output should be a step-by-step description of the gameplay experience from the player's perspective.`,
    maxTokens: 1000,
  },

  asset_list: {
    description: "Asset List",
    task: `Referencing the game concept, design document, level design, and game flow, generate a list of specific art assets needed for development.
  Group these assets into categories: character sprites, environment assets, enemy sprites, UI elements, and others.
  Provide a detailed description and purpose for each asset, ensuring they align with the 16-bit retro pixel style.
  Output the asset list in YAML format for easy interpretation and use.`,
    maxTokens: 1500,
  },

  game_code_outline: {
    description: "Game Code Outline",
    task: `Considering the game concept, design document, level design, game flow, and asset list, outline the game's core mechanics and modules from a code perspective.
  Identify primary game systems and modules and provide recommendations on how they can be implemented using TypeScript.
  For each system or module, suggest at least two appropriate TypeScript packages, providing pros, cons, and rationale for each recommendation.
  The output should be an ordered list of systems, modules, and mechanics, each with their purpose and recommended packages detailed.`,
    maxTokens: 3000,
  },

  game_critique: {
    description: "Game Critique",
    task: `Referencing all the previous work done for our game, provide a holistic critique of the overall game design.
  Analyze the game from the perspectives of a player, a game designer, an artist, and a programmer.
  For each perspective, offer both positive feedback and constructive criticism.
  Discuss gameplay, narrative, aesthetics, technical implementation, and the unique game mechanics.
  Also, outline what a minimum viable product (MVP) would look like for this game, considering each perspective's expectations.`,
    maxTokens: 1500,
  },

  game_project_plan: {
    description: "Game Project Plan",
    task: `Referencing all the previous work done for our game, create a detailed project plan.
  Summarize the steps generated so far and organize them into an ordered task list.
  Design the plan to support collaborative development, dividing tasks into different workflows for different teams (design, art, programming, testing).
  For each task, detail its objective, team responsible, key milestones, potential risks, and dependencies.
  As GPT-4 cannot create graphical content directly, instead of a Mermaid diagram, provide a textual representation that can be used with a tool that supports Mermaid.`,
    maxTokens: 3000,
  },
};

export default tasksGameDesign;
