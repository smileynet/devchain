import { GameDevOptions } from "@src/games/gameDesign/gameDesignSetup.js";
import memoryManager from "@src/utils/memoryManager.js";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { Replicate } from "langchain/llms/replicate";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

export default function generateGameLLMChain(
  options: GameDevOptions,
  category: string,
  systemTemplate: string,
  temperature = 0.35,
  maxTokens = 200
) {
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

  let llm;
  if (process.env.USE_ALT_MODELS === "true") {
    llm = new Replicate({
      model:
        "replicate/dolly-v2-12b:ef0e1aefc61f8e096ebe4db6b2bacc297daf2ef6899f0f7e001ec445893500e5",
    });
  } else {
    llm = new ChatOpenAI({
      modelName: options.model,
      temperature: temperature,
      verbose: options.verbose,
      maxTokens: maxTokens,
    });
  }

  const chainInstance = new LLMChain({
    prompt: prompt,
    llm: llm,
    memory: memoryManager.getBufferMemory(category),
  });
  console.log(`GameLLMChain instance created.`);
  return chainInstance;
}
