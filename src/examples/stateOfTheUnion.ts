import chalk from "chalk";
import path from "path";
import loadText from "../input/loadText.js";
import runRetrievalQA from "../summarization/runRetrievalQA.js";
import runSummarization from "../summarization/runSummarization.js";
import docs2vec from "../transform/docs2vec.js";

export default async function stateOfTheUnion() {
  const filePath = path.join("src/samples/", `state_of_the_union.txt`);
  const docs = await loadText(filePath);
  const vectorStore = await docs2vec(docs);
  const prompt = "What did the president say about Justice Breyer?";
  console.log(chalk.blue("Prompt", prompt));
  console.log(chalk.green("Response: "));
  await runSummarization(docs);
  await runRetrievalQA(vectorStore, prompt);
}
