import * as dotenv from "dotenv";
import { runDevChain } from "./apps/appDev/runDevChain.js";

dotenv.config();

async function main() {
  await runDevChain();
}

await main();
