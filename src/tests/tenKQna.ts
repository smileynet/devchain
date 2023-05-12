import { davinci, LLMModel } from "../config/llm.js";
import runRetrievalQA from "../query/runRetrievalQA.js";
import docs2chroma from "../transform/docs2chroma.js";
import docs2hnsw from "../transform/docs2hnsw.js";
import loadText from "../input/loadText.js";
import {Document} from "langchain/document";
import getFilesInDirectory from "../utils/getFilesInDirectory.js";

export default async function tenKQna(
  model: LLMModel = davinci,
  vectorStoreChoice = "hnsw"
) {
  const docs: Document[] = [];
  const docsFolder = "src/samples/10k";
  const files = await getFilesInDirectory(docsFolder);

  for (const file of files) {
    const document = await loadText(file);
    docs.push(...document);
  }

  let vectorStore;
  if (vectorStoreChoice === "hnsw") {
    vectorStore = await docs2hnsw(docs);
  } else if (vectorStoreChoice === "chroma") {
    vectorStore = await docs2chroma(docs, "10k");
  }

  if (!vectorStore) throw new Error("No vector store was created");

  let prompt = "What key areas of Snap's business should they focus on to increase revenue?";

  await runRetrievalQA(vectorStore, prompt, model);

  prompt = "What key areas of Snap's business should they focus on to achieve profitability?"

  await runRetrievalQA(vectorStore, prompt, model);
}
