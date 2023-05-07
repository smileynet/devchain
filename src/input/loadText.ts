import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export default async function loadText(filePath: string | Blob) {
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  return await new TextLoader(filePath).loadAndSplit(textSplitter);
}
