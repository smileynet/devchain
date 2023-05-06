import * as fs from "fs";
import { loadQARefineChain, RetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import path from "path";

export default async function runRetrievalQA() {
  const filePath = path.join("src/samples/", `state_of_the_union.txt`);
  const model = new OpenAI({});
  const text = fs.readFileSync(filePath, "utf8");
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);

  // Create a vector store from the documents.
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  // Create a chain that uses the OpenAI LLM and HNSWLib vector store.
  let chain;
  const custom = true;
  if (custom) {
    chain = new RetrievalQAChain({
      combineDocumentsChain: loadQARefineChain(model),
      retriever: vectorStore.asRetriever(),
    });
  } else {
    chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  }

  const res = await chain.call({
    query: "What did the president say about Justice Breyer?",
  });
  console.log({ res });
}
