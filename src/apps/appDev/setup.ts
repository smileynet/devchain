import { input, select } from "@inquirer/prompts";

export interface SetupOptions {
  objective: string;
  language: "typescript" | "python";
  uiFramework: "React" | "Streamlit";
  packageManager: "npm" | "yarn" | null;
  verbose: boolean;
  model: "gpt-4" | "gpt-3.5-turbo";
}

export async function setup(prompt?: string) {
  console.debug("Running setup...");
  const appObjective = prompt
    ? prompt
    : await input({
        message:
          "Welcome to the Daedalus-CodeAI!\n\n" +
          "Provide a concise description of the app you want to build.\n" +
          "You will be able to review each step of the code generation process.\n\n" +
          "Please provide a concise description of the app you want to build:",
      });

  const languageChoice = process.env.CODE_LANGUAGE
    ? process.env.CODE_LANGUAGE
    : await select({
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
    packageManager = process.env.PACKAGE_MANAGER
      ? process.env.PACKAGE_MANAGER
      : await select({
          message: "Which package manager would you like to use?",
          choices: [
            {
              name: "yarn",
              value: "yarn",
              description: "Fast, reliable, and secure dependency management.",
            },
            {
              name: "npm",
              value: "npm",
              description:
                "npm is the default package manager for the JavaScript runtime environment Node.js.",
            },
          ],
        });
  }

  const verbose = process.env.VERBOSE
    ? process.env.VERBOSE
    : await select({
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

  const model = process.env.MODEL
    ? process.env.MODEL
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

  const options: SetupOptions = {
    objective: appObjective,
    language: languageChoice as "typescript" | "python",
    uiFramework: languageChoice === "typescript" ? "React" : "Streamlit",
    packageManager: packageManager as "npm" | "yarn" | null,
    verbose: verbose === "true",
    model: model as "gpt-4" | "gpt-3.5-turbo",
  };

  console.debug("Setup complete!");
  //console.debug(options);

  return options;
}
