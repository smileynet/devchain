import { input, select } from "@inquirer/prompts";

export interface SetupOptions {
  appDescription: string;
  language: "typescript" | "python";
  packageManager: "npm" | "yarn" | null;
  verbose: boolean;
  model: "gpt-4" | "gpt-3.5-turbo";
}

export async function setup() {
  console.debug("Running setup...");
  const appDescription = await input({
    message:
      "Welcome to the Daedalus-CodeAI!\n\n" +
      "Provide a concise description of the app you want to build.\n" +
      "You will be able to review each step of the code generation process.\n\n" +
      "Please provide a concise description of the app you want to build:",
  });

  const languageChoice = await select({
    message: "Which language would you like the app to be created in?",
    choices: [
      {
        name: "TypeScript",
        value: "typescript",
        description:
          "TypeScript is a language for application-scale JavaScript development.",
      },
      {
        name: "Python",
        value: "python",
        description:
          "Python is a high-level, general-purpose programming language.",
      },
    ],
  });

  let packageManager = null;

  if (languageChoice === "typescript") {
    packageManager = await select({
      message: "Which package manager would you like to use?",
      choices: [
        {
          name: "npm",
          value: "npm",
          description:
            "npm is the default package manager for the JavaScript runtime environment Node.js.",
        },
        {
          name: "yarn",
          value: "yarn",
          description: "Fast, reliable, and secure dependency management.",
        },
      ],
    });
  }

  const verbose = await select({
    message: "Would you like to see verbose output?",
    choices: [
      {
        name: "Yes",
        value: "true",
        description:
          "Verbose output will show you each step of the code generation process.",
      },
      {
        name: "No",
        value: "false",
        description: "Verbose output will be hidden.",
      },
    ],
  });

  const model = await select({
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

  const options: SetupOptions = {
    appDescription,
    language: languageChoice as "typescript" | "python",
    packageManager: packageManager as "npm" | "yarn" | null,
    verbose: verbose === "true",
    model: model as "gpt-4" | "gpt-3.5-turbo",
  };

  console.debug("Setup complete!");
  console.debug(options);

  return options;
}
