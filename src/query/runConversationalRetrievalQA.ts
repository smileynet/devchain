import chalk from "chalk";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { VectorStoreType } from "../config/stores.js";

export async function runConversationalRetrievalQA(
  vectorStore: VectorStoreType,
  prompt: string,
  model: OpenAI
) {
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );
  console.log(chalk.blue("Prompt"), prompt);
  console.log(chalk.green("Response: "));
  const res = await chain.call({ prompt, chat_history: [] });
  console.log(res);
}
