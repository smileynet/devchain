import { Workflow } from "@src/games/gameDesign/tasks/protoTask.js";

const gameDesign: Workflow = {
  systemTemplate: `You are a game design AI expert.
  Your goal is to design a game with a unique title and concept. Generate a comprehensive game design document, story bible, level design, and game flow.`,
  tasks: {
    generate_game_title: {
      description: "Generate Game Title",
      taskVariables: [
        "gameGenre",
        "gameTheme",
        "gameMechanics",
        "inspirationGames",
      ],
      task: `Considering the inspiration from {inspirationGames}, create a unique and catchy title for a {gameGenre} game with a {gameTheme} theme and the following mechanics: {gameMechanics}.
  Ensure the title captures the essence of the game in a witty and memorable way. The title should stand out and pique interest.
  Return only the title.`,
      maxTokens: 10,
      temperature: 1,
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
  Produce a concise, one to two paragraph summary of the game concept and mechanics, outlining how they will interact and enhance the gameplay experience.`,
      maxTokens: 100,
      temperature: 0.7,
    },

    game_design_document: {
      description: "Game Design Document",
      task: `Reference the game concept and mechanics previously discussed, complete the task below:
  Create a game design document. Begin with a high level summary that outlines the game's genre, theme, mechanics, and inspirations.
  Then, delve into details: describe the game mechanics in depth, the core gameplay loop, user interface design, character and level design, art and sound style, and storyline.
  Discuss the unique selling points of the game and potential target audiences.`,
      maxTokens: 2000,
      temperature: 0.7,
    },

    game_story_bible: {
      description: "Game Story Bible",
      task: `Referring to the game concept and design document, create a comprehensive story bible.
  Elaborate on the world's lore, central conflict, and overarching story arc.
  Develop unique characters that fit with the genre and theme, giving each a distinct name, archetype, backstory, and role in the game world.
  There should be one protagonist, two antagonists, and three supporting characters.
  There should be three to five major factions, each with a distinct name, history, and ideology.
  Include major locations and landmarks, giving them descriptions and potential plot significance.
  Give an opening narrative that sets the tone and introduces the main conflict, and outline the story progression for the introductory level.`,
      maxTokens: 2500,
      temperature: 1,
    },

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
