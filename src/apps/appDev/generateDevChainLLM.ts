import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { SetupOptions } from "./setup.js";

export default function generateDevChainLLM(options: SetupOptions) {
  console.debug("Creating LLMChain instance...");

  const systemTemplate = `You are code generation AI proficient in ${options.language} and ${options.uiFramework}.
Your goal is to build a ${options.language} application.
You will use ${options.uiFramework} for building the application user interface.
Assume all required libraries are installed.`;
  const systemPromptTemplate = PromptTemplate.fromTemplate(systemTemplate);
  const systemMessagePrompt = new SystemMessagePromptTemplate(
    systemPromptTemplate
  );

  if (process.env.VERBOSE_DEBUG)
    console.debug("System message prompt: ", systemMessagePrompt);

  const userTemplate = `The following is information about the application you are building:
{projectMemory}
Here is your current task:
{task}`;

  const userPromptTemplate = new PromptTemplate({
    inputVariables: ["task", "projectMemory"],
    template: userTemplate,
  });
  const userMessagePrompt = new HumanMessagePromptTemplate(userPromptTemplate);

  if (process.env.VERBOSE_DEBUG)
    console.debug("User message prompt: ", userMessagePrompt);

  const prompt = ChatPromptTemplate.fromPromptMessages([
    systemMessagePrompt,
    userMessagePrompt,
  ]);

  if (process.env.VERBOSE_DEBUG) console.debug("Prompt: ", prompt);

  let llmConfig;
  if (process.env.USE_HELICONE === "true") {
    llmConfig = {
      basePath: "https://oai.hconeai.com/v1",
      baseOptions: {
        headers: {
          "Helicone-Cache-Enabled": "true",
          "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
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
  console.log(`LLMChain instance created.`);
  return chainInstance;
}
