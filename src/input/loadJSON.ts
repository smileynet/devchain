import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export default async function loadJSON(
  filePath: string | Blob,
  pointers: string | string[]
) {
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 5000 });
  return await new JSONLoader(filePath, pointers).loadAndSplit(textSplitter);
}
