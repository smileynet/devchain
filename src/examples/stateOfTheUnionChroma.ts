import chalk from "chalk";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import path from "path";
import loadText from "../input/loadText.js";
import runRetrievalQA from "../query/runRetrievalQA.js";
import runSummarization from "../query/runSummarization.js";
import measurePerformance from "../utils/measurePerformance.js";

// to run this first run chroma's docker-container with `docker-compose up -d --build`
export default async function stateOfTheUnionCroma() {
  console.log(chalk.cyan("Test: ") + "State of the Union w/ Chroma");
  const model = new OpenAI();
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

  await measurePerformance(
    runSummarization,
    null,
    [docs],
    "sotu-chroma-summarize"
  );

  const prompt = "What did the president say about Justice Breyer?";
  await measurePerformance(
    runRetrievalQA,
    null,
    [vectorStore, prompt, model],
    "sotu-chroma-qa"
  );
}
