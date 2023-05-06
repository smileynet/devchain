import * as dotenv from "dotenv";
import { runDevChain } from "./runDevChain.js";

dotenv.config();

async function main() {
  await runDevChain();
}

await main();
