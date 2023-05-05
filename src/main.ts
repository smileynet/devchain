import generateLLMChain from "./generateLLMChain.js";
import { setup } from "./setup.js";
import * as dotenv from "dotenv";
import { generateObjective } from "./generateObjective.js";

dotenv.config();

async function main() {
  const options = await setup();

  const llmChain = generateLLMChain(options);

  const response = await generateObjective(options, llmChain);

  console.log(response);
  // Repeat
}

await main();
