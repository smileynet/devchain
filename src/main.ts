import { input, select } from "@inquirer/prompts";

interface SetupOptions {
  appDescription: string;
  language: "typescript" | "python";
  packageManager: "npm" | "yarn" | null;
}

async function setup() {
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

  const options: SetupOptions = {
    appDescription,
    language: languageChoice as "typescript" | "python",
    packageManager: packageManager as "npm" | "yarn" | null,
  };

  console.debug("Setup complete!");
  console.debug(options);

  return {
    options,
  };
}

function main() {
  const results = setup();
  console.debug(results);
  // Invoke chain

  // Confirm

  // Repeat
}

main();
