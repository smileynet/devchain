import { input, select } from "@inquirer/prompts";
import chalk from "chalk";

export interface GameDevOptions {
  gameGenre: string;
  gameTheme: string;
  gameMechanics: string;
  inspirationGames: string;
  gameTitle?: string;
  verbose: boolean;
  model: "gpt-4" | "gpt-3.5-turbo";
}

export async function gameDevSetup() {
  console.log(chalk.blue("Welcome to GameDevChain!"));
  console.log(chalk.cyanBright("Ready to make a game?"));

  const gameGenre = process.env.GAME_GENRE
    ? process.env.GAME_GENRE
    : await input({
      message: "Please specify the genre of the game you wish to develop:",
      default: "Platformer",
    });

  const gameTheme = process.env.GAME_THEME
    ? process.env.GAME_THEME
    : await input({
      message: "Please specify the theme of your game:",
      default: "Space",
    });

  const gameMechanics = process.env.GAME_MECHANICS
    ? process.env.GAME_MECHANICS
    : await input({
      message: "Please describe the main mechanics of your game:",
      default: "Jumping and shooting aliens",
    });

  const inspirationGames = process.env.INSPIRATION_GAMES
    ? process.env.INSPIRATION_GAMES
    : await input({
      message: "Please name some existing games that should be used for inspiration:",
      default: "Super Mario Bros, Metroid, Contra",
    });

  const model = process.env.CHAT_MODEL
    ? process.env.CHAT_MODEL
    : await select({
      message: "Which model would you like to use?",
      choices: [
        {
          name: "GPT-4",
          value: "gpt-4",
          description: "GPT-4 is slow and more expensive but smarter.",
        },
        {
          name: "GPT-3.5 Turbo",
          value: "gpt-3.5-turbo",
          description: "GPT-3.5 Turbo is fast and cheap but less capable.",
        },
      ],
    });
  const verbose = process.env.VERBOSE === "true";
  const options: GameDevOptions = {
    gameGenre,
    gameTheme,
    gameMechanics,
    inspirationGames,
    verbose: verbose,
    model: model as "gpt-4" | "gpt-3.5-turbo",
  };

  console.log(chalk.cyanBright("I have received your input, get ready for the magic!"));

  return options;
}
