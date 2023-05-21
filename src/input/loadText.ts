import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export default async function loadText(filePath: string | Blob, chunkSize = 4000, chunkOverlap = 200) {
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize, chunkOverlap });
  return await new TextLoader(filePath).loadAndSplit(textSplitter);
}
