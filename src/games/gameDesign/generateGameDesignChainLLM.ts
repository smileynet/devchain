import { GameDevOptions } from "@src/games/gameDesign/gameDesignSetup.js";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

export default function generateGameLLMChain(options: GameDevOptions) {
  console.debug("Creating GameLLMChain instance...");

  const systemTemplate = `You are a game design AI expert.
Your goal is to design a ${options.gameGenre} game with ${options.gameTheme} theme.
You will use ${options.gameMechanics} for the main game mechanics.
Use game design best practices to design the game.`;
  const systemPromptTemplate = PromptTemplate.fromTemplate(systemTemplate);
  const systemMessagePrompt = new SystemMessagePromptTemplate(
    systemPromptTemplate
  );

  if (process.env.VERBOSE_DEBUG === "true")
    console.debug("System message prompt: ", systemMessagePrompt);

  const userTemplate = `The following is information about the game you are designing:
{projectMemory}
Here is your current task:
{task}`;

  const userPromptTemplate = new PromptTemplate({
    inputVariables: ["task", "projectMemory"],
    template: userTemplate,
  });
  const userMessagePrompt = new HumanMessagePromptTemplate(userPromptTemplate);

  if (process.env.VERBOSE_DEBUG === "true")
    console.debug("User message prompt: ", userMessagePrompt);

  const prompt = ChatPromptTemplate.fromPromptMessages([
    systemMessagePrompt,
    userMessagePrompt,
  ]);

  if (process.env.VERBOSE_DEBUG === "true") console.debug("Prompt: ", prompt);
  let llmConfig;
  if (process.env.USE_HELICONE === "true") {
    llmConfig = {
      basePath: "https://oai.hconeai.com/v1",
      baseOptions: {
        headers: {
          "Helicone-Cache-Enabled": "true",
          "Helicone-Auth": `Bearer ${process.env.HELICON_API_KEY}`,
        },
      },
    };
  }
  const llm = new ChatOpenAI(
    {
      modelName: options.model,
      temperature: 0.35,
      verbose: options.verbose,
    },
    llmConfig
  );

  const chainInstance = new LLMChain({
    prompt: prompt,
    llm: llm,
    memory: new BufferMemory({
      memoryKey: "projectMemory",
    }),
  });
  console.log(`GameLLMChain instance created.`);
  return chainInstance;
}
