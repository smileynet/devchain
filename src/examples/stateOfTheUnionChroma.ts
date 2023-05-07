import chalk from "chalk";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import path from "path";
import loadText from "../input/loadText.js";

// to run this first run chroma's docker-container with `docker-compose up -d --build`
export default async function stateOfTheUnionCroma() {
  const model = new OpenAI();
  const filePath = path.join("src/samples/", `state_of_the_union.txt`);
  const docs = await loadText(filePath);

  const vectorStore = await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
    collectionName: "state_of_the_union",
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );
  const prompt = "What did the president say about Justice Breyer?";
  console.log(chalk.blue("Prompt"), prompt);
  console.log(chalk.green("Response: "));
  const res = await chain.call({ prompt, chat_history: [] });
  console.log(res);
}
