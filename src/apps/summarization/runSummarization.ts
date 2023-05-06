import * as fs from "fs";
import { loadSummarizationChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import path from "path";

export default async function runSummarization() {
  const filePath = path.join("src/samples/", `state_of_the_union.txt`);
  // In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
  const text = fs.readFileSync(filePath, "utf8");
  const model = new OpenAI({ temperature: 0 });
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);

  // This convenience function creates a document chain prompted to summarize a set of documents.
  const chain = loadSummarizationChain(model, {
    type: "map_reduce",
    returnIntermediateSteps: true,
  });
  const res = await chain.call({
    input_documents: docs,
  });
  console.log({ res });
}
