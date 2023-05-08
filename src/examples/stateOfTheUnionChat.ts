import chalk from "chalk";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import path from "path";
import { gptTurbo } from "../config/llm.js";
import loadText from "../input/loadText.js";
import { runConversationalRetrievalQA } from "../query/runConversationalRetrievalQA.js";
import measurePerformance from "../utils/measurePerformance.js";

export default async function stateOfTheUnionChat() {
  console.log(chalk.cyan("Test: ") + "State of the Union with Chat Model");

  const filePath = path.join("src/samples/", `state_of_the_union.txt`);
  const docs = await loadText(filePath);

  console.log(chalk.magenta("Loading Vector Store: ") + "Chroma");
  const vectorStore = await measurePerformance(
    Chroma.fromDocuments,
    Chroma,
    [
      docs,
      new OpenAIEmbeddings(),
      {
        collectionName: "state_of_the_union",
      },
    ],
    "sotu-chroma-load"
  );

  const prompt = "What did the president say about Justice Breyer?";
  await measurePerformance(
    runConversationalRetrievalQA,
    null,
    [vectorStore, prompt, gptTurbo],
    "sotu-chroma-qa"
  );
}
