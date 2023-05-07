import { LLMModel } from "./config/llm.js";
import stateOfTheUnionCroma from "./examples/stateOfTheUnionChroma.js";

export default async function test(model: LLMModel) {
  await stateOfTheUnionCroma();

  //await gameProgrammingPatterns(model);
}
