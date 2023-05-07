import chalk from "chalk";
import path from "path";
import loadJSON from "../input/loadJSON.js";
import runRetrievalQA from "../summarization/runRetrievalQA.js";
import docs2vec from "../transform/docs2vec.js";

export default async function gameProgrammingPatterns() {
  const filePath = path.join("src/samples/", `game_programming_patterns.json`);
  const pointer = "/text";
  const docs = await loadJSON(filePath, pointer);
  const vectorStore = await docs2vec(docs);
  // console.log(docs);
  let prompt = "What are best practices when programming games?";
  console.log(chalk.blue("Prompt", prompt));
  console.log(chalk.green("Response: "));
  await runRetrievalQA(vectorStore, prompt);

  prompt = "What is the object pooling pattern?";
  console.log(chalk.blue("Prompt", prompt));
  console.log(chalk.green("Response: "));
  await runRetrievalQA(vectorStore, prompt);
}
