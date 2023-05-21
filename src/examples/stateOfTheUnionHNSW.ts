import chalk from "chalk";
import path from "path";
import loadText from "../input/loadText.js";
import runRetrievalQA from "../query/runRetrievalQA.js";
import runSummarization from "../query/runSummarization.js";
import docs2hnsw from "../transform/docs2hnsw.js";
import measurePerformance from "../utils/measurePerformance.js";

export default async function stateOfTheUnionHNSW() {
  console.log(chalk.cyan("Test: ") + "State of the Union w/ HNSW");
  const filePath = path.join("src/samples/", `state_of_the_union.txt`);
  const docs = await loadText(filePath);

  console.log(chalk.magenta("Loading Vector Store: ") + "HNSW");

  const vectorStore = await measurePerformance(
    docs2hnsw,
    null,
    [docs],
    "sotu-hnsw-load"
  );

/* CAUTION: This is an expensive operation.
await measurePerformance(
  runSummarization,
  null,
  [docs],
  "sotu-hnsw-summarize"
);
*/
const prompt = "What did the president say about Justice Breyer?";
await measurePerformance(
  runRetrievalQA,
  null,
  [vectorStore, prompt],
  "sotu-hnsw-qa"
);
}
