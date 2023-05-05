import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models";
import { LLMChain } from "langchain/chains";

import { SetupOptions } from "./setup.js";
import { BufferMemory } from "langchain/memory";

export default function generateLLMChain(options: SetupOptions) {
  console.debug("Creating LLMChain instance...");

  const projectMemory = new BufferMemory({ memoryKey: "projectMemory" });

  const systemTemplate = `You are code generation AI proficient in ${options.language} and ${options.uiFramework}.
Your goal is to build a ${options.language} app.
You will use ${options.uiFramework} for building the app user interface.
Assume all required libraries are installed.`;
  const systemPromptTemplate = PromptTemplate.fromTemplate(systemTemplate);
  const systemMessagePrompt = new SystemMessagePromptTemplate(
    systemPromptTemplate
  );

  console.debug("System message prompt: ", systemMessagePrompt);

  const userTemplate = `Here is your current task:
{task}`;

  const userPromptTemplate = new PromptTemplate({
    inputVariables: ["task"],
    template: userTemplate,
  });
  const userMessagePrompt = new HumanMessagePromptTemplate(userPromptTemplate);

  console.debug("User message prompt: ", userMessagePrompt);

  const prompt = ChatPromptTemplate.fromPromptMessages([
    systemMessagePrompt,
    userMessagePrompt,
  ]);

  console.debug("Prompt: ", prompt);

  const llm = new ChatOpenAI(
    {
      modelName: options.model,
      temperature: 0.35,
      verbose: options.verbose,
    },
    {
      basePath: "https://oai.hconeai.com/v1",
      baseOptions: {
        headers: {
          "Helicone-Cache-Enabled": "true",
          "Helicone-Auth": `Bearer ${process.env.HELICON_API_KEY}`,
        },
      },
    }
  );

  const chainInstance = new LLMChain({
    prompt: prompt,
    llm: llm,
    memory: projectMemory,
  });
  console.log(`LLMChain instance created.`);
  return chainInstance;
}
