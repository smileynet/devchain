import { EPubLoader } from "langchain/document_loaders/fs/epub";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";

export default async function loadEpub(filePath: string, chunkSize = 4000, chunkOverlap = 200) {
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize, chunkOverlap });
  return await new EPubLoader(filePath).loadAndSplit(textSplitter);
}

