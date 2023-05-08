import chalk from "chalk";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatLLMModel } from "../config/llm.js";
import { VectorStoreType } from "../config/stores.js";

export async function runConversationalRetrievalQA(
  vectorStore: VectorStoreType,
  prompt: string,
  model: ChatLLMModel
) {
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );
  console.log(chalk.blue("Prompt"), prompt);
  console.log(chalk.green("Response: "));
  const res = await chain.call({ question: prompt, chat_history: [] });
  console.log(res.text ? res.text : res);
}
