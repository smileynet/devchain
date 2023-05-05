import generateLLMChain from "./llmchain.js";
import { setup } from "./setup.js";

async function main() {
  const options = await setup();
  console.debug(options);

  const llmChain = generateLLMChain(options);
  // Confirm

  // Repeat
}

await main();
