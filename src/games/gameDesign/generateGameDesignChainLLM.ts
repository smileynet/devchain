import { GameDevOptions } from "@src/games/gameDesign/gameDesignSetup.js";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import memoryManager from "@src/utils/memoryManager.js";

export default function generateGameLLMChain(options: GameDevOptions, category: string, systemTemplate: string) {
  console.debug("Creating GameLLMChain instance...");
  const systemPromptTemplate = PromptTemplate.fromTemplate(systemTemplate);
  const systemMessagePrompt = new SystemMessagePromptTemplate(
    systemPromptTemplate
  );

  if (process.env.VERBOSE_DEBUG === "true")
    console.debug("System message prompt: ", systemMessagePrompt);

  const userTemplate = `The following is information about the game you are designing:
{${category}}
Here is your current task:
{task}`;

  const userPromptTemplate = new PromptTemplate({
    inputVariables: ["task", `${category}`],
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

  const llm = new ChatOpenAI(
    {
      modelName: options.model,
      temperature: 0.35,
      verbose: options.verbose,
    },
  );

  const chainInstance = new LLMChain({
    prompt: prompt,
    llm: llm,
    memory: memoryManager.getBufferMemory(category),
  });
  console.log(`GameLLMChain instance created.`);
  return chainInstance;
}
