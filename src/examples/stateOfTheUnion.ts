import path from "path";
import runRetrievalQA from "../apps/summarization/runRetrievalQA.js";
import loadText from "../input/loadText.js";

export default async function stateOfTheUnion() {
  const filePath = path.join("src/samples/", `state_of_the_union.txt`);
  const docs = await loadText(filePath);
  const prompt = "What did the president say about Justice Breyer?";
  await runRetrievalQA(docs, prompt);
}
