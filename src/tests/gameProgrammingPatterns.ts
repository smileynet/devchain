import chalk from "chalk";
import path from "path";
import { davinci, LLMModel } from "../config/llm.js";
import loadJSON from "../input/loadJSON.js";
import runRetrievalQA from "../query/runRetrievalQA.js";
import docs2chroma from "../transform/docs2chroma.js";
import docs2hnsw from "../transform/docs2hnsw.js";
import simplePromptTest from "./simplePromptTest.js";
import loadEpub from "@src/input/loadEpub.js";

export default async function gameProgrammingPatterns(
  model: LLMModel = davinci,
  vectorStoreChoice = "hnsw"
) {
  const filePath = path.join("src/samples/", `game_programming_patterns.json`);
  const pointer = "/text";
  const docs = await loadJSON(filePath, pointer);
  let vectorStore;
  if (vectorStoreChoice === "hnsw") {
    vectorStore = await docs2hnsw(docs);
  } else if (vectorStoreChoice === "chroma") {
    vectorStore = await docs2chroma(docs, "game_programming_patterns");
  }

  const glFilePath = path.join("src/samples/", `art_of_gamedesign.epub`);
  const gameLensDocs = await loadEpub(glFilePath)
  let gameLensVectorStore;
  if (vectorStoreChoice === "hnsw") {
    gameLensVectorStore = await docs2hnsw(gameLensDocs);
  } else if (vectorStoreChoice === "chroma") {
    gameLensVectorStore = await docs2chroma(gameLensDocs, "art_of_gamedesign");
  }

  if (!vectorStore) throw new Error("No vector store was created");
  if (!gameLensVectorStore) throw new Error("No vector store was created");

  let prompt = "What are best practices when programming games?";
  console.log(
    chalk.yellow("*** This prompt run WITHOUT the vector store. ***")
  );
  await simplePromptTest(model, prompt);

  console.log(chalk.magenta("*** This prompt run WITH the vector store. ***"));

  await runRetrievalQA(vectorStore, prompt, model);

  console.log(chalk.cyan("*** This prompt run WITH the epub vector store. ***"));

  await runRetrievalQA(gameLensVectorStore, prompt, model);

  prompt = "What is the object pooling pattern?";
  console.log(
    chalk.yellow("*** This prompt run WITHOUT the vector store. ***")
  );
  await simplePromptTest(model, prompt);

  console.log(chalk.magenta("*** This prompt run WITH the vector store. ***"));
  await runRetrievalQA(vectorStore, prompt, model);

  console.log(chalk.cyan("*** This prompt run WITH the epub vector store. ***"));
  await runRetrievalQA(gameLensVectorStore, prompt, model);
}
