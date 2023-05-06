import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { LLMChain } from "langchain/chains";
import { BabyAGI } from "langchain/experimental/babyagi";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { ChainTool, SerpAPI, Tool } from "langchain/tools";
import { gptTurbo } from "../../config/llm.js";
import { vectorstore } from "../../config/vectorstore.js";

export async function runBabyAGI(
  prompt = "Write a weather report for Seattle, Washington.",
  iterations = 5
) {
  const todoPrompt = PromptTemplate.fromTemplate(
    "You are a planner who is an expert at coming up with a todo list for a given objective. Come up with a todo list for this objective: {objective}"
  );

  const tools: Tool[] = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "Seattle,Washington,United States",
      hl: "en",
      gl: "us",
    }),
    new ChainTool({
      name: "TODO",
      chain: new LLMChain({
        llm: new OpenAI({ temperature: 0 }),
        prompt: todoPrompt,
      }),
      description:
        "useful for when you need to come up with todo lists. Input: an objective to create a todo list for. Output: a todo list for that objective. Please be very clear what the objective is!",
    }),
  ];
  const agentExecutor = await initializeAgentExecutorWithOptions(
    tools,
    new OpenAI({ temperature: 0 }),
    {
      agentType: "zero-shot-react-description",
      agentArgs: {
        prefix: `You are an AI who performs one task based on the following objective: {objective}. Take into account these previously completed tasks: {context}.`,
        suffix: `Question: {task}
{agent_scratchpad}`,
        inputVariables: ["objective", "task", "context", "agent_scratchpad"],
      },
    }
  );

  // Then, we create a BabyAGI instance.
  const babyAGI = BabyAGI.fromLLM({
    llm: gptTurbo,
    executionChain: agentExecutor, // an agent executor is a chain
    vectorstore: vectorstore,
    maxIterations: iterations,
  });

  await babyAGI.call({
    objective: prompt,
  });
}
